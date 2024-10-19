import 'dotenv/config.js'
import express from 'express'
import router from './routes/index.js'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
import fileUpload from 'express-fileupload'
import morgan from 'morgan'

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }))
app.use(morgan('combined'))
app.use('/api', router)

const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.error(e.message)
    }
}
start()
