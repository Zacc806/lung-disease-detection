import { Router } from 'express'
import Controller from '../controllers/image.controller.js'
import errorHandler from '../utils/error/errorHandler.js'
const router = Router()

router.post('/imageUpload', errorHandler(Controller.uploadImage))

export default router
