import { treaty } from "@elysiajs/eden";
import { Api } from "api/src";

const api = treaty<Api>("localhost:3100");
