import { useState, useEffect, RefObject } from "react";

export const useInView = (
  ref: RefObject<HTMLElement>,
  threshold: number = 0.1
) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [ref, threshold]);

  return isInView;
};
