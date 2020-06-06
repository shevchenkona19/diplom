const express = require('express');
const router = express.Router();
import UserRouter from './user';

router.post('/login', UserRouter.loginUserRoute);
router.post('/register', UserRouter.registerUserRoute);
router.get('/', UserRouter.test);

export default router;
