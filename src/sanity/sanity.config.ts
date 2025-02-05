import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./schema";

export const SanityConfig = defineConfig({
    name: "default",
    title: "studio",
    projectId: "zdbi0t6c",
    dataset: "production",
    plugins: [structureTool(), visionTool()],
    basePath: "/studio",
    schema: {
        types: schema
    }
})

