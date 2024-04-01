import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "@/utils";
import { VideoCarousel } from "@/components";
import { ScrollTrigger } from "gsap/all";

const Highlights = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to("#highlight-title", {
      opacity: 1,
      duration: 1,
      y: 0,
      scrollTrigger: "#highlight-title",
    });
    gsap.to(".link", {
      scrollTrigger: "#highlight-title",

      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.25,
    });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="highlight-title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex gap-7">
            <div className="flex flex-wrap gap-5 items-center link">
              <p>watch the film</p>
              <img src={watchImg} alt="watch image" />
            </div>
            <div className="flex flex-wrap gap-5 items-center link">
              <p>watch the event</p>
              <img src={rightImg} alt="right image" />
            </div>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
