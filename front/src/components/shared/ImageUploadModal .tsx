import { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Progress,
    Input,
    VStack,
    Text,
} from '@chakra-ui/react'

const ImageUploadModal = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0])
    }

    const handleUpload = async () => {
        if (!selectedFile) return

        setIsUploading(true)
        setProgress(0)

        // Имитация загрузки
        const interval = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval)
                    setIsUploading(false)
                    return 100
                }
                return prevProgress + 10
            })
        }, 500)
    }

    return (
        <Modal isOpen={true} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Загрузка изображения</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={4}>
                        <Input type="file" onChange={handleFileChange} accept="image/*" />
                        {isUploading && (
                            <Progress value={progress} width="100%" colorScheme="blue" />
                        )}
                        {progress === 100 && <Text color="green.500">Загрузка завершена!</Text>}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleUpload}
                        isDisabled={!selectedFile || isUploading}
                    >
                        Загрузить
                    </Button>
                    <Button variant="ghost" onClick={() => {}}>
                        Закрыть
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ImageUploadModal
