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
            const { taskId } = req.params;

            console.log(colors.red.bold(taskId))

            const task = await Task.findById(taskId);
            if(!task){
                const error = new Error('Tarea no encontrada');
                return res.status(404).json({ error: error.message })
            }

            if(task.project.toString() !== req.project.id){
                const error = new Error('Accion no valida');
                return res.status(400).json({ error: error.message })
            }

            res.json(task)
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static updateTask = async(req: Request, res: Response) => {
        console.log('updateTask......');

        const { taskId } = req.params

        try {
            const task = await Task.findByIdAndUpdate(taskId, req.body);
            if(!task){
                const error = new Error('Tarea no encontrada');
                return res.status(404).json({ error: error.message })
            }

            if(task.project.toString() !== req.project.id){
                const error = new Error('Accion no valida');
                return res.status(400).json({ error: error.message })
            }

            res.json("Tarea Actualizada Correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });   
        }
    }
}