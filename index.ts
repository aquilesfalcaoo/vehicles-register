import "dotenv/config";
import { Server } from './src/server';

const server = new Server(3000);
server.start();
