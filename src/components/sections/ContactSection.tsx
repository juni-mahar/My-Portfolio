"use client";

import { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import { sendContactMessage } from "../../app/actions/contact";
import { GithubIcon, LinkedinIcon, TwitterXIcon } from "../Icons";

interface ContactSectionProps {
  profile: any;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      setFeedbackMsg("Please fill in all fields.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await sendContactMessage({ name, email, message });
      if (response.success) {
        setStatus("success");
        setFeedbackMsg(response.message);
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedbackMsg(response.message);
      }
    } catch (err) {
      setStatus("error");
      setFeedbackMsg("Connection lost. Please try again later.");
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2.5rem" }}>
      {/* Contact Info & Socials */}
      <section style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <span className="mono-label">[04] communication_channel</span>
          <h2 style={{ fontSize: "2rem", fontWeight: "800" }}>CONNECT WITH ME</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5" }}>
            Initialize a connection. Send a secure encrypted message or follow my public channels.
          </p>
        </div>

        {/* Directory links folder cards */}
        <div className="folder-tab-card" style={{ marginTop: "0.5rem" }}>
          <div className="folder-tab-header">
            <Mail size={12} style={{ color: "var(--accent)" }} />
            <span>channels.sh</span>
            <div className="folder-tab-header-fill-fix" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a 
              href={profile.socials?.linkedin || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary" 
              style={{ display: "flex", justifyContent: "flex-start", gap: "1rem", width: "100%" }}
            >
              <LinkedinIcon size={18} style={{ color: "var(--accent)" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>LinkedIn Network</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>/in/muhammad-junaid</span>
              </div>
            </a>

            <a 
              href={profile.socials?.github || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary" 
              style={{ display: "flex", justifyContent: "flex-start", gap: "1rem", width: "100%" }}
            >
              <GithubIcon size={18} style={{ color: "var(--accent)" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>GitHub Core Repository</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>/github/junaid</span>
              </div>
            </a>

            <a 
              href={profile.socials?.twitter || "#"} 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary" 
              style={{ display: "flex", justifyContent: "flex-start", gap: "1rem", width: "100%" }}
            >
              <TwitterXIcon size={18} style={{ color: "var(--accent)" }} />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Twitter / X Feed</span>
                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>/twitter/junaid</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Secure Form */}
      <section className="folder-tab-card">
        <div className="folder-tab-header">
          <Send size={12} style={{ color: "var(--accent)" }} />
          <span>secure_message_payload</span>
          <div className="folder-tab-header-fill-fix" />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Sender Identity (Name)
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              disabled={status === "submitting"}
              style={{
                background: "rgba(var(--background-rgb), 0.6)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius-sm)",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "var(--transition)"
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Return Endpoint (Email Address)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. client@saas-corp.com"
              disabled={status === "submitting"}
              style={{
                background: "rgba(var(--background-rgb), 0.6)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius-sm)",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                outline: "none",
                transition: "var(--transition)"
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Message Payload (Text Body)
            </label>
            <textarea
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message payload details here..."
              disabled={status === "submitting"}
              style={{
                background: "rgba(var(--background-rgb), 0.6)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius-sm)",
                padding: "0.75rem 1rem",
                color: "var(--text-primary)",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                outline: "none",
                resize: "none",
                transition: "var(--transition)"
              }}
              onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.target.style.borderColor = "var(--border-color)"; }}
            />
          </div>

          {/* Form Actions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary"
              style={{ width: "100%", padding: "0.85rem", gap: "0.6rem" }}
            >
              {status === "submitting" ? (
                <>
                  <div className="spinner" style={{
                    width: "14px",
                    height: "14px",
                    border: "2px solid #ffffff",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                  }} />
                  <span>TRANSMITTING MESSAGE...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>DISPATCH MESSAGE PAYLOAD</span>
                </>
              )}
            </button>

            {/* Status alerts */}
            {status === "success" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgb(16, 185, 129)", color: "rgb(16, 185, 129)", padding: "0.75rem", borderRadius: "var(--border-radius-sm)", fontSize: "0.85rem" }}>
                <Check size={16} />
                <span>{feedbackMsg}</span>
              </div>
            )}

            {status === "error" && (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgb(239, 68, 68)", color: "rgb(239, 68, 68)", padding: "0.75rem", borderRadius: "var(--border-radius-sm)", fontSize: "0.85rem" }}>
                <AlertCircle size={16} />
                <span>{feedbackMsg}</span>
              </div>
            )}
          </div>
        </form>

        {/* Global animation style helper */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}} />
      </section>
    </div>
  );
}
