export const techstack = {
  name: "techstack",
  title: "Tech Stack",
  type: "document",
  fields: [
    {
      name: "category",
      title: "Category Name (e.g. Frontend, Databases)",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0
    },
    {
      name: "skills",
      title: "Skills / Technologies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Technology Name (e.g. React)" },
            { name: "level", type: "string", title: "Proficiency (e.g. Advanced)" }
          ]
        }
      ]
    }
  ]
};
