import { banners } from '@/constant/banners';
import { useRef, useState, useEffect } from 'react';

const BannerSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto Play Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (!isDragging) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;

          if (scrollLeft + offsetWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollTo({
              left: scrollLeft + 350,
              behavior: 'smooth',
            });
          }
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="mt-12 select-none">
      <h2 className="text-lg font-semibold text-secondary mb-4">Temukan promo menarik</h2>
      <div className="relative group">
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          className={`flex overflow-x-auto gap-4 scrollbar-hide pb-4 -mx-1 px-1 transition-all ${
            isDragging ? 'cursor-grabbing scale-[0.995]' : 'cursor-grab snap-x snap-mandatory'
          }`}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="flex-none w-[280px] sm:w-[320px] md:w-[350px] aspect-16/7 md:aspect-3/1 rounded-xl overflow-hidden snap-start hover:shadow-lg transition-transform duration-300 pointer-events-none"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
