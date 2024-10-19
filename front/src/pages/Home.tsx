import UploadModule from '@/components/shared/UploadModule'
import {
    Image,
    Text,
    Flex,
    Button,
    Fade,
    useDisclosure
} from '@chakra-ui/react'
import logoImg from '@/assets/images/logo.png'
import lungImg from '@/assets/images/lung.png'
import { useState } from 'react'
import { CirclesLoader } from '@/components/shared/CirlcesLoader'
import ModalComponent from '@/components/shared/ModalComponent'

export default function Home() {
    const [isDetecting, setIsDetecting] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            alignItems="center"
            paddingTop="157px"
            height="100vh"
            direction="column"
            gap={isDetecting ? '24px' : '16px'}
            backgroundColor="#EDF1F2"
        >
            <Fade
                in={!isDetecting}
                transition={{ exit: { duration: 0 }, enter: { duration: 0.5 } }}
                unmountOnExit
            >
                <Flex direction="column" alignItems="center" justifyContent="center" gap="4px">
                    <Image src={logoImg} alt="logo" width="118px" height="35px" />
                    <Text color="#161718" textAlign="center" fontWeight="400">
                        Lung Status Diagnosis
                    </Text>
                </Flex>
            </Fade>
            <Fade
                in={isDetecting}
                unmountOnExit
                transition={{ exit: { duration: 0 }, enter: { duration: 0.5 } }}
            >
                <Text color="#161718" textAlign="center" fontWeight="600">
                    Analyzing your X-ray…
                </Text>
            </Fade>
            <Fade
                in={isDetecting}
                unmountOnExit
                transition={{ exit: { duration: 0 }, enter: { duration: 0.5 } }}
            >
                <Text color="#161718" textAlign="center" fontWeight="400" maxWidth="1152px">
                    This may take a moment as we review your image for signs of lung cancer and
                    other respiratory conditions. Please wait while we process your results.
                </Text>
            </Fade>
            <Fade
                in={!isDetecting}
                unmountOnExit
                transition={{ exit: { duration: 0 }, enter: { duration: 0.5 } }}
            >
                <Text
                    color="#161718"
                    textAlign="center"
                    fontSize="32px"
                    fontWeight="400"
                    width="508px"
                >
                    Early Detection of Lung Cancer and Other Respiratory Diseases
                </Text>
            </Fade>
            <Image src={lungImg} alt="upload" width="478px" height="424px" />
            {isDetecting && (
                <Flex position="relative" height="70px" overflow="visible">
                    <CirclesLoader />
                </Flex>
            )}
            <Button
                backgroundColor={isDetecting ? '#D1D5DB' : '#3C9EEE'}
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
                onClick={isDetecting ? () => setIsDetecting(false) : onOpen}
            >
                {isDetecting ? 'Cancel' : 'Start'}
            </Button>
            <Fade
                in={!isDetecting}
                unmountOnExit
                transition={{ exit: { duration: 0 }, enter: { duration: 0.5 } }}
            >
                <Text color="#6B7280" textAlign="center" fontSize="13px" fontWeight="400">
                    Your data is confidential and secure.
                </Text>
            </Fade>
            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                children={<UploadModule onClose={onClose} setIsDetecting={setIsDetecting} />}
            />
        </Flex>
    )
}
