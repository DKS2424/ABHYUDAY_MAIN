import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const leftTreesRef = useRef(null);
  const rightTreesRef = useRef(null);
  const kidsRef = useRef(null);
  const heroTextRef = useRef(null);
  const blackRef = useRef(null);
  const abRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const elements = [
        bgRef.current,
        leftTreesRef.current,
        rightTreesRef.current,
        kidsRef.current,
        heroTextRef.current,
      ];

      gsap.set(elements, { willChange: "transform, filter", force3D: true });
      gsap.set(heroTextRef.current, { visibility: "visible", opacity: 1 });
      gsap.set([blackRef.current, abRef.current], { y: "100%", force3D: true });
      gsap.set(abRef.current, { force3D: true });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        bgRef.current,
        {
          ...(isMobile ? {} : { filter: "blur(6px)" }),
          scale: 1.2,
          ease: null,
        },
        0,
      )
        .to(
          leftTreesRef.current,
          {
            y: isMobile ? -25 : -50,
            x: isMobile ? -75 : -150,
            ...(isMobile ? {} : { filter: "blur(6px)" }),
            ease: null,
          },
          0,
        )
        .to(
          rightTreesRef.current,
          {
            y: isMobile ? -25 : -50,
            x: isMobile ? 75 : 150,
            ...(isMobile ? {} : { filter: "blur(6px)" }),
            ease: null,
          },
          0,
        )
        .to(
          kidsRef.current,
          {
            y: isMobile ? -60 : -120,
            scale: isMobile ? 1.5 : 2,
            ease: null,
          },
          0,
        )
        .to(
          heroTextRef.current,
          {
            y: isMobile ? -180 : -360,
            opacity: 1,
            visibility: "visible",
            ease: null,
            duration: 0.5,
          },
          0,
        )
        .to(
          abRef.current,
          {
            y: 0,
            ease: null,
          },
          0.3,
        )
        .to(
          blackRef.current,
          {
            y: 0,
            ease: null,
          },
          0.4,
        )
        .to(
          abRef.current,
          {
            y: 0,
            force3D: true,
          },
          0.3,
        )
        .to(
          blackRef.current,
          {
            y: 0,
            force3D: true,
          },
          0.4,
        )
        .to(
          abRef.current,
          {
            y: -50,
            force3D: true,
          },
          0.6,
        );
    });

    let rafId;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    ro.observe(document.documentElement);

    return () => {
      ctx.revert();
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative w-screen h-screen overflow-hidden">
      <img
        ref={bgRef}
        src="/strange-bg-sans-trees.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: "transform" }}
      />
      <img
        ref={heroTextRef}
        src="/hero-text.png"
        alt="Hero Text"
        className="absolute top-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] sm:w-[70%] md:w-2/3 lg:w-[40%] xl:w-[35%] max-w-[450px]"
        style={{ willChange: "transform", opacity: 0, visibility: "hidden" }}
      />
      <img
        ref={leftTreesRef}
        src="/trees-left.png"
        alt="Trees left"
        style={{
          height: "100%",
          width: "auto",
          maxWidth: "none",
          willChange: "transform",
        }}
        className="absolute top-0 left-0 ml-[-700px] sm:ml-[-700px] md:ml-[-650px] lg:ml-[-600px] xl:ml-[-500px] 2xl:ml-[-350px] 3xl:ml-[-350px]"
      />
      <img
        ref={rightTreesRef}
        src="/trees-right.png"
        alt="Trees right"
        style={{
          height: "100%",
          width: "auto",
          maxWidth: "none",
          willChange: "transform",
        }}
        className="absolute top-0 right-0 mr-[-700px] sm:mr-[-700px] md:mr-[-650px] lg:mr-[-600px] xl:mr-[-500px] 2xl:mr-[-350px] 3xl:mr-[-350px]"
      />
      <img
        ref={kidsRef}
        src="/strange-kids.png"
        alt="Kids"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-120 min-w-[1200px]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={blackRef}
        className="absolute inset-0 bg-black -translate-y-full"
      />
      <img
        ref={abRef}
        src="/ab_transparent.png"
        alt="Abhyuday"
        className="absolute inset-0 w-full h-full object-contain -translate-y-full"
      />
    </div>
  );
};
