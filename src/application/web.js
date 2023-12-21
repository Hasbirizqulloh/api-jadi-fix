import express from 'express';
import { publicRouter } from '../route/public-api.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { userRouter } from '../route/api.js';
import cors from 'cors';

export const web = express();

const corsOptions = {
  origin: 'https://pelma-uas-frontend.vercel.app',
  credentials: true, // Izinkan kredensial
};

web.use(cors(corsOptions));
web.use(express.json());
web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
