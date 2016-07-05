import express from 'express';
import * as AlbumsController from './users/me/albums.controller';
import authenticate from '../middleware/authenticate/facebook';

const router = express.Router();

router.get('/users/me/albums', authenticate(), a$ync(AlbumsController.fetchAll));
router.post('/users/me/albums', authenticate(), a$ync(AlbumsController.save));

function a$ync(fn) {
  return (request, response, next) => {
    return fn(request, response, next).catch((error) => next(error));
  };
}

export default router;
