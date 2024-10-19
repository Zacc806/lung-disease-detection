import Router from 'express'
const router = new Router()

import imageRouter from './image.route.js'

router.use('/image', imageRouter)

export default router
