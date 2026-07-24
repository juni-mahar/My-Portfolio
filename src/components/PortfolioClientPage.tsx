"use client";

import React, { useState } from "react";
import AppShell from "./AppShell";
import DashboardSection from "./sections/DashboardSection";
import ProjectsSection from "./sections/ProjectsSection";
import CertificationsSection from "./sections/CertificationsSection";
import ContactSection from "./sections/ContactSection";

interface PortfolioClientPageProps {
  profile: any;
  projects: any[];
  certifications: any[];
  techStack: any[];
}

export default function PortfolioClientPage({
  profile,
  projects,
  certifications,
  techStack,
}: PortfolioClientPageProps) {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <AppShell>
      {(currentTab) => (
        <div style={{ animation: "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
          {currentTab === "dashboard" && (
            <DashboardSection profile={profile} techStack={techStack} />
          )}
          {currentTab === "projects" && (
            <ProjectsSection projects={projects} />
          )}
          {currentTab === "certifications" && (
            <CertificationsSection certifications={certifications} />
          )}
          {currentTab === "contact" && (
            <ContactSection profile={profile} />
          )}
          
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}} />
        </div>
      )}
    </AppShell>
  );
}
