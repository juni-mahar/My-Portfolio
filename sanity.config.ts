import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema";

import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Junaid's Portfolio OS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
