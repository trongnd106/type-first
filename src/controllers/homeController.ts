import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const results = await prisma.employees.findMany();
        res.render('home.ejs', { listUsers: results });
    } catch (er) {
        console.error(er);
        res.status(500).send('Internal Server Error');
    }
}

export const insertAnEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id, name, position, dayin, dayout } = req.body;

    const existingUser = await prisma.employees.findMany({ where: {id} });
    if (existingUser) {
        res.status(409).send(JSON.stringify({ error: 'ID already exists' }));
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dayin) || !dateRegex.test(dayout)) {
        res.status(400).send(JSON.stringify({ error: 'Invalid format. Please re-enter as dd/mm/yyyy' }));
    }

    try {
        await prisma.employees.create({
            data: {
                id,
                name,
                position,
                dayin,
                dayout
            }
        });
        res.redirect('/');
    } catch (er) {
        console.error(er);
        res.status(500).send('Internal Server Error');
    }
}

export const createEmployy = (req: Request, res: Response): void => {
    res.render('create.ejs');
}

export const updateAnEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id, name, position, dayin, dayout } = req.body;

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dayin) || !dateRegex.test(dayout)) {
        res.status(400).send(JSON.stringify({ error: 'Invalid format. Please re-enter as dd/mm/yyyy' }));
    }

    try {
        await prisma.employees.update({
            where: { id },
            data: {
                id,
                name,
                position,
                dayin,
                dayout
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export const deleteAnEmployee = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const results = await prisma.employees.findMany({
            where: { id }
        });
        if (results.length > 0) {
            res.render('delete.ejs', { userId: results[0] });
        } else {
            res.status(404).send('Employee not found');
        }
    } catch(e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
}

export const handleDeleteEmp = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.employees.delete({
            where: { id }
        });
        res.redirect('/');
    } catch (er) {
        console.error(er);
        res.status(500).send('Internal Server Error');
    }
}

export const getEmployeebyId = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const results = await prisma.employees.findMany({
            where: { id }
        });
        const user = results.length > 0 ? results[0] : null;
        res.render('update.ejs', { userId: user });
    } catch (er) {
        console.error(er);
        res.status(500).send('Internal Server Error');
    }
}
