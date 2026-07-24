"use client";

import React from "react";

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
  if (asTabCard) {
    return (
      <div 
        className={`folder-tab-card ${className}`}
        style={{
          cursor: "default",
          transition: "var(--transition)",
          ...style
        }}
        {...props}
      >
        <div className="folder-tab-header">
          {tabIcon}
          <span>{tabLabel}</span>
          <div className="folder-tab-header-fill-fix" />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`folder-card ${className}`}
      style={{
        cursor: "default",
        transition: "var(--transition)",
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
