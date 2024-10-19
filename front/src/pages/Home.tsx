import { Image, Text, Flex, Button } from '@chakra-ui/react'
import logoImg from '@/assets/images/logo.png'
import lungImg from '@/assets/images/lung.png'

/**
 * Simply Plug page if route doesnt exist
 */
export default function Home() {
    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            height="100vh"
            direction="column"
            gap="16px"
            backgroundColor="#EDF1F2"
        >
            <Flex direction="column" alignItems="center" justifyContent="center" gap="4px">
                <Image src={logoImg} alt="logo" width="118px" height="35px" />
                <Text
                    fontFamily="Poppins"
                    color="#161718"
                    textAlign="center"
                    fontSize="17px"
                    fontStyle="normal"
                    fontWeight="400"
                    lineHeight="normal"
                >
                    Lung Status Diagnosis
                </Text>
            </Flex>
            <Text
                color="#161718"
                textAlign="center"
                fontFamily="Poppins"
                fontSize="32px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
                width="508px"
            >
                Early Detection of Lung Cancer and Other Respiratory Diseases
            </Text>
            <Image src={lungImg} alt="upload" width="478px" height="424px" />
            <Button
                backgroundColor="#3C9EEE"
                width="87px"
                height="48px"
                borderRadius="40px"
                color="white"
                fontFamily="Poppins"
                fontSize="16px"
                fontStyle="normal"
                fontWeight="600"
                lineHeight="normal"
            >
                Start
            </Button>
            <Text
                color="#6B7280"
                textAlign="center"
                fontFamily="Poppins"
                fontSize="13px"
                fontStyle="normal"
                fontWeight="400"
                lineHeight="normal"
            >
                Your data is confidential and secure.
            </Text>
            {/* <UploadModule /> */}
        </Flex>
    )
}
