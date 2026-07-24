export const profile = {
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "title",
      title: "Title / Profession",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "bio",
      title: "Bio",
      type: "text",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "avatar",
      title: "Profile Avatar Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "resumeUrl",
      title: "Resume / CV Link",
      type: "url",
    },
    {
      name: "stats",
      title: "Profile Stats Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label (e.g., Projects)" },
            { name: "value", type: "string", title: "Value (e.g., 20+)" }
          ]
        }
      ]
    },
    {
      name: "socials",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "github", type: "url", title: "GitHub URL" },
        { name: "linkedin", type: "url", title: "LinkedIn URL" },
        { name: "twitter", type: "url", title: "Twitter / X URL" }
      ]
    }
  ]
};
