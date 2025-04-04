import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { systemInfo } from "./systemInfo/systemInfo.ts";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/si", () => systemInfo())
  .listen(3100);
export type Api = typeof app;
