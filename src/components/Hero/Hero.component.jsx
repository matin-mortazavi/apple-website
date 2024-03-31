import { useGSAP } from "@gsap/react";
import React, { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { heroVideo, smallHeroVideo } from "../../utils";

const Hero = () => {
  useGSAP(() => {
    gsap.to("#hero-title", {
      opacity: 1,
      delay: 1,
      duration: 0.7,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      duration: 0.7,
      delay: 1,
    });
  }, []);
  const [videoSrc, setViedoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handleVideoSrc = () => {
    if (window.innerWidth < 760 && videoSrc !== smallHeroVideo)
      setViedoSrc(smallHeroVideo);
    else if (window.innerWidth > 760 && videoSrc !== heroVideo)
      setViedoSrc(heroVideo);
    console.log(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleVideoSrc);

    return () => window.removeEventListener("resize", handleVideoSrc);
  }, []);
  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero-title" className="hero-title">
          Iphone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            className="pointer-events-none"
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div
            id="cta"
            className="flex flex-col items-center opacity-0 translate-y-20"
          >
            <a href="#highlights" className="btn">
              Buy
            </a>
            <p className="front-normal text-xl">from $199/month or $999</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
