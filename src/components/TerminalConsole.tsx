"use client";

import React, { useState, useRef, useEffect } from "react";
import { playTactileClick, playSuccessChime, playErrorBuzz } from "./AudioChime";

interface CommandHistory {
  cmd: string;
  output: string | React.ReactNode;
}

export default function TerminalConsole() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    { cmd: "sys_init", output: "JunaidOS Kernel v1.0.24 initialized.\nType 'help' for system entry points." }
  ]);
  const [isHacking, setIsHacking] = useState(false);
  const feedEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    const command = raw.toLowerCase();
    let response: string | React.ReactNode = "";

    if (!command) return;

    playTactileClick();

    switch (command) {
      case "help":
        response = (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <span>Available commands:</span>
            <span style={{ color: "var(--accent)" }}>  about         - Profile overview</span>
            <span style={{ color: "var(--accent)" }}>  projects      - Project registry</span>
            <span style={{ color: "var(--accent)" }}>  credentials   - Credentials audit</span>
            <span style={{ color: "var(--accent)" }}>  theme         - Toggle system theme</span>
            <span style={{ color: "var(--accent)" }}>  sudo hack     - Initialize matrix mode</span>
            <span style={{ color: "var(--accent)" }}>  clear         - Clear terminal feed</span>
          </div>
        );
        break;
      case "about":
        response = "Muhammad Junaid - SaaS Product Engineer & Design Technologist. Specializing in highly secure React / Next.js web architectures and pixel-perfect design systems.";
        break;
      case "projects":
        response = "Loaded 3 registry cores: [01] Noteform Builder (SaaS) | [02] Apollo Telemetry System (Rust) | [03] Editorial Lookbook (Frontend)";
        break;
      case "credentials":
        response = "Verified ledgers: Vercel Next.js Core Developer | Sanity.io CMS Developer Specialist | AWS Solutions Architect";
        break;
      case "theme":
        const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem("theme", nextTheme);
        response = `System theme changed to: ${nextTheme.toUpperCase()}`;
        playSuccessChime();
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "sudo hack":
        setIsHacking(true);
        playSuccessChime();
        let hackLines = [
          "Bypassing mainframe protocols...",
          "Decrypting Junaid's secret vaults...",
          "Injecting custom CSS matrices...",
          "CRITICAL SUCCESS: Portfolio fully hacked! v1.0.24 is yours."
        ];
        
        let counter = 0;
        const interval = setInterval(() => {
          if (counter < hackLines.length) {
            setHistory((prev) => [
              ...prev,
              { cmd: counter === 0 ? "sudo hack" : "", output: hackLines[counter] }
            ]);
            counter++;
            playTactileClick();
          } else {
            clearInterval(interval);
            setIsHacking(false);
          }
        }, 800);
        setInput("");
        return;
      default:
        response = `Command not found: '${raw}'. Type 'help' for instructions.`;
        playErrorBuzz();
    }

    setHistory((prev) => [...prev, { cmd: raw, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    }
  };

  return (
    <div 
      className="terminal-console"
      style={{
        background: "rgba(0, 0, 0, 0.9)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--border-radius-md)",
        padding: "0.8rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.72rem",
        color: "#33ff33", // Green text retro matrix style!
        display: "flex",
        flexDirection: "column",
        height: "170px",
        overflowY: "auto",
        transition: "var(--transition)",
        cursor: "text"
      }}
      onClick={(e) => {
        const inputEl = e.currentTarget.querySelector("input");
        inputEl?.focus();
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
        {history.map((h, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {h.cmd && (
              <span style={{ color: "#ffffff" }}>
                $ {h.cmd}
              </span>
            )}
            <div style={{ whiteSpace: "pre-wrap", color: h.cmd === "" ? "#33ff33" : "#33ff33" }}>{h.output}</div>
          </div>
        ))}
        <div ref={feedEndRef} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", borderTop: "1px solid rgba(51, 255, 51, 0.15)", paddingTop: "0.4rem", marginTop: "0.4rem" }}>
        <span style={{ color: "#ffffff" }}>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isHacking}
          placeholder={isHacking ? "HACKING..." : "type command..."}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            width: "100%"
          }}
        />
      </div>
    </div>
  );
}
