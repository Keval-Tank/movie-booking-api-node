import controllers from "../../controllers";
import {Router} from 'express'
import middlewares from "../../middlewares";

const router = Router();

router.post('/', middlewares.theaterMiddlewares.validateCreateTheaterRequest ,controllers.TheaterControllers.createTheater);
router.get('/:id', controllers.TheaterControllers.getTheater)
router.get('/', controllers.TheaterControllers.getAllTheaters)
router.delete('/:id', controllers.TheaterControllers.deleteTheaters)

export default router