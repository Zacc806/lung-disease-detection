import 'dotenv/config.js'
import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import ApiError from './utils/error/ApiError.js'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))
app.use(cors())
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }))
app.use(morgan('combined'))

app.use('/api', router)

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message })
    } else {
        next(err)
    }
})

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error(e.message)
    }
}
start()
