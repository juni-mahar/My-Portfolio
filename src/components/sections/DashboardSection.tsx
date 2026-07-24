"use client";

import React from "react";
import { Terminal, Cpu } from "lucide-react";
import CanvasOrb from "../CanvasOrb";
import InteractiveCard from "../InteractiveCard";

interface DashboardSectionProps {
  profile: any;
  techStack: any[];
}

export default function DashboardSection({ profile, techStack }: DashboardSectionProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Restructured Grid Hero Welcome banner */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "2rem", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="mono-label" style={{ background: "rgba(255, 79, 24, 0.1)", padding: "0.25rem 0.6rem", borderRadius: "4px" }}>
              ONLINE
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              // HOST_NAME: junaid-os-client
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: "1.1", fontWeight: 800, letterSpacing: "-0.03em" }}>
            BUILDING THE <span style={{ color: "var(--accent)" }}>FUTURE</span> OF SAAS PRODUCTS.
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: "1.6", marginTop: "0.5rem" }}>
            {profile.bio}
          </p>
        </div>
        
        {/* Playable 3D wireframe telemetry canvas orb */}
        <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at center, var(--accent-glow) 0%, transparent 60%)",
            opacity: 0.5,
            pointerEvents: "none"
          }} />
          <CanvasOrb />
        </div>
      </section>

      {/* Stats row cards using 3D InteractiveCard */}
      <section className="grid-responsive-stats">
        {profile.stats?.map((stat: any, index: number) => (
          <InteractiveCard 
            key={index} 
            style={{ 
              padding: "1.25rem", 
              borderLeft: index === 0 ? "3px solid var(--accent)" : "1px solid var(--border-color)" 
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.5rem", color: index === 0 ? "var(--accent)" : "var(--text-primary)" }}>
              {stat.value}
            </div>
          </InteractiveCard>
        ))}
      </section>

      {/* About Me & Tech Stack split grids */}
      <section className="grid-responsive-320">
        {/* About Me Tab Card */}
        <InteractiveCard asTabCard tabLabel="about_me.sh" tabIcon={<Terminal size={12} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>Muhammad Junaid</h3>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--accent)" }}>
              {profile.title}
            </span>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              I approach design and code with equal gravity. Through structured systems, custom micro-interactions, and high-performance routing frameworks, I build websites and SaaS apps that aren't just fast—they feel alive.
            </p>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              My engineering process values security first: strict data validation models, secure server communication channels, and hardened Content Security Policies.
            </p>
          </div>
        </InteractiveCard>

        {/* Tech Stack Tab Card */}
        <InteractiveCard asTabCard tabLabel="tech_stack.json" tabIcon={<Cpu size={12} />}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {techStack.map((category: any, catIdx: number) => (
              <div key={catIdx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <span className="mono-label" style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>
                  {category.category}
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {category.skills?.map((skill: any, skillIdx: number) => (
                    <div 
                      key={skillIdx} 
                      style={{ 
                        background: "rgba(var(--background-rgb), 0.6)", 
                        border: "1px solid var(--border-color)", 
                        borderRadius: "var(--border-radius-sm)", 
                        padding: "0.4rem 0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "var(--transition)"
                      }}
                      className="tech-badge"
                    >
                      <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>{skill.name}</span>
                      <span style={{ fontSize: "0.65rem", color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </InteractiveCard>
      </section>
    </div>
  );
}
