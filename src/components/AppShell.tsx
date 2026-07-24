"use client";

import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Award, 
  Mail, 
  Terminal, 
  Menu, 
  X, 
  ArrowRight
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import SidebarDiagnostics from "./SidebarDiagnostics";
import TerminalConsole from "./TerminalConsole";
import CursorGlow from "./CursorGlow";
import { playTactileClick, playBootBleep } from "./AudioChime";

interface AppShellProps {
  children: (activeTab: string, setActiveTab: (tab: string) => void) => React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    // Play system boot synth sound on client load
    setTimeout(() => {
      playBootBleep();
    }, 200);

    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "certifications", label: "Credentials", icon: Award },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="app-container">
      {/* PC / Tablet Left Sidebar Shell */}
      <aside className="app-sidebar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "2rem" }}>
          <div style={{
            background: "var(--accent)",
            color: "#FFFFFF",
            width: "36px",
            height: "36px",
            borderRadius: "var(--border-radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontWeight: "bold",
            fontSize: "1.1rem"
          }}>
            J
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", lineHeight: "1.2" }}>Junaid's OS</h3>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>v1.0.24</span>
          </div>
        </div>

        <nav>
          <span className="mono-label" style={{ fontSize: "0.65rem", paddingLeft: "1rem" }}>Navigation</span>
          <div className="nav-links">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playTactileClick();
                    setActiveTab(item.id);
                  }}
                  className={`nav-link ${activeTab === item.id ? "active" : ""}`}
                  style={{ background: "transparent", border: "none", width: "100%", textAlign: "left", cursor: "pointer" }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Live System Diagnostics & Terminal Console */}
        <SidebarDiagnostics />
        <TerminalConsole />

        {/* Sidebar Footer */}
        <div style={{ marginTop: "1rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>System Online</span>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{currentTime}</span>
          </div>
          <ThemeToggle />
        </div>
      </aside>

      {/* Cursor spotlight tracking helper */}
      <CursorGlow />

      {/* Mobile Top Header Shell */}
      <div className="mobile-header-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            background: "var(--accent)",
            color: "#FFFFFF",
            width: "28px",
            height: "28px",
            borderRadius: "var(--border-radius-sm)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontWeight: "bold",
            fontSize: "0.9rem"
          }}>
            J
          </div>
          <h3 style={{ fontSize: "0.95rem" }}>Junaid's Portfolio</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>{currentTime}</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Workspace Frame */}
      <main className="app-main">
        {children(activeTab, setActiveTab)}
      </main>

      {/* Mobile Bottom Tabbar Navigation */}
      <nav className="mobile-nav-bar">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                playTactileClick();
                setActiveTab(item.id);
              }}
              className={`mobile-nav-item ${activeTab === item.id ? "active" : ""}`}
              style={{ background: "transparent", border: "none", cursor: "pointer", outline: "none" }}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
