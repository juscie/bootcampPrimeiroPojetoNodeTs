import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();


//"use" ele aponta para o appointmentsRouter que tem os métodos
// o use entende todos os métodos
routes.use('/appointments', appointmentsRouter);





export default routes;

