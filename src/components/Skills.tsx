import React, { useRef, useEffect, useState } from "react";
import {
  Code,
  Database,
  Cloud,
  Wrench,
  Palette,
  Monitor,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../context/LanguageContext";

interface Skill {
  name: string;
  level: number;
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const categories: Category[] = [
  {
    id: "skills.cloud",
    label: "skills.cloud.title",
    icon: Cloud,
    color: "primary",
  },
  {
    id: "skills.automation",
    label: "skills.automation.title",
    icon: Wrench,
    color: "secondary",
  },
  {
    id: "skills.development",
    label: "skills.development.title",
    icon: Code,
    color: "accent",
  },
  {
    id: "skills.monitoring",
    label: "skills.monitoring.title",
    icon: Monitor,
    color: "purple",
  },
  {
    id: "skills.database",
    label: "skills.database.title",
    icon: Database,
    color: "pink",
  },
  {
    id: "skills.systems",
    label: "skills.systems.title",
    icon: Settings,
    color: "teal",
  },
  {
    id: "skills.security",
    label: "skills.security.title",
    icon: Shield,
    color: "secondary",
  },
  {
    id: "skills.management",
    label: "skills.management.title",
    icon: Wrench,
    color: "accent",
  },
];

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const slidesPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const [slidesToShow, setSlidesToShow] = useState(slidesPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(slidesPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(slidesPerView.tablet);
      } else {
        setSlidesToShow(slidesPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isInView && !animatedSkills) {
      setTimeout(() => setAnimatedSkills(true), 200);
    }
  }, [isInView, animatedSkills]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev >= categories.length - slidesToShow ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesToShow]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev >= categories.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) =>
      prev <= 0 ? categories.length - slidesToShow : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<
      string,
      { bg: string; text: string; bar: string; glow: string }
    > = {
      primary: {
        bg: "bg-blue-100/30 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        bar: "bg-gradient-to-r from-blue-400 to-blue-600",
        glow: "shadow-blue-500/20",
      },
      secondary: {
        bg: "bg-green-100/30 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        bar: "bg-gradient-to-r from-green-400 to-green-600",
        glow: "shadow-green-500/20",
      },
      accent: {
        bg: "bg-yellow-100/30 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
        bar: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        glow: "shadow-yellow-500/20",
      },
      purple: {
        bg: "bg-purple-100/30 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        bar: "bg-gradient-to-r from-purple-400 to-purple-600",
        glow: "shadow-purple-500/20",
      },
      pink: {
        bg: "bg-pink-100/30 dark:bg-pink-900/30",
        text: "text-pink-600 dark:text-pink-400",
        bar: "bg-gradient-to-r from-pink-400 to-pink-600",
        glow: "shadow-pink-500/20",
      },
      teal: {
        bg: "bg-teal-100/30 dark:bg-teal-900/30",
        text: "text-teal-600 dark:text-teal-400",
        bar: "bg-gradient-to-r from-teal-400 to-teal-600",
        glow: "shadow-teal-500/20",
      },
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <>
      {/* Agregar estilos CSS globalmente */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .skills-grid-pattern {
            background-image: radial-gradient(circle, rgba(229, 231, 235, 0.5) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .dark .skills-grid-pattern {
            background-image: radial-gradient(circle, rgba(75, 85, 99, 0.3) 1px, transparent 1px);
          }
          
          @keyframes skillsShimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          .skills-shimmer {
            position: relative;
            overflow: hidden;
          }
          
          .skills-shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: skillsShimmer 2s infinite;
            z-index: 1;
          }
          
          .progress-bar {
            position: relative;
            overflow: hidden;
          }
          
          @media (max-width: 768px) {
            .container-custom {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }
        `,
        }}
      />

      <section
        id="skills"
        ref={ref}
        className="section-padding bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 skills-grid-pattern opacity-30 dark:opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

        <div className="container-custom relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isInView ? "animate-fade-in-up" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                {t("skills.title")}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t("skills.subtitle")}
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative">
              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </button>

              {/* Carousel */}
              <div className="overflow-hidden rounded-2xl">
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateX(-${
                      currentSlide * (100 / slidesToShow)
                    }%)`,
                  }}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {categories.map((category, index) => {
                    const colors = getColorClasses(category.color);
                    const skills: Skill[] = t(category.id) as
                      | Skill[]
                      | string[];

                    return (
                      <div
                        key={category.id}
                        className="flex-none"
                        style={{ width: `${100 / slidesToShow}%` }}
                      >
                        <div className="p-4">
                          <div className="relative group h-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 overflow-hidden">
                            {/* Shimmer effect on hover */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                            <div className="relative z-10">
                              {/* Header */}
                              <div className="flex items-center mb-8">
                                <div
                                  className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} ${colors.text} rounded-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}
                                >
                                  <category.icon size={28} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  {t(category.label)}
                                </h3>
                              </div>

                              {/* Skills */}
                              <div className="space-y-6">
                                {skills.map((skill: any, skillIndex) => (
                                  <div key={skill.name || skill}>
                                    <div className="flex justify-between items-center mb-3">
                                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {skill.name || skill}
                                      </span>
                                      <span className="text-sm font-semibold text-gray-900 dark:text-white bg-gray-100/70 dark:bg-gray-700/70 px-2 py-1 rounded-lg backdrop-blur-sm">
                                        {skill.level || 90}%
                                      </span>
                                    </div>

                                    {/* Progress Bar Container */}
                                    <div className="relative w-full bg-gray-200/70 dark:bg-gray-700/70 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                                      {/* Progress Bar */}
                                      <div
                                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${colors.bar} shadow-lg skills-shimmer`}
                                        style={{
                                          width: animatedSkills
                                            ? `${skill.level || 90}%`
                                            : "0%",
                                          transitionDelay: `${
                                            skillIndex * 0.1 + index * 0.2
                                          }s`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Indicators */}
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from(
                  { length: Math.ceil(categories.length - slidesToShow + 1) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
