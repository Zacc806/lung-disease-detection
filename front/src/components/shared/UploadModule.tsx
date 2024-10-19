import React, { useState, useRef } from 'react';
import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { useNotify } from '@/utils/providers/ToastProvider';

export default function UploadModule() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const notify = useNotify();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setSelectedImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                notify.error('Пожалуйста, выберите изображение');
            }
        }
    };

    const handleUpload = async () => {
        if (selectedImage) {
            try {
                console.log(selectedImage);
                notify.success('Изображение успешно загружено');
            } catch (error) {
                notify.error('Ошибка при загрузке изображения');
            }
        } else {
            notify.error('Пожалуйста, выберите изображение для загрузки');
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <VStack spacing={4} align="stretch">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            <Button onClick={handleButtonClick} colorScheme="blue">
                Выбрать изображение
            </Button>
            {previewUrl && (
                <Box>
                    <Image src={previewUrl} alt="Preview" maxH="200px" objectFit="contain" />
                </Box>
            )}
            {selectedImage && (
                <Text>Выбрано: {selectedImage.name}</Text>
            )}
            <Button onClick={handleUpload} colorScheme="green" isDisabled={!selectedImage}>
                Загрузить
            </Button>
        </VStack>
    );
}