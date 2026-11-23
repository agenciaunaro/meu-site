import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "unaro",
  title: "Unaro | Painel",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) => S.list().title("Conteúdo").items([
        S.listItem().title("Blog").child(S.list().title("Blog").items([
          S.documentTypeListItem("post").title("Artigos"),
          S.documentTypeListItem("category").title("Categorias"),
          S.documentTypeListItem("author").title("Autores"),
        ])),
        S.documentTypeListItem("project").title("Projetos e sites"),
        S.documentTypeListItem("service").title("Serviços"),
        S.documentTypeListItem("testimonial").title("Depoimentos reais"),
        S.listItem().title("Configurações do site").child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
