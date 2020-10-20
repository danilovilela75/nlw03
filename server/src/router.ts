import { Router } from 'express';

import multer from 'multer';
import uploadConfig from './configs/upload';

import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
    return res.json({ server_status: "Iniciado" });
});

routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

export default routes;