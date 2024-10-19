import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Grid,
    GridItem,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react'

import { PolarArea } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js'
import { useLocation, useNavigate } from 'react-router-dom'
import { DiseaseData } from '@/utils/types/diesase.types'
import React, { useMemo } from 'react'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

// const data = {
//     labels: ['Condition A', 'Condition B', 'Condition C', 'Condition D'],
//     datasets: [
//         {
//             label: 'Detected Conditions',
//             data: [11, 16, 7, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.5)',
//                 'rgba(54, 162, 235, 0.5)',
//                 'rgba(255, 206, 86, 0.5)',
//                 'rgba(75, 192, 192, 0.5)',
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//             ],
//             borderWidth: 1,
//         },
//     ],
// }

const options = {
    scales: {
        r: {
            min: 0,
            max: 100,
            ticks: {
                stepSize: 20,
                callback: (value: any) => `${value}%`,
            },
        },
    },
}
const Result = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { diseaseData } = location.state as { diseaseData: DiseaseData }

    const chartData = useMemo(() => {
        const sortedPredictions = Object.entries(diseaseData.predictions).sort(
            ([, a], [, b]) => b - a,
        )

        // Функция для генерации цветов
        const generateColors = (opacity: number) => {
            return sortedPredictions.map((_, index) => {
                const hue = (index * 137.5) % 360 // Золотое сечение для распределения цветов
                return `hsla(${hue}, 70%, 60%, ${opacity})`
            })
        }

        return {
            labels: sortedPredictions.map(([key]) => key),
            datasets: [
                {
                    label: 'Detected Conditions',
                    data: sortedPredictions.map(([, value]) => value * 100), // Переводим в проценты
                    backgroundColor: generateColors(0.5),
                    borderColor: generateColors(1),
                    borderWidth: 1,
                },
            ],
        }
    }, [diseaseData])

    return (
        <Flex
            minHeight="100vh"
            maxWidth="100vw"
            justifyContent="center"
            backgroundColor="#EDF1F2"
            padding="80px 40px"
        >
            <Flex maxWidth="560px" direction="column" gap="24px">
                <Breadcrumb fontSize="8px" spacing="4px" separator="/">
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            color="#6B7280"
                            fontFamily="Poppins"
                            fontSize="11px"
                            fontStyle="normal"
                            fontWeight={400}
                            lineHeight="normal"
                            href="/"
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
                <Flex width="100%" direction="column" gap="16px">
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
                        Your X-ray has been successfully analyzed. Below is a summary of the
                        detected conditions:
                    </Text>
                </Flex>
                <Flex
                    width="100%"
                    height="500px"
                    padding="28px"
                    justifyContent="center"
                    alignItems="center"
                    backgroundColor="#fff"
                    borderRadius="16px"
                    border="1px solid #F2F2F2"
                >
                    <PolarArea data={chartData} options={options} />
                </Flex>
                <Grid
                    templateColumns="auto 1fr"
                    gap="25px"
                    alignSelf="center"
                    width="100%"
                    maxWidth="300px"
                >
                    {Object.entries(diseaseData.predictions)
                        .sort(([, a], [, b]) => b - a)
                        .map(([key, value]) => (
                            <React.Fragment key={key}>
                                <GridItem>
                                    <Text
                                        color="#242424"
                                        fontFamily="Poppins"
                                        fontSize="48px"
                                        fontStyle="normal"
                                        fontWeight={600}
                                        lineHeight="58px"
                                        letterSpacing="-2px"
                                        whiteSpace="nowrap"
                                    >
                                        {(value * 100).toFixed()}%
                                    </Text>
                                </GridItem>
                                <GridItem justifySelf="end">
                                    <Flex
                                        direction="column"
                                        gap="4px"
                                        justifyContent="center"
                                        height="100%"
                                        alignItems="flex-end"
                                    >
                                        <Text
                                            color="#242424"
                                            fontFamily="Poppins"
                                            fontSize="16px"
                                            fontStyle="normal"
                                            fontWeight={600}
                                            lineHeight="20px"
                                            letterSpacing="-0.5px"
                                            textAlign="right"
                                        >
                                            {key}
                                        </Text>
                                        <Text
                                            color="#7A7A7A"
                                            fontFamily="Poppins"
                                            fontSize="14px"
                                            fontStyle="normal"
                                            fontWeight={500}
                                            lineHeight="18px"
                                            letterSpacing="-0.5px"
                                            textAlign="right"
                                        >
                                            {value * 100 > 75
                                                ? 'Severe'
                                                : value * 100 > 50
                                                ? 'High'
                                                : value * 100 > 25
                                                ? 'Moderate'
                                                : 'Low'}
                                        </Text>
                                    </Flex>
                                </GridItem>
                            </React.Fragment>
                        ))}
                </Grid>
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
                    <ListItem>
                        <b>Low (0-25%):</b> Minimal signs of respiratory conditions. Routine
                        monitoring is sufficient.
                    </ListItem>
                    <ListItem>
                        <b>Moderate (26-50%):</b> Some indicators of risk. Follow-up medical
                        check-up is recommended.
                    </ListItem>
                    <ListItem>
                        <b>High (51-75%):</b> Noticeable signs of respiratory issues. Further
                        diagnostic testing is advised.
                    </ListItem>
                    <ListItem>
                        <b>Severe (76-100%):</b> Significant signs of illness. Immediate medical
                        attention is necessary.
                    </ListItem>
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
