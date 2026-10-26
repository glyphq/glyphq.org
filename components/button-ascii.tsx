"use client";

import { useEffect, useRef } from "react";

const characters = " .:-=+xX0S8#@";

export function ButtonAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let active = true;

    const draw = () => {
      if (!active) return;
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      const context = canvas.getContext("2d");
      if (!context) return;

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const match = getComputedStyle(host).color.match(/\d+(?:\.\d+)?/g);
      const color = `${match?.[0] ?? 0}, ${match?.[1] ?? 0}, ${match?.[2] ?? 0}`;
      const cell = 10;
      const columns = Math.max(1, Math.ceil(width / (cell * 0.62)));
      const rows = Math.max(1, Math.ceil(height / cell));

      context.font = `500 ${cell}px "Geist Mono", ui-monospace, monospace`;
      context.textAlign = "center";
      context.textBaseline = "middle";

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          const x = (column + 0.5) / columns;
          const y = (row + 0.5) / rows;
          const glow = Math.max(0, 1 - Math.abs(y - 0.55) * 2.6);
          const wave = 0.5 + 0.5 * Math.sin(x * 8 + y * 4);
          const tone = Math.min(1, 0.18 + glow * 0.7 + wave * 0.18);
          const character =
            characters[
              Math.min(
                characters.length - 1,
                Math.floor(tone * characters.length),
              )
            ];
          const alpha = 0.07 + tone * 0.28;

          context.fillStyle = `rgba(${color}, ${alpha})`;
          context.fillText(
            character,
            (column + 0.5) * (width / columns),
            (row + 0.5) * (height / rows),
          );
        }
      }
    };

    draw();
    document.fonts.ready.then(draw);

    const observer = new ResizeObserver(draw);
    observer.observe(host);

    return () => {
      active = false;
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
