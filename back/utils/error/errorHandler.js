import { ValidationError } from 'sequelize'
import ApiError from '../error/ApiError.js'

function errorHandler(controllerFunction) {
    return async (req, res, next) => {
        try {
            await controllerFunction(req, res, next)
        } catch (err) {
            if (err instanceof ValidationError) {
                const errors = Object.values(err.errors).map((e) => e.message)
                res.status(400).json({ message: errors[0] })
            } else {
                next(ApiError.badRequest(err.message))
            }
        }
    }
}

export default errorHandler
