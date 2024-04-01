import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/utils";

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const progressBarRef = useRef([]);
  const progressBarWrapperRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, isLastVideo, videoId, isPlaying, startPlay } = video;

  const controlBtnSrc = useMemo(
    () => (isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg),
    [video]
  );

  const proccessMethoes = {
    videoEnd: (i) =>
      setVideo((prev) => ({ ...prev, videoId: i + 1, isEnd: true })),

    videoLast: () => setVideo((prev) => ({ ...prev, isLastVideo: true })),

    videoReset: () =>
      setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 })),

    playAndPause: () =>
      setVideo((prev) => ({ ...prev, isPlaying: !prev.isPlaying })),
  };
  const handleProccess = (type, i = 1) => proccessMethoes[type](i);

  const loadedMetaDataHandler = (e) => setLoadedData((prev) => [...prev, e]);

  const onVideoPlay = () => setVideo((prev) => ({ ...prev, isPlaying: true }));

  const onVideoEnd = (i) => () =>
    i !== hightlightsSlides.length - 1
      ? handleProccess("videoEnd", i)
      : handleProccess("videoLast", hightlightsSlides.length - 1);

  const onControlBtnClick = () =>
    isLastVideo ? handleProccess("videoReset") : handleProccess("playAndPause");

  const changeSlideHandler = (i) => () => {
    videoRef.current[videoId].pause();

    gsap.to(progressBarRef.current[videoId], {
      backgroundColor: "#afafaf",
      width: 0,
    });
    gsap.to(progressBarWrapperRef.current[videoId], {
      width: 12,
    });

    setVideo((prev) => ({ ...prev, videoId: i }));
  };

  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: `power2.inOut`,
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },

      onComplete: () =>
        setVideo((prev) => ({ ...prev, isPlaying: true, startPlay: true })),
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length === hightlightsSlides.length) {
      if (!isPlaying) videoRef.current[videoId].pause();
      else startPlay && videoRef.current[videoId].play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const progressBar = progressBarRef.current;

    if (progressBar[videoId]) {
      let animation = gsap.to(progressBar[videoId], {
        onUpdate: () => {
          if (!videoRef.current[videoId].paused) {
            const progress = Math.ceil(animation.progress() * 100);

            if (progress !== currentProgress) {
              currentProgress = progress;

              gsap.to(progressBarWrapperRef.current[videoId], {
                width:
                  window.innerWidth < 760
                    ? "10vw"
                    : window.innerWidth < 1200
                    ? "10vw"
                    : "4vw",
              });

              gsap.to(progressBar[videoId], {
                width: `${currentProgress}%`,
                backgroundColor: "white",
              });
            }
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(progressBarWrapperRef.current[videoId], {
              width: 12,
            });

            gsap.to(progressBar[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      const animationUpdate = () => {
        animation.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) gsap.ticker.add(animationUpdate);
      else gsap.ticker.remove(animationUpdate);
    }
  }, [videoId, startPlay]);

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, i) => (
          <div id="slider" className="sm:pr-20 pr-10" key={i}>
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center  rounded-3xl overflow-hidden bg-black">
                <video
                  className={"pointer-events-none"}
                  ref={(el) => (videoRef.current[i] = el)}
                  onLoadedMetadata={loadedMetaDataHandler}
                  onPlay={onVideoPlay}
                  id="video"
                  onEnded={onVideoEnd(i)}
                  playsInline={true}
                  preload={true}
                  muted
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, i) => (
                  <p className="md:text-2xl text-xl font-medium" key={i}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <div
              ref={(el) => (progressBarWrapperRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full cursor-pointer relative"
              key={i}
              onClick={changeSlideHandler(i)}
            >
              <span
                ref={(el) => (progressBarRef.current[i] = el)}
                className="absolute h-full w-full rounded-full"
              ></span>
            </div>
          ))}
        </div>
        <button onClick={onControlBtnClick} className="control-btn">
          <img src={controlBtnSrc} alt="control image" />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
