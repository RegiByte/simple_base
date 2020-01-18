import { Router } from 'express';
import HelloController from './app/http/controllers/HelloController';

const router = new Router();

router.get('/', HelloController.index);

export default router;
