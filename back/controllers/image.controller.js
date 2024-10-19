import ApiError from '../utils/error/ApiError.js'
import fs from 'fs/promises'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

class ImageController {
    async uploadImage(req, res, next) {
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return next(ApiError('No file was uploaded'))
            }
            const image = req.files.image

            const uploadPath = path.join(__dirname, '../static/images', image.name)
            await image.mv(uploadPath)
            // const aiResult = await analyzeImageWithAI(uploadPath)
            // await fs.unlink(uploadPath)
            // res.json({
            //     message: 'Image processed successfully',
            //     result: aiResult,
            // })
            res.json({
                message: 'Image processed successfully',
                result: 'krasavchik',
            })
        } catch (error) {
            console.error('Error proccessing image:', error)
            res.status(500).json({ message: 'Error proccessing name', error: error.message })
        }
    }
}
export default new ImageController()
