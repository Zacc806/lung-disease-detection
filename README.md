Lung Disease Classification from Chest X-Ray Images
This project aims to train an AI model to recognize lung diseases from chest X-ray images using the NIH Chest X-ray dataset. The model leverages deep learning techniques and transfer learning to perform multi-label classification of 14 different lung diseases.

Table of Contents
Overview
Dataset
Prerequisites
Installation
Dataset Download
Option 1: Download Individual Files via Kaggle API
Option 2: Download via Kaggle Web Interface
Option 3: Use a Smaller Sample Dataset
Project Structure
Running the Code
Troubleshooting
Additional Resources
Acknowledgements
Overview
This project involves:

Setting up a development environment with necessary libraries.
Downloading and preprocessing the NIH Chest X-ray dataset.
Building a convolutional neural network (CNN) model using transfer learning (DenseNet121).
Training the model for multi-label classification.
Evaluating the model's performance.
Saving the trained model for future use.
Dataset
NIH Chest X-ray Dataset
Source: NIH Chest X-ray Dataset
Description: Contains over 112,000 chest X-ray images with labels for 14 different diseases and one "No findings" class.
Data Limitations:
Labels were extracted using NLP from radiology reports (estimated accuracy >90%).
Some labels may be erroneous due to NLP extraction errors.
Very limited numbers of disease region bounding boxes.
Classes:
Atelectasis
Consolidation
Infiltration
Pneumothorax
Edema
Emphysema
Fibrosis
Effusion
Pneumonia
Pleural Thickening
Cardiomegaly
Nodule Mass
Hernia
No Finding
Prerequisites
Python: 3.6 or higher
pip: Package installer for Python
Git: For version control (optional but recommended)
Installation
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2. Set Up a Virtual Environment
Using venv:

bash
Copy code
python -m venv venv
Activate the Virtual Environment:

Windows:

bash
Copy code
venv\Scripts\activate
macOS/Linux:

bash
Copy code
source venv/bin/activate
3. Upgrade pip
bash
Copy code
pip install --upgrade pip
4. Install Required Libraries
bash
Copy code
pip install -r requirements.txt
Contents of requirements.txt:

Copy code
numpy
pandas
tensorflow
scikit-learn
matplotlib
seaborn
Dataset Download
Due to the large size of the NIH Chest X-ray dataset (~42 GB), downloading it requires careful handling. Below are options to download the dataset:

Option 1: Download Individual Files via Kaggle API
Step 1: Install Kaggle API
bash
Copy code
pip install kaggle
Step 2: Set Up Kaggle API Credentials
Obtain Kaggle API Token:

Log in to your Kaggle account.
Go to Account Settings.
Click on Create New API Token. A kaggle.json file will be downloaded.
Place kaggle.json in the Correct Directory:

Windows:

bash
Copy code
mkdir %USERPROFILE%\.kaggle
move kaggle.json %USERPROFILE%\.kaggle
macOS/Linux:

bash
Copy code
mkdir ~/.kaggle
mv kaggle.json ~/.kaggle/
chmod 600 ~/.kaggle/kaggle.json
Step 3: Accept the Dataset's Terms
Navigate to the NIH Chest X-ray Dataset.
Click Download and accept any terms and conditions if prompted.
Step 4: Download Individual Files
List Available Files:

bash
Copy code
kaggle datasets files nih-chest-xrays/data
Download Necessary Files:

bash
Copy code
# Create dataset directory if it doesn't exist
mkdir dataset

# Download Data_Entry_2017.csv
kaggle datasets download -d nih-chest-xrays/data -f Data_Entry_2017.csv -p dataset/

# Download image zip files (adjust the range if you want fewer files)
for i in $(seq -f "%03g" 1 12); do
  kaggle datasets download -d nih-chest-xrays/data -f images_${i}.zip -p dataset/
done
Step 5: Extract the Zip Files
bash
Copy code
cd dataset/
mkdir images

# Extract each images_*.zip file into the images/ directory
for file in images_*.zip; do
  unzip "$file" -d images/
done
Option 2: Download via Kaggle Web Interface
Navigate to the NIH Chest X-ray Dataset.

Scroll down to the Data Explorer section.

Download individual files (e.g., Data_Entry_2017.csv, images_001.zip, etc.) by clicking on them and then clicking the Download button.

Move the downloaded files into the dataset/ directory.

Extract the zip files as described in Step 5 above.

Option 3: Use a Smaller Sample Dataset
If you prefer working with a smaller dataset initially:

Download the Sample Dataset
bash
Copy code
kaggle datasets download -d nih-chest-xrays/sample -p dataset/
Extract the Sample Dataset
bash
Copy code
cd dataset/
unzip sample.zip -d images/
Adjust Code for Sample Dataset
Update paths in main.py to point to the sample dataset.
Use sample_labels.csv provided in the sample dataset.
Project Structure
scss
Copy code
project_directory/
├── dataset/
│   ├── Data_Entry_2017.csv
│   ├── images/
│   │   ├── image1.png
│   │   ├── image2.png
│   │   └── ...
│   └── (other dataset files)
├── main.py
├── requirements.txt
└── venv/
    ├── bin/
    ├── lib/
    └── (virtual environment files)
Running the Code
1. Activate the Virtual Environment
Windows:

bash
Copy code
venv\Scripts\activate
macOS/Linux:

bash
Copy code
source venv/bin/activate
2. Run the Script
bash
Copy code
python main.py
3. Monitor Training
Training progress, including loss and accuracy, will be displayed in the console.
After training, evaluation metrics and confusion matrices will be displayed.
