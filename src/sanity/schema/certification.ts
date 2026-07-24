export const certification = {
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Certification Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "issueDate",
      title: "Issue Date (e.g. July 2026)",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "verificationUrl",
      title: "Credential Verification URL",
      type: "url",
    },
    {
      name: "logo",
      title: "Credential Badge / Logo",
      type: "image",
      options: { hotspot: true }
    }
  ]
};
