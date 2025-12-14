import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Carousel = () => {
  return (
    <div className="px-4 max-w-7xl mx-auto text-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={30}
        slidesPerView={1}
        className="rounded-lg shadow-md max-w-3xl mx-auto"
      >
        <SwiperSlide>
          <div className="mb-6">
            <img
              src="/image/perpustakaan.png"
              alt="Perpustakaan"
              className="w-full object-cover rounded-lg"
            />
            <p className="mt-2 font-semibold">Perpustakaan</p>
            <p className="text-sm mb-2 text-gray-500">
              Tempat membaca yang nyaman
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="mb-6">
            <img
              src="/image/lorong.png"
              alt="Lorong Sekolah"
              className="w-full object-cover rounded-lg"
            />
            <p className="mt-2 font-semibold">Lorong Kelas</p>
            <p className="text-sm mb-2 text-gray-500">
              Lorong Kelas SMAN 1 Waru yang panjang dan juga nyaman
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="mb-6" >
            <img
              src="/image/laboratorium.png"
              alt="Laboratorium"
              className="w-full object-cover rounded-lg"
            />
            <p className="mt-2 font-semibold">Laboratorium</p>
            <p className="text-sm mb-2 text-gray-500">
              Fasilitas eksperimen lengkap
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
