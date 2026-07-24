import React from "react";
import PortfolioClientPage from "@/components/PortfolioClientPage";
import { getProfile, getProjects, getCertifications, getTechStack } from "@/sanity/client";

// Ensure page data is refreshed on visits, but static loading works with fallback
export const revalidate = 60; 

export default async function Home() {
  // Parallel server fetches for high performance
  const [profile, projects, certifications, techStack] = await Promise.all([
    getProfile(),
    getProjects(),
    getCertifications(),
    getTechStack(),
  ]);

  return (
    <PortfolioClientPage
      profile={profile}
      projects={projects}
      certifications={certifications}
      techStack={techStack}
    />
  );
}
