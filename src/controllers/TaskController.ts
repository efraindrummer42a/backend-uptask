import type { Request, Response } from "express";
import Task from "../models/Task";
import colors from 'colors'


export class TaskController { 

    static createProject = async(req: Request, res: Response) => {
        console.log('createProject.....')

        try {
            const task = new Task(req.body);
            task.project = req.project.id
            req.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Tarea creada correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static getProjectTasks = async(req: Request, res: Response) => {
        console.log('getProjectTasks....')

        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project')
            res.json(tasks); 
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static getTasksById = async(req: Request, res: Response) => {
        console.log('getTasksById....');
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static updateTask = async(req: Request, res: Response) => {
        console.log('updateTask......');
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description,    
            await req.task.save()

            res.json("Tarea Actualizada Correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });   
        }
    }

    static deleteTask = async(req: Request, res: Response) => {
        console.log('deleteTask....');

        try {
            req.project.tasks = req.project.tasks.filter( task => task.toString() !== req.task.id.toString())
            await Promise.allSettled([ req.task.deleteOne(), req.project.save() ]),
            res.json("Tarea Eliminada Correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static updateStatus = async(req: Request, res: Response) => {
        console.log('updateStatus....');

        try {
            const { status } = req.body;
            req.task.status = status

            await req.task.save()
            res.send('Tarea Actualizada Correctamente');
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
}