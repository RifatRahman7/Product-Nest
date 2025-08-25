// app/Components/heroSlider.jsx
'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Typewriter } from "react-simple-typewriter";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const slides = [
  {
    title: "Discover Amazing Products",
    description: "Explore our curated selection of top-quality items for every need.",
    image: "https://images.remotehub.com/d42c62669a7711eb91397e038280fee0/original_thumb/ec1eb042.jpg?version=1618112516"
  },
  {
    title: "Modern Design, Timeless Quality",
    description: "Experience the perfect blend of style and durability in every product.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/011/640/737/small_2x/shopping-day-sale-banner-template-design-for-web-or-social-media-vector.jpg"
  },
  {
    title: "Shop with Confidence",
    description: "Enjoy secure shopping, fast delivery, and excellent customer support.",
    image: "https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg"
  }
];

const HeroSlider = () => {
  return (
    <div>
      <Swiper
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet custom-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active"
        }}
        modules={[Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-[70vh] md:h-[80vh] rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Blurred Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  filter: "blur(4px) brightness(0.7)",
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
              {/* Banner Content */}
              <div className="relative z-20 max-w-3xl mx-auto px-8 py-10 rounded-2xl bg-white/30 backdrop-blur-md shadow-2xl border border-white/30 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg tracking-tight">
                  <Typewriter
                    words={[slide.title]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={80}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow">
                  <Typewriter
                    words={[slide.description]}
                    loop={0}
                    cursor
                    cursorStyle=""
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={2000}
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Swiper Pagination Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 14px;
          height: 14px;
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          margin: 0 6px !important;
          opacity: 1;
          border: 2px solid #fff;
          transition: background 0.3s, border 0.3s;
        }
        .custom-bullet-active {
          background: linear-gradient(90deg, #22c55e 0%, #2563eb 100%);
          border: 2px solid #fff;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
        }
        .swiper-pagination {
          bottom: 32px !important;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;