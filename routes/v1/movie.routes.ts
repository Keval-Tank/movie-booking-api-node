import {Router} from 'express'
import controllers from '../../controllers'
import middlewares from '../../middlewares'

const router = Router()

router.post('/', middlewares.movieMiddlewares.validateCreateMovieRequest ,controllers.MovieControllers.createMovie)
router.get('/:id', controllers.MovieControllers.getMovie)
router.delete('/:id', controllers.MovieControllers.deleteMovie)
router.put('/:id', controllers.MovieControllers.updateMovie)
router.get('/', controllers.MovieControllers.fetchMovies)

export default router