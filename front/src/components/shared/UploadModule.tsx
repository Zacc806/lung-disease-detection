import React, { useState, useRef } from 'react';
import { Button, Image, Text, Input, Progress, Flex } from '@chakra-ui/react';
import { useNotify } from '@/utils/providers/ToastProvider';
import closeIcon from '@/assets/images/closeIcon.png';
import defaultImage from '@/assets/images/defaultImage.png';
import uploadImg from '@/assets/images/uploadImg.png';
import deleteIcon from '@/assets/images/deleteIcon.png';

export default function UploadModule({ onClose, setIsDetecting }: { onClose: () => void, setIsDetecting: (value: boolean) => void }) {
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
                setIsDetecting(true);
                onClose();
            } catch (error) {
                notify.error('Ошибка при загрузке изображения');
            }
        } else {
            notify.error('Пожалуйста, выберите изображение для загрузки');
        }
    };

    const handleDelete = () => {
        setSelectedImage(null);
        setPreviewUrl(null);
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Flex
            backgroundColor="rgba(251, 251, 251, 0.80)"
            borderRadius="32px"
            direction="column"
            width="604px"
            padding="40px"
            backdropFilter="blur(15px)"
        >
            <Flex
                justifyContent="space-between"
                alignItems="center"
                marginBottom="24px"
            >
                <Text
                    color="#161718"
                    fontFamily="Poppins"
                    fontSize="17px"
                    fontWeight="600"
                    lineHeight="normal"
                >
                    Upload Your Lung X-ray
                </Text>
                <Image
                    src={closeIcon}
                    alt="Close icon"
                    cursor="pointer"
                    onClick={onClose}
                    width="24px"
                    height="24px"
                />
            </Flex>
            <Text
                color="#161718"
                fontFamily="Poppins"
                fontSize="17px"
                fontWeight="400"
                lineHeight="normal"
                marginBottom="16px"
            >
                Ensure the X-ray image is clear for the most accurate results.
            </Text>
            <Flex
                direction="column"
                borderRadius="24px"
                padding="24px"
                width="100%"
                height="193px"
                cursor="pointer"
                justifyContent="center"
                alignItems="center"
                backgroundColor="#FFFFFF"
                border="1px dashed #D0D5DD"
                marginBottom="16px"
                onClick={handleButtonClick}
            >
                {previewUrl ?
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        objectFit="contain"
                        width="100%"
                        height="110%"
                    />
                    :
                    <>
                        <Flex
                            position="relative"
                            width="96px"
                            height="64px"
                            overflow="visible"
                            marginBottom="10px"
                        >
                            <Image src={defaultImage}
                                alt="Default image"
                                width="96px"
                                height="96px"
                                objectFit="contain"
                                position="absolute"
                                top="0"
                                left="0"
                            />
                        </Flex>
                        <Text
                            color="#101828"
                            fontFamily="Poppins"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="20px"
                        >
                            Drop your files here, or
                            <span style={{ color: '#3C9EEE' }}> browse</span>
                        </Text>
                        <Text
                            color="#667085"
                            fontFamily="Poppins"
                            fontSize="10px"
                            fontWeight="400"
                            lineHeight="16px"
                        >
                            JPG, PNG (Max 800x400px - 2Mb)
                        </Text>
                    </>
                }
            </Flex>
            <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
            />
            {selectedImage && (
                <Flex
                    borderRadius="24px"
                    padding="16px"
                    width="100%"
                    cursor="pointer"
                    justifyContent="center"
                    backgroundColor="#FFFFFF"
                    marginBottom="16px"
                >
                    <Image
                        src={uploadImg}
                        alt="Selected image"
                        width="32px"
                        height="32px"
                        objectFit="contain"
                        marginRight="16px"
                    />
                    <Flex
                        direction="column"
                        alignItems="flex-start"
                        width="100%"
                        position="relative"
                    >
                        <Image
                            src={deleteIcon}
                            alt="Delete icon"
                            width="24px"
                            height="24px"
                            objectFit="contain"
                            position="absolute"
                            top="0"
                            right="0"
                            onClick={handleDelete}
                        />
                        <Text
                            color="#101828"
                            fontFamily="Poppins"
                            fontSize="12px"
                            fontWeight="400"
                            lineHeight="20px"
                        >
                            {selectedImage.name}
                        </Text>
                        <Text
                            color="#667085"
                            fontFamily="Poppins"
                            fontSize="10px"
                            fontWeight="400"
                            lineHeight="16px"
                        >
                            {Math.round(selectedImage.size / 1024)}KB
                        </Text>
                        <Flex
                            width="100%"
                            alignItems="center"
                        >
                            <Progress
                                value={selectedImage ? 100 : 0}
                                backgroundColor="#3C9EEE"
                                width="100%"
                                height="4px"
                                borderRadius="2px"
                                marginRight="8px"
                            />
                            <Text
                                color="#101828"
                                fontFamily="Poppins"
                                fontSize="12px"
                                fontWeight="400"
                                lineHeight="20px"
                            >
                                {selectedImage ? 100 : 0}%
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            )}
            <Button
                backgroundColor="#3C9EEE"
                alignSelf="center"
                padding="12px 24px"
                height="48px"
                borderRadius="40px"
                color="white"
                fontFamily="Poppins"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
                _active={{}}
                _focus={{}}
                _hover={{}}
                onClick={handleUpload}
                isDisabled={!selectedImage}
            >
                Upload
            </Button>
        </Flex>
    );
}

// import React, { useState, useRef } from 'react';
// import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
// import { useNotify } from '@/utils/providers/ToastProvider';

// export default function UploadModule({ onClose, setIsDetecting }: { onClose: () => void, setIsDetecting: (value: boolean) => void }) {
//     const [selectedImage, setSelectedImage] = useState<File | null>(null);
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const notify = useNotify();

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             if (file.type.startsWith('image/')) {
//                 setSelectedImage(file);
//                 const reader = new FileReader();
//                 reader.onloadend = () => {
//                     setPreviewUrl(reader.result as string);
//                 };
//                 reader.readAsDataURL(file);
//             } else {
//                 notify.error('Пожалуйста, выберите изображение');
//             }
//         }
//     };

//     const handleUpload = async () => {
//         if (selectedImage) {
//             try {
//                 console.log(selectedImage);
//                 notify.success('Изображение успешно загружено');
//                 setIsDetecting(true);
//                 onClose();
//             } catch (error) {
//                 notify.error('Ошибка при загрузке изображения');
//             }
//         } else {
//             notify.error('Пожалуйста, выберите изображение для загрузки');
//         }
//     };

//     const handleButtonClick = () => {
//         fileInputRef.current?.click();
//     };

//     return (
//         <VStack spacing={4} align="stretch">
//             <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 ref={fileInputRef}
//             />
//             <Button onClick={handleButtonClick} colorScheme="blue">
//                 Выбрать изображение
//             </Button>
//             {previewUrl && (
//                 <Box>
//                     <Image src={previewUrl} alt="Preview" maxH="200px" objectFit="contain" />
//                 </Box>
//             )}
//             {selectedImage && (
//                 <Text>Выбрано: {selectedImage.name}</Text>
//             )}
//             <Button onClick={handleUpload} colorScheme="green" isDisabled={!selectedImage}>
//                 Загрузить
//             </Button>
//         </VStack>
//     );
// }