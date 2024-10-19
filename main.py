# nih_chest_xray_classification.py

import os
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.utils import Sequence
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.model_selection import train_test_split
from tensorflow.keras.applications import DenseNet121
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense, Dropout
from tensorflow.keras.models import Model
from sklearn.metrics import classification_report, roc_auc_score, multilabel_confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Step 1: Download the Dataset using Kaggle API
# ---------------------------------------------
# Make sure to set up the Kaggle API as per instructions:
# https://www.kaggle.com/docs/api

# Step 2: Load and Preprocess Labels
# ----------------------------------

# Load the CSV file containing labels and metadata
df = pd.read_csv('Data_Entry_2017.csv')

# Replace 'No Finding' with an empty string
df['Finding Labels'] = df['Finding Labels'].replace('No Finding', '')

# Split labels for each image
df['Labels'] = df['Finding Labels'].apply(lambda x: x.split('|') if x else [])

# Extract unique labels
all_labels = set([label for sublist in df['Labels'] for label in sublist])
print("All Labels:", all_labels)

# Binarize the labels
mlb = MultiLabelBinarizer()
labels = mlb.fit_transform(df['Labels'])
label_classes = mlb.classes_
print("Label Classes:", label_classes)

# Add the image paths to the DataFrame
df['Image Path'] = df['Image Index'].apply(lambda x: os.path.join('images', x))

# Step 3: Split the Dataset
# -------------------------

# Use a subset of the data for initial prototyping (optional)
# df = df.sample(n=10000, random_state=42).reset_index(drop=True)
# labels = labels[df.index]

# Split the data into training, validation, and test sets
train_df, test_df, train_labels, test_labels = train_test_split(
    df, labels, test_size=0.2, stratify=labels, random_state=42)

train_df, val_df, train_labels, val_labels = train_test_split(
    train_df, train_labels, test_size=0.1, stratify=train_labels, random_state=42)

print("Training samples:", len(train_df))
print("Validation samples:", len(val_df))
print("Test samples:", len(test_df))

# Step 4: Create a Custom Data Generator
# --------------------------------------

class ChestXRayDataGenerator(Sequence):
    def __init__(self, df, labels, batch_size=32, img_size=(224, 224), augment=False):
        self.df = df.reset_index(drop=True)
        self.labels = labels
        self.batch_size = batch_size
        self.img_size = img_size
        self.indices = np.arange(len(self.df))
        self.augment = augment
        self.datagen = ImageDataGenerator(
            rescale=1./255,
            rotation_range=15,
            horizontal_flip=True,
            zoom_range=0.1
        ) if augment else ImageDataGenerator(rescale=1./255)
    
    def __len__(self):
        return int(np.ceil(len(self.df) / self.batch_size))
    
    def __getitem__(self, idx):
        batch_indices = self.indices[idx * self.batch_size:(idx + 1) * self.batch_size]
        batch_x = np.array([
            img_to_array(
                load_img(self.df.iloc[i]['Image Path'], target_size=self.img_size)
            ) for i in batch_indices
        ])
        batch_y = self.labels[batch_indices]
        if self.augment:
            batch_x = np.array([self.datagen.random_transform(img) for img in batch_x])
        batch_x = self.datagen.standardize(batch_x)
        return batch_x, batch_y
    
    def on_epoch_end(self):
        np.random.shuffle(self.indices)

# Step 5: Prepare Data Generators
# -------------------------------

BATCH_SIZE = 32
IMAGE_SIZE = (224, 224)

# Create generators
train_generator = ChestXRayDataGenerator(train_df, train_labels, batch_size=BATCH_SIZE, img_size=IMAGE_SIZE, augment=True)
val_generator = ChestXRayDataGenerator(val_df, val_labels, batch_size=BATCH_SIZE, img_size=IMAGE_SIZE, augment=False)
test_generator = ChestXRayDataGenerator(test_df, test_labels, batch_size=BATCH_SIZE, img_size=IMAGE_SIZE, augment=False)

# Step 6: Build the Model for Multi-Label Classification
# ------------------------------------------------------

# Load pre-trained DenseNet121 model + higher level layers
base_model = DenseNet121(weights='imagenet', include_top=False, input_shape=IMAGE_SIZE + (3,))
base_model.trainable = False  # Freeze the base model

# Add custom layers on top of the base model
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
output = Dense(len(label_classes), activation='sigmoid')(x)

# Define the model
model = Model(inputs=base_model.input, outputs=output)

# Step 7: Compile the Model
# -------------------------

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Step 8: Train the Model
# -----------------------

EPOCHS = 5

history = model.fit(
    train_generator,
    epochs=EPOCHS,
    validation_data=val_generator
)

# Step 9: Fine-Tune the Model (Optional)
# --------------------------------------

# Unfreeze the base model for fine-tuning
base_model.trainable = True

# Recompile the model with a lower learning rate
model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

FINE_TUNE_EPOCHS = 5
TOTAL_EPOCHS = EPOCHS + FINE_TUNE_EPOCHS

history_fine = model.fit(
    train_generator,
    epochs=TOTAL_EPOCHS,
    initial_epoch=history.epoch[-1],
    validation_data=val_generator
)

# Step 10: Evaluate the Model
# ---------------------------

# Predict on test data
y_pred = model.predict(test_generator)
y_true = test_labels

# Threshold predictions
threshold = 0.5
y_pred_thresh = (y_pred >= threshold).astype(int)

# Step 11: Analyze Model Performance
# ----------------------------------

# Classification Report
print('Classification Report')
print(classification_report(y_true, y_pred_thresh, target_names=label_classes))

# AUC Scores
auc_scores = {}
for i, label in enumerate(label_classes):
    try:
        auc = roc_auc_score(y_true[:, i], y_pred[:, i])
        auc_scores[label] = auc
    except ValueError:
        auc_scores[label] = 'N/A'  # Handle cases with no positive samples

print("AUC Scores:", auc_scores)

# Multilabel Confusion Matrix
confusion_matrices = multilabel_confusion_matrix(y_true, y_pred_thresh)

# Plot confusion matrix for each class
for i, label in enumerate(label_classes):
    cm = confusion_matrices[i]
    sns.heatmap(cm, annot=True, fmt='d')
    plt.title(f'Confusion Matrix for {label}')
    plt.ylabel('Actual')
    plt.xlabel('Predicted')
    plt.show()

# Step 12: Save the Model
# -----------------------

model.save('nih_chest_xray_classifier.h5')

# Optional: Plot Training History
# -------------------------------

def plot_training_history(history):
    # Accuracy plot
    plt.figure(figsize=(8, 4))
    plt.plot(history.history['accuracy'], label='Train Accuracy')
    if 'val_accuracy' in history.history:
        plt.plot(history.history['val_accuracy'], label='Val Accuracy')
    plt.title('Model Accuracy')
    plt.ylabel('Accuracy')
    plt.xlabel('Epoch')
    plt.legend()
    plt.show()

    # Loss plot
    plt.figure(figsize=(8, 4))
    plt.plot(history.history['loss'], label='Train Loss')
    if 'val_loss' in history.history:
        plt.plot(history.history['val_loss'], label='Val Loss')
    plt.title('Model Loss')
    plt.ylabel('Loss')
    plt.xlabel('Epoch')
    plt.legend()
    plt.show()

# Combine histories if fine-tuning was performed
if 'history_fine' in globals():
    total_history = history.history
    for k, v in history_fine.history.items():
        total_history[k].extend(v)
    history_combined = tf.keras.callbacks.History()
    history_combined.history = total_history
    plot_training_history(history_combined)
else:
    plot_training_history(history)

# End of Script
# -------------

