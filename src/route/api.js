import express from 'express';
import userController from '../controller/user-controller.js';
import reportsController from '../controller/report-controller.js';
import { authMiddleware } from '../middleware/auth-middleware.js';

const userRouter = new express.Router();
userRouter.use(authMiddleware);
// User
userRouter.get('/api/users', userController.getUsers);
userRouter.get('/api/users/:userId', userController.getUsersById);
userRouter.patch('/api/users/:userId', userController.update);
userRouter.delete('/api/users/logout', userController.logout);

// Report
userRouter.post('/api/reports', reportsController.createReport);
userRouter.patch('/api/reports/:reportId', reportsController.updateReport);
userRouter.get('/api/reports/', reportsController.getReports);
userRouter.delete('/api/reports/:reportId', reportsController.deleteReport);
userRouter.get('/api/reports/:reportId', reportsController.getReportById);

export { userRouter };
