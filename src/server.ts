import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from './routes/projectRoutes'
import morgan from "morgan";

dotenv.config();
connectDB();

const app = express();
app.use(cors(corsConfig))

//lodig
app.use(morgan('dev'))
app.use(express.json())

//routes
app.use('/api/projects', projectRoutes)

export default app;