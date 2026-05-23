import { useEffect, useRef } from "react";

const COLORS = ["#ff2200", "#ff6600", "#ff0044", "#cc0000", "#ff0044"];

export function ChristmasLights({ active }) {
  const bulbRefs = useRef([]);
  const rafRef = useRef(null);
  const isFlickering = useRef(false);

  useEffect(() => {
    if (active && !isFlickering.current) {
      isFlickering.current = true;
      flicker();
    } else if (!active) {
      isFlickering.current = false;
      cancelAnimationFrame(rafRef.current);
      bulbRefs.current.forEach(b => {
        if (b) {
          b.style.background = "#333";
          b.style.boxShadow = "none";
          b.style.borderColor = "#444";
        }
      });
    }
  }, [active]);

  function flicker() {
    if (!isFlickering.current) return;
    bulbRefs.current.forEach((b, i) => {
      if (!b) return;
      const on = Math.random() > 0.3;
      const color = COLORS[i % COLORS.length];
      b.style.background = on ? color : "#333";
      b.style.boxShadow = on ? `0 0 8px 2px ${color}` : "none";
      b.style.borderColor = on ? color : "#444";
    });
    rafRef.current = requestAnimationFrame(() =>
      setTimeout(flicker, 60 + Math.random() * 100)
    );
  }

  return (
    <div style={{
      position: "fixed", 
      top: 0,
      left: 0,
      right: 0,
      display: "flex",
      alignItems: "center",
      padding: "8px 24px",
      zIndex: 50,
    }}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div
            ref={el => bulbRefs.current[i] = el}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#333",
              border: "1.5px solid #444",
              transition: "all 0.05s",
            }}
          />
          {i < 15 && (
            <div style={{ width: 20, height: 1.5, background: "#444" }} />
          )}
        </div>
      ))}
    </div>
  );
}