import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Hero } from "./components/Hero";
import { Second } from "./components/Second";
import { ProfileCard } from "./components/ProfileCard";
import { ChristmasLights } from "./components/ChristmasLights";

gsap.registerPlugin(ScrollTrigger);

function App() {
    const [isScrolling, setIsScrolling] = useState(false);
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false),
    });

    tl.to("#loader", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 1,
    }).set("#loader", { display: "none" });
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);



  //Profile card 

  useEffect(() => {

  const mm = gsap.matchMedia();

  // ================= DESKTOP =================
  mm.add("(min-width: 1024px)", () => {

    gsap.to(".cards", {
      x: -2400,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 1,
        pin: true,
        // markers:true,
        onUpdate: () => setIsScrolling(true),
      onScrubComplete: () => setIsScrolling(false),
      },
    });

  });

  // ================= MOBILE =================
  mm.add("(max-width: 1023px)", () => {

    const cards = gsap.utils.toArray(".card");

 gsap.set(cards, {
  position: "absolute",
  top: "50%",
  left: "50%",
  xPercent: -50,
  yPercent: -50,
});


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${cards.length * window.innerHeight * 2}`,
        scrub: 1,
        pin: true,
        onUpdate: () => setIsScrolling(true),       // ✅ ADD THIS
        onScrubComplete: () => setIsScrolling(false),


      },
    });

    cards.forEach((card, index) => {

      if (index === 0) return;

      tl.fromTo(
        card,
        {
          y: 300,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        }
      );

    });

  });

  return () => {
    mm.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };

}, []);

  return (
    <div className="bg-black overflow-x-hidden">
      <div
        id="loader"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
      <Hero />
      
      <section
  ref={sectionRef}
  className="h-screen overflow-hidden flex justify-center relative "
>
  <ChristmasLights  active={isScrolling} /> 
        <div className="
  cards
  relative
  w-full
  h-screen

  lg:flex
  lg:flex-row
  gap-10
  lg:px-20
  lg:pt-20
">
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />

        </div>
      </section>




    </div>
  );
}

export default App;
