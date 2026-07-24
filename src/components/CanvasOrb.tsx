"use client";

import React, { useRef, useEffect } from "react";

export default function CanvasOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 300;
    let height = canvas.height = 300;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * window.devicePixelRatio;
      height = canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      width = rect.width;
      height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate sphere points
    interface Point3D {
      x: number;
      y: number;
      z: number;
    }

    const points: Point3D[] = [];
    const numLatitudes = 8;
    const numLongitudes = 14;
    const radius = 95;

    for (let i = 0; i <= numLatitudes; i++) {
      const lat = (Math.PI * i) / numLatitudes - Math.PI / 2;
      for (let j = 0; j < numLongitudes; j++) {
        const lon = (2 * Math.PI * j) / numLongitudes;
        points.push({
          x: radius * Math.cos(lat) * Math.cos(lon),
          y: radius * Math.sin(lat),
          z: radius * Math.cos(lat) * Math.sin(lon),
        });
      }
    }

    let rotX = 0;
    let rotY = 0;
    const rotSpeedX = 0.0012; // Extremely slow, graceful movement
    const rotSpeedY = 0.0016;

    const rotateX = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x,
        y: p.y * cos - p.z * sin,
        z: p.y * sin + p.z * cos,
      };
    };

    const rotateY = (p: Point3D, angle: number): Point3D => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return {
        x: p.x * cos + p.z * sin,
        y: p.y,
        z: -p.x * sin + p.z * cos,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Faint background glow behind sphere
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        radius * 1.5
      );
      glow.addColorStop(0, "rgba(255, 79, 24, 0.1)");
      glow.addColorStop(0.6, "rgba(255, 79, 24, 0.01)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      rotX += rotSpeedX;
      rotY += rotSpeedY;

      const projectedPoints: { x: number; y: number; z: number }[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 350;

      points.forEach((p) => {
        let rotated = rotateX(p, rotX);
        rotated = rotateY(rotated, rotY);

        const cameraZ = 280;
        const scale = fov / (fov + rotated.z);
        projectedPoints.push({
          x: rotated.x * scale + centerX,
          y: rotated.y * scale + centerY,
          z: rotated.z,
        });
      });

      // Draw wireframe grid lines
      ctx.lineWidth = 0.6;

      for (let i = 0; i <= numLatitudes; i++) {
        for (let j = 0; j < numLongitudes; j++) {
          const idx = i * numLongitudes + j;
          const nextLonIdx = i * numLongitudes + ((j + 1) % numLongitudes);
          const nextLatIdx = (i + 1) * numLongitudes + j;

          const p1 = projectedPoints[idx];

          const getOpacity = (z1: number, z2: number) => {
            const avgZ = (z1 + z2) / 2;
            const normalizedZ = (avgZ + radius) / (2 * radius);
            return (1 - normalizedZ) * 0.4 + 0.08;
          };

          if (nextLonIdx < projectedPoints.length) {
            const p2 = projectedPoints[nextLonIdx];
            ctx.strokeStyle = `rgba(255, 79, 24, ${getOpacity(p1.z, p2.z)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }

          if (nextLatIdx < projectedPoints.length) {
            const p3 = projectedPoints[nextLatIdx];
            ctx.strokeStyle = `rgba(255, 79, 24, ${getOpacity(p1.z, p3.z) * 0.75})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.stroke();
          }
        }
      }

      // Draw intersection dots
      projectedPoints.forEach((p) => {
        const normalizedZ = (p.z + radius) / (2 * radius);
        const opacity = (1 - normalizedZ) * 0.5 + 0.08;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, opacity * 1.8, 0, 2 * Math.PI);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: "280px", 
          height: "280px",
          maxWidth: "100%",
          pointerEvents: "none" // Fully non-interactive
        }} 
      />
    </div>
  );
}
