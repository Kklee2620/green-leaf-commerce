
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: string;
  imageUrl: string;
  linkUrl: string;
  title?: string;
  description?: string;
}

interface HeroCarouselProps {
  slides: Slide[];
  autoplaySpeed?: number;
}

export default function HeroCarousel({ 
  slides, 
  autoplaySpeed = 5000 
}: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Autoplay functionality
  useEffect(() => {
    if (!isPaused && slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, autoplaySpeed);
      
      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, slides.length, autoplaySpeed]);
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  
  if (slides.length === 0) {
    return null;
  }
  
  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className="w-full flex-shrink-0 relative"
          >
            <Link to={slide.linkUrl}>
              <img 
                src={slide.imageUrl} 
                alt={slide.title || `Slide ${index + 1}`}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Content Overlay */}
              {(slide.title || slide.description) && (
                <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 max-w-md">
                  <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
                    {slide.title && (
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{slide.title}</h2>
                    )}
                    {slide.description && (
                      <p className="text-gray-700 mb-4">{slide.description}</p>
                    )}
                    <button className="btn-primary">
                      Xem ngay
                    </button>
                  </div>
                </div>
              )}
            </Link>
          </div>
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-100"
            onClick={goToPrevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 text-gray-800 hover:bg-opacity-100"
            onClick={goToNextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
      
      {/* Indicator Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-primary' : 'bg-white bg-opacity-60'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
