import { Router } from 'express';
import { usersRouter } from './users.routes.js';
import { movieNotesRouter } from './movieNotes.routes.js';
import { movieTagsRouter } from './movieTags.routes.js';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/movieNotes', movieNotesRouter);
routes.use('/movieTags', movieTagsRouter);

export { routes };