"use client";

import React from "react";
import { Award, ExternalLink, Calendar, ShieldCheck } from "lucide-react";
import { urlFor } from "../../sanity/client";
import InteractiveCard from "../InteractiveCard";

interface CertificationsSectionProps {
  certifications: any[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <section style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span className="mono-label">[03] credentials_vault</span>
        <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>VERIFIED CREDENTIALS</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          A ledger of verified technical certifications, courses, and professional credentials.
        </p>
      </section>

      {/* Grid List */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "2.5rem 1.5rem", marginTop: "1.5rem" }}>
        {certifications.map((cert, index) => {
          const imgUrl = urlFor(cert.logo)?.url();
          const numericId = String(index + 1).padStart(2, "0");
          return (
            <InteractiveCard 
              key={index} 
              asTabCard
              tabLabel={`CERTIFICATE ${numericId}`}
              tabIcon={<ShieldCheck size={12} style={{ color: "var(--accent)" }} />}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
              }}
            >
              {/* Body */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", flexGrow: 1 }}>
                {imgUrl ? (
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "var(--border-radius-sm)", 
                    overflow: "hidden", 
                    border: "1px solid var(--border-color)",
                    flexShrink: 0 
                  }}>
                    <img src={imgUrl} alt={cert.issuer} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                ) : (
                  <div style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "var(--border-radius-sm)", 
                    background: "rgba(255, 79, 24, 0.08)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    flexShrink: 0,
                    border: "1px solid var(--border-color)"
                  }}>
                    <Award size={24} style={{ color: "var(--accent)" }} />
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", lineHeight: "1.3" }}>{cert.name}</h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: "500" }}>{cert.issuer}</span>
                  
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-secondary)", fontSize: "0.75rem", fontFamily: "var(--font-mono)", marginTop: "0.25rem" }}>
                    <Calendar size={12} />
                    <span>Issued: {cert.issueDate}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {cert.verificationUrl && cert.verificationUrl !== "#" && (
                <div style={{ borderTop: "1px solid var(--border-color)", marginTop: "1.25rem", paddingTop: "1rem" }}>
                  <a 
                    href={cert.verificationUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-secondary" 
                    style={{ 
                      width: "100%", 
                      padding: "0.5rem 1rem", 
                      fontSize: "0.8rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <span>Verify Credential</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
}
