import { Box, Flex, Text } from '@chakra-ui/react'

const Result = () => {
    return (
        <Flex
            alignItems={'center'}
            backgroundColor="#EDF1F2"
            direction="column"
            minHeight={'100vh'}
            minW={'100vw'}
            padding={'10%'}
        >
            <Box>
                <Text style={{ marginBottom: 16 }} color={'#161718'} fontWeight={600}>
                    Analysis Complete
                </Text>
                <Text color={'#000'} fontWeight={400}>
                    Your X-ray has been successfully analyzed. Below is a summary of the detected
                    conditions:
                </Text>
            </Box>
        </Flex>
    )
}

export default Result
