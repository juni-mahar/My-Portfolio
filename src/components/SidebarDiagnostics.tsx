"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Activity, Shield } from "lucide-react";
import { playTactileClick, playBootBleep, setMuteState, getMuteState } from "./AudioChime";

export default function SidebarDiagnostics() {
  const [cpu, setCpu] = useState(12.4);
  const [ram, setRam] = useState(38.2);
  const [isMuted, setIsMuted] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "SYS_READY: Core listener running",
    "NET_OK: API handshake verified"
  ]);

  useEffect(() => {
    setIsMuted(getMuteState());

    // CPU / RAM fluctuation interval
    const statsInterval = setInterval(() => {
      setCpu(parseFloat((8 + Math.random() * 15).toFixed(1)));
      setRam(parseFloat((35 + Math.random() * 5).toFixed(1)));
    }, 2000);

    // Live logging simulation ticker
    const logList = [
      "DB_CDN: Query completed in 12ms",
      "SEC_CSP: Hardened security policies active",
      "RENDER: Page bundle validated successfully",
      "THEME: Visual system sync complete",
      "AUDIO: Synthetic synthesizer online",
      "XSS: Input validation models active"
    ];

    const logsInterval = setInterval(() => {
      const randomLog = logList[Math.floor(Math.random() * logList.length)];
      const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs((prev) => [`[${timestamp}] ${randomLog}`, prev[0]].slice(0, 2));
    }, 4500);

    return () => {
      clearInterval(statsInterval);
      clearInterval(logsInterval);
    };
  }, []);

  const handleMuteToggle = () => {
    const nextMute = !isMuted;
    setMuteState(nextMute);
    setIsMuted(nextMute);
    if (!nextMute) {
      setTimeout(() => {
        playBootBleep();
      }, 50);
    } else {
      playTactileClick();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "1.25rem 0", margin: "1rem 0" }}>
      {/* Sound and System indicators */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Activity size={14} style={{ color: "var(--accent)", animation: "pulse 2s infinite" }} />
          <span className="mono-label" style={{ fontSize: "0.6rem", color: "var(--text-primary)" }}>Core Telemetry</span>
        </div>
        
        <button
          onClick={handleMuteToggle}
          style={{
            background: "transparent",
            border: "1px solid var(--border-color)",
            borderRadius: "4px",
            padding: "0.25rem 0.4rem",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.65rem",
            fontFamily: "var(--font-mono)",
            transition: "var(--transition)"
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-color)"; }}
        >
          {isMuted ? (
            <>
              <VolumeX size={10} />
              <span>MUTED</span>
            </>
          ) : (
            <>
              <Volume2 size={10} style={{ color: "var(--accent)" }} />
              <span>AUDIO</span>
            </>
          )}
        </button>
      </div>

      {/* Stats progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
            <span>CPU UTILIZATION</span>
            <span>{cpu}%</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "var(--border-color)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${(cpu / 30) * 100}%`, height: "100%", background: "var(--accent)", transition: "width 2s ease" }} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
            <span>RAM ALLOCATION</span>
            <span>{ram} MB</span>
          </div>
          <div style={{ width: "100%", height: "4px", background: "var(--border-color)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: `${(ram / 80) * 100}%`, height: "100%", background: "var(--text-primary)", transition: "width 2s ease" }} />
          </div>
        </div>
      </div>

      {/* SVG Telemetry sine wave animation */}
      <div style={{ height: "20px", display: "flex", alignItems: "center", overflow: "hidden", position: "relative" }}>
        <svg width="100%" height="20" style={{ opacity: 0.25 }}>
          <path 
            d="M 0,10 Q 25,2 50,10 T 100,10 T 150,10 T 200,10 T 250,10" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="1.5"
            style={{
              animation: "waveShift 3s linear infinite"
            }}
          />
        </svg>
      </div>

      {/* Live Server Logs Ticker */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--text-secondary)" }}>
        {logs.map((log, index) => (
          <div key={index} style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: index === 0 ? 1 : 0.6,
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}>
            <Shield size={8} style={{ color: "var(--accent)" }} />
            <span>{log}</span>
          </div>
        ))}
      </div>

      {/* Pulse & Wave animations keyframes in document head */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes waveShift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
      `}} />
    </div>
  );
}
