"use client";

import React, { useRef } from "react";
import { playTactileClick } from "./AudioChime";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  asTabCard?: boolean;
  tabLabel?: string;
  tabIcon?: React.ReactNode;
}

export default function InteractiveCard({
  children,
  asTabCard = false,
  tabLabel = "module.sh",
  tabIcon,
  className = "",
  style = {},
  ...props
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Soft 3D perspective rotation tilt
    const rotX = -((y - centerY) / centerY) * 7; // Up to 7 degrees tilt
    const rotY = ((x - centerX) / centerX) * 7;

    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.015, 1.015, 1.015)`;
    
    // Set custom coordinates for the border/spotlight follow glow
    el.style.setProperty("--mouse-x-local", `${x}px`);
    el.style.setProperty("--mouse-y-local", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const handleMouseDown = () => {
    playTactileClick();
  };

  if (asTabCard) {
    return (
      <div 
        ref={cardRef}
        className={`folder-tab-card ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          cursor: "pointer",
          ...style
        }}
        {...props}
      >
        <div className="folder-tab-header">
          {tabIcon}
          <span>{tabLabel}</span>
          <div className="folder-tab-header-fill-fix" />
        </div>
        <div style={{ transform: "translateZ(10px)" }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`folder-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        cursor: "pointer",
        ...style
      }}
      {...props}
    >
      <div style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </div>
  );
}
