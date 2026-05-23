import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProfileCard() {
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const timerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const scrollParent = card.closest(".overflow-x-auto") || window;

    function flicker() {
      const opacity = (0.5 + Math.random() * 0.5).toFixed(2);
      card.style.setProperty("--flicker-opacity", opacity);
      rafRef.current = requestAnimationFrame(() =>
        setTimeout(flicker, 40 + Math.random() * 80)
      );
    }

    function stop() {
      card.classList.remove("scrolling");
      cancelAnimationFrame(rafRef.current);
      card.style.setProperty("--flicker-opacity", "0");
    }

    function onScroll() {
      if (!card.classList.contains("scrolling")) {
        card.classList.add("scrolling");
        flicker();
      }
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(stop, 300);
    }

    scrollParent.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scrollParent.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:relative lg:left-auto lg:top-auto lg:translate-x-0 lg:translate-y-0 flex justify-center items-center"
      onClick={() => navigate("/event")}
    >
      <div
        ref={cardRef}
        className="profile-card w-96 bg-[oklch(21%_0.034_264.665)] rounded-2xl overflow-hidden shadow-xl relative"
      >
        <div className="h-[500px] overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/15/b4/80/15b48077a47ef26b94ac1ee5b79825b9.jpg"
            alt="profile"
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="text-center py-6">
          <h2 className="custom-fontt">Natalie Paisley</h2>
        </div>
      </div>
    </div>
  );
}