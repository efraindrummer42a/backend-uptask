import type { Request, Response } from "express"
import colors from 'colors'
import Project from "../models/Project";

export class ProjectController {

    static createProject = async(req: Request, res: Response) => {
        console.log(colors.red.bold('createProject....'))

        const project = new Project(req.body)
        try {
            await project.save();
            res.send('Proyecto Creado Correctamente');
        } catch (error) {
            console.log(error)
        }
    }
    
    static getAllProjects = async(req: Request, res: Response) => {
        console.log(colors.blue.bold('getAllProject...'));

        try {
            const projects = await Project.find({})
            res.json(projects);
        } catch (error) {
            console.log(error)
        }
    }

    static getProjectById = async(req: Request, res: Response) => {
        console.log(colors.yellow.bold('getProjectById...'))

        const { id } = req.params;
        console.log(id)

        try {
            const project = await Project.findById(id).populate('tasks')

            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message });
            }
            res.json(project)
        } catch (error) {
            console.log(error);
        }
    }
    
    static updateProject = async(req: Request, res: Response) => {
        console.log(colors.green.bold('updateProject...'))

        const { id } = req.params;
        console.log(id)

        try {
            const project = await Project.findByIdAndUpdate(id, req.body);

            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message });
            }

            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description

            const p = await project.save();
            console.log(p)
            res.send('Proyecto actualizado')


        } catch (error) {
            console.log(error);
        }
    }

    static deleteProject = async(req: Request, res: Response) => {
        console.log(colors.yellow.bold('deleteProjectById...'))

        const { id } = req.params;
        console.log(id)

        try {
            const project = await Project.findById(id);

            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message });
            }

            await project.deleteOne()
            res.send('Proyecto eliminado')
        } catch (error) {
            console.log(error);
        }
    }
}