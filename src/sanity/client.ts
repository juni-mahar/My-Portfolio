import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { mockProfile, mockProjects, mockCertifications, mockTechStack } from "./mockData";
import { projectId, dataset } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-24",
  useCdn: true, // true to use edge cache, false to get live drafts
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) return null;
  return builder.image(source);
}

// Fetch Profile
export async function getProfile() {
  try {
    const data = await client.fetch(`*[_type == "profile"][0]`);
    return data || mockProfile;
  } catch (error) {
    console.warn("Sanity fetch profile failed, using mock fallback:", error);
    return mockProfile;
  }
}

// Fetch Projects
export async function getProjects() {
  try {
    const data = await client.fetch(`*[_type == "project"] | order(featured desc, _createdAt desc)`);
    return (data && data.length > 0) ? data : mockProjects;
  } catch (error) {
    console.warn("Sanity fetch projects failed, using mock fallback:", error);
    return mockProjects;
  }
}

// Fetch Certifications
export async function getCertifications() {
  try {
    const data = await client.fetch(`*[_type == "certification"] | order(_createdAt desc)`);
    return (data && data.length > 0) ? data : mockCertifications;
  } catch (error) {
    console.warn("Sanity fetch certifications failed, using mock fallback:", error);
    return mockCertifications;
  }
}

// Fetch Tech Stack
export async function getTechStack() {
  try {
    const data = await client.fetch(`*[_type == "techstack"] | order(order asc)`);
    return (data && data.length > 0) ? data : mockTechStack;
  } catch (error) {
    console.warn("Sanity fetch techstack failed, using mock fallback:", error);
    return mockTechStack;
  }
}
