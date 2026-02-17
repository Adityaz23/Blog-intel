import { defineApp } from "convex/server";
import betterAuth from "./betterAuth/convex.config";
import presence from "@convex-dev/presence/convex.config.js";

const app = defineApp();
app.use(presence);

app.use(betterAuth);

export default app;