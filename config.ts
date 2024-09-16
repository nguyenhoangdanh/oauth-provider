import DotenvFlow from "dotenv-flow";

DotenvFlow.config();

export const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';