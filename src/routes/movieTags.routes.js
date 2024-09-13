import { Router } from 'express';
import { MovieTagsController } from '../controllers/MovieTagsController.js';

const movieTagsRouter = Router();
const movieTagsController = new MovieTagsController();

movieTagsRouter.get('/', movieTagsController.index);

export { movieTagsRouter };