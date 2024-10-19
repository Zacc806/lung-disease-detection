export type DiseaseData = {
    image_id: string
    predictions: {
        [key: string]: number
    }
}
