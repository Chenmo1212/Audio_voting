import "./PlayerList.css";
import React, {useRef, useEffect, useState} from "react";
import Player from "./Player/Player"
import userInfo from "../../resources/data/userInfo"

import {Swiper, SwiperSlide} from 'swiper/react';
import {A11y} from 'swiper/modules';
import 'swiper/css';
import {useNavigate, useParams} from "react-router-dom";
import back from "../../resources/imgs/back-arrow-white.svg";

const Background = () => {
  return (
    <div className="lists-bg absolute top-0 left-0"></div>
  )
}

const PlayerList = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  // Get route parameters
  const routerParams = useParams();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  let currId = userInfo.findIndex((item) => item.id === routerParams.id);

  const toPrev = () => {
    swiperRef.current?.swiper.slidePrev(300);
    setActiveSlideIndex(activeSlideIndex - 1 >= 0 ? activeSlideIndex - 1 : userInfo.length - 1);
  }

  const toNext = () => {
    swiperRef.current?.swiper.slideNext(300);
    setActiveSlideIndex(activeSlideIndex + 1 < userInfo.length ? activeSlideIndex + 1 : 0);
  }

  const handleSlideClick = (index) => {
    let res = index - activeSlideIndex
    if (res === 1 || res === 1 - userInfo.length) {
      toNext()
    } else if (res === -1 || res === userInfo.length - 1) {
      toPrev()
    }
  };

  useEffect(() => {
    setActiveSlideIndex(currId);
  }, [currId])

  return (
    <div className="player-list">
      <Background/>

      <div className="back w-8 h-8 absolute top-4 left-4 cursor-pointer">
        <img src={back} alt="back" onClick={() => navigate('/Lists')}/>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[A11y]}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={40}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
        initialSlide={activeSlideIndex}
        className="h-full"
        breakpoints={{
          640: {
            slidesPerView: 3,
          }
        }}
      >
        {
          userInfo.map((item, index) => (
              <SwiperSlide key={index}>
                <div onClick={() => handleSlideClick(index)}>
                  <Player user={userInfo[index]} toNext={toNext} toPrev={toPrev}/>
                </div>
              </SwiperSlide>
            )
          )}
      </Swiper>

    </div>
  );
};

export default PlayerList;