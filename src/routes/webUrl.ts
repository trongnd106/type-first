import express from 'express';
import { getAllEmployees, insertAnEmployee, updateAnEmployee, 
    getEmployeebyId, createEmployy, handleDeleteEmp } from '../controllers/homeController';

const router = express.Router();

const initRoute = (app: express.Application): express.Application => {
    router.get('/', getAllEmployees);

    router.get('/create', createEmployy);
    router.post('/create-user', insertAnEmployee);

    router.get('/update/:id', getEmployeebyId);
    router.post('/update-user', updateAnEmployee);

    router.post('/delete-user/:id', handleDeleteEmp);

    return app.use('/', router);
}

export default initRoute;
