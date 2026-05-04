import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 50 });
  const isHovering = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const onEnter = () => {
      isHovering.current = true;
      ringRef.current?.classList.add("cursor-hover");
    };
    const onLeave = () => {
      isHovering.current = false;
      ringRef.current?.classList.remove("cursor-hover");
    };
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [role=button]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY]);

  // Only show on non-touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/60 pointer-events-none z-[9999] transition-[width,height,border-color] duration-200 cursor-ring"
      />
      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-primary pointer-events-none z-[9999]"
      />
    </>
  );
};
