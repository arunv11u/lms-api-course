import { Server } from "http";
import { Express } from "express";


export interface Loader {
	load(app: Express, server: Server): Promise<boolean>;
}
