"use client";

import React, { useState } from "react";
import { Folder, ExternalLink, Eye, Terminal } from "lucide-react";
import { urlFor } from "../../sanity/client";
import { GithubIcon } from "../Icons";
import InteractiveCard from "../InteractiveCard";

interface ProjectsSectionProps {
  projects: any[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Systems" },
    { id: "saas", label: "SaaS Apps" },
    { id: "ai", label: "AI Systems" },
    { id: "frontend", label: "Creative UX" },
    { id: "system", label: "System Dev" },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <section style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span className="mono-label">[02] repository_index</span>
        <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>PROJECT REGISTRY</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          Explore curated full-stack applications, developer utilities, and high-performance interactive products.
        </p>
      </section>

      {/* Filter Tabs */}
      <div 
        style={{ 
          display: "flex", 
          gap: "0.5rem", 
          overflowX: "auto", 
          paddingBottom: "0.5rem", 
          borderBottom: "1px solid var(--border-color)" 
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            style={{
              background: filter === cat.id ? "var(--accent)" : "transparent",
              color: filter === cat.id ? "#FFFFFF" : "var(--text-secondary)",
              border: filter === cat.id ? "1px solid var(--accent)" : "1px solid var(--border-color)",
              padding: "0.4rem 1rem",
              borderRadius: "var(--border-radius-sm)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-mono)",
              fontWeight: filter === cat.id ? "600" : "500",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "var(--transition)",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div 
        style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "2.5rem 1.5rem",
          marginTop: "1rem"
        }}
      >
        {filteredProjects.map((project, index) => {
          const imgUrl = urlFor(project.image)?.url();
          return (
            <InteractiveCard 
              key={index} 
              asTabCard
              tabLabel={project.category?.toUpperCase() || "PROJECT"}
              tabIcon={<Folder size={12} style={{ color: project.featured ? "var(--accent)" : "var(--text-secondary)" }} />}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between"
              }}
            >
              {/* Card Body */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1 }}>
                {imgUrl ? (
                  <div style={{ 
                    width: "100%", 
                    height: "160px", 
                    borderRadius: "var(--border-radius-md)", 
                    overflow: "hidden", 
                    border: "1px solid var(--border-color)",
                    position: "relative"
                  }}>
                    <img 
                      src={imgUrl} 
                      alt={project.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                  </div>
                ) : (
                  // Fallback sleek geometric design badge when image is missing to look premium
                  <div style={{
                    width: "100%",
                    height: "160px",
                    borderRadius: "var(--border-radius-md)",
                    background: "linear-gradient(135deg, rgba(var(--background-rgb), 0.8), rgba(var(--card-bg-rgb), 0.8))",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden"
                  }}>
                    {/* SVG grid lines and glowing text */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 60%)",
                      opacity: 0.8
                    }} />
                    <Terminal size={40} style={{ color: "var(--accent)", zIndex: 1, opacity: 0.8 }} />
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "700" }}>{project.title}</h3>
                  <p style={{ 
                    color: "var(--text-secondary)", 
                    fontSize: "0.88rem", 
                    marginTop: "0.5rem",
                    lineHeight: "1.5",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "auto" }}>
                  {project.techStack?.map((tech: string, tIdx: number) => (
                    <span 
                      key={tIdx} 
                      style={{ 
                        fontSize: "0.7rem", 
                        fontFamily: "var(--font-mono)", 
                        background: "rgba(var(--background-rgb), 0.8)", 
                        border: "1px solid var(--border-color)", 
                        padding: "0.2rem 0.5rem", 
                        borderRadius: "4px",
                        color: "var(--text-secondary)"
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div 
                style={{ 
                  display: "flex", 
                  gap: "0.75rem", 
                  borderTop: "1px solid var(--border-color)", 
                  marginTop: "1.25rem", 
                  paddingTop: "1rem" 
                }}
              >
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-primary" 
                    style={{ flex: 1, padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                  >
                    <Eye size={14} />
                    <span>Launch</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-secondary" 
                    style={{ flex: 1, padding: "0.5rem 1rem", fontSize: "0.8rem" }}
                  >
                    <GithubIcon size={14} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
}
