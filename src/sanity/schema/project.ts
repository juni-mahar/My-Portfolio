export const project = {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "SaaS Application", value: "saas" },
          { title: "AI & Data Science", value: "ai" },
          { title: "Frontend / Creative", value: "frontend" },
          { title: "System Tool", value: "system" }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Project Cover Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "techStack",
      title: "Technologies Used",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "liveUrl",
      title: "Live Application URL",
      type: "url",
    },
    {
      name: "githubUrl",
      title: "GitHub Repository URL",
      type: "url",
    },
    {
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      initialValue: false,
    }
  ]
};
