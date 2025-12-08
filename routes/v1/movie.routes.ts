import {Router} from 'express'
import controllers from '../../controllers'

const router = Router()

router.post('/movies', controllers.MovieControllers.createMovie)

export default router