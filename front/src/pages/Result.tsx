import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    ListItem,
    Text,
    UnorderedList
} from '@chakra-ui/react'

import { PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { useNavigate } from 'react-router-dom'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

const data = {
    labels: ['Condition A', 'Condition B', 'Condition C', 'Condition D'],
    datasets: [
        {
            label: 'Detected Conditions',
            data: [11, 16, 7, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

const options = {
    scales: {
        r: {
            min: 0,
            max: 100,
            ticks: {
                stepSize: 20,
                callback: (value) => `${value}%`
            }
        }
    }
}
const Result = () => {
    const navigate = useNavigate();

    return (
        <Flex
            minHeight="100vh"
            minWidth="100vw"
            justifyContent="center"
            backgroundColor="#EDF1F2"
            padding="80px 40px"
        >
            <Flex
                maxWidth="560px"
                direction="column"
                gap="24px"
            >
                <Breadcrumb
                    fontSize="8px"
                    spacing="4px"
                    separator="/"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            color="#6B7280"
                            fontFamily="Poppins"
                            fontSize="11px"
                            fontStyle="normal"
                            fontWeight={400}
                            lineHeight="normal"
                            href='/'
                        >
                            Main page
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            color="#0F131D"
                            fontFamily="Poppins"
                            fontSize="11px"
                            fontStyle="normal"
                            fontWeight={400}
                            lineHeight="normal"
                        >
                            Results
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Flex
                    width="100%"
                    direction="column"
                    gap="16px"
                >
                    <Text
                        color="#161718"
                        fontFamily="Poppins"
                        fontSize="17px"
                        fontStyle="normal"
                        fontWeight={600}
                        lineHeight="normal"
                    >
                        Analysis Complete
                    </Text>
                    <Text
                        color="#000"
                        fontFamily="Poppins"
                        fontSize="17px"
                        fontStyle="normal"
                        fontWeight={400}
                        lineHeight="normal"
                    >
                        Your X-ray has been successfully analyzed. Below is a summary of the detected
                        conditions:
                    </Text>
                </Flex>
                <Flex
                    width="100%"
                    height="400px"
                    padding="28px"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#fff"
                    borderRadius="16px"
                    border="1px solid #F2F2F2"
                >
                    <PolarArea data={data} options={options} />
                </Flex>
                <Flex
                    width="266px"
                    direction="column"
                    padding="28px"
                    gap="25px"
                    alignSelf="center"
                >
                    <Flex
                        gap="25px"
                        alignItems="center"
                    >
                        <Text
                            color="#242424"
                            fontFamily="Poppins"
                            fontSize="48px"
                            fontStyle="normal"
                            fontWeight={600}
                            lineHeight="58px"
                            letterSpacing="-2px"
                        >
                            12%
                        </Text>
                        <Flex
                            direction="column"
                            gap="4px"
                        >
                            <Text
                                color="#242424"
                                fontFamily="Poppins"
                                fontSize="16px"
                                fontStyle="normal"
                                fontWeight={600}
                                lineHeight="20px"
                                letterSpacing="-0.5px"
                            >
                                Pneumania
                            </Text>
                            <Text
                                color="#7A7A7A"
                                fontFamily="Poppins"
                                fontSize="14px"
                                fontStyle="normal"
                                fontWeight={500}
                                lineHeight="18px"
                                letterSpacing="-0.5px"
                            >
                                Moderate
                            </Text>
                        </Flex>

                    </Flex>
                    <Flex
                        gap="25px"
                        alignItems="center"
                    >
                        <Text
                            color="#242424"
                            fontFamily="Poppins"
                            fontSize="48px"
                            fontStyle="normal"
                            fontWeight={600}
                            lineHeight="58px"
                            letterSpacing="-2px"
                        >
                            12%
                        </Text>
                        <Flex
                            direction="column"
                            gap="4px"
                        >
                            <Text
                                color="#242424"
                                fontFamily="Poppins"
                                fontSize="16px"
                                fontStyle="normal"
                                fontWeight={600}
                                lineHeight="20px"
                                letterSpacing="-0.5px"
                            >
                                Tuberculosis
                            </Text>
                            <Text
                                color="#7A7A7A"
                                fontFamily="Poppins"
                                fontSize="14px"
                                fontStyle="normal"
                                fontWeight={500}
                                lineHeight="18px"
                                letterSpacing="-0.5px"
                            >
                                Moderate
                            </Text>
                        </Flex>

                    </Flex>
                </Flex>
                <UnorderedList
                    color="#000"
                    fontFamily="Poppins"
                    fontSize="17px"
                    fontStyle="normal"
                    fontWeight={400}
                    lineHeight="normal"
                    spacing="16px"
                    marginBottom="64px"
                >
                    <ListItem><b>Low (0-25%):</b> Minimal signs of respiratory conditions. Routine monitoring is sufficient.</ListItem>
                    <ListItem><b>Moderate (26-50%):</b> Some indicators of risk. Follow-up medical check-up is recommended.</ListItem>
                    <ListItem><b>High (51-75%):</b> Noticeable signs of respiratory issues. Further diagnostic testing is advised.</ListItem>
                    <ListItem><b>Severe (76-100%):</b> Significant signs of illness. Immediate medical attention is necessary.</ListItem>
                </UnorderedList>
                <Button
                    backgroundColor="#D1D5DB"
                    padding="12px 24px"
                    alignSelf="center"
                    width="240px"
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
                    onClick={() => navigate('/')}
                >
                    BACK TO MAIN
                </Button>
            </Flex>
        </Flex>
    )
}

export default Result
