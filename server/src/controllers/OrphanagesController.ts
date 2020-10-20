import { Request, Response } from 'express';
import Orphanage from '../models/Orphanages';
import { getRepository } from 'typeorm';

import orphanageView from '../views/orphanages_view';

export default {

    async create(req: Request, res: Response) {

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
        } = req.body;

        const reqImages = req.files as Express.Multer.File[];

        const images = reqImages.map(image => {
            return { path: image.filename }
        })

        const orpRepo = getRepository(Orphanage);

        const orphanage = orpRepo.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images,
        });

        await orpRepo.save(orphanage);

        console.log(orphanage);
        return res.status(201).json(orphanage);

    },

    async index (req: Request, res: Response) {

        const orpRepo = getRepository(Orphanage);

        const orphanage = await orpRepo.find({
            relations: ['images']
        });

        console.log(orphanage);
        return res.json(orphanageView.renderMany(orphanage));

    },

    async show (req: Request, res: Response) {

        const { id } = req.params;

        const orpRepo = getRepository(Orphanage);

        const orphanage = await orpRepo.findOneOrFail(id, {
            relations: ['images']
        });

        console.log(orphanage);

        return res.json(orphanageView.render(orphanage));

    },

}