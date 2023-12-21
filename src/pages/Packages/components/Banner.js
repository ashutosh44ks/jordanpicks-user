import React from "react";

const Banner = () => {
  return (
    <div
      style={{
        background: `url("./assets/banner.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="banner relative"
    >
      <h2 className="text-white text-center mb-2">
        ELEVATES YOUR BETTING GAME WITH OUR EXCLUSIVE PACKAGES
      </h2>
      <h5 className="text-white text-center">
        Unlock the Power of Premium Sports Betting. Discover the edge you’ve
        been seeking with our carefully curated packages, providing unmatched
        insights and strategies for success. Take your betting to the next
        level.
      </h5>
      <div
        style={{
          position: "absolute",
          left: "50%",
          //   right: "50%",
          top: "30rem",
          transform: "translate(-50%, -50%)",
        }}
      >
        <iframe
          width="600"
          height="415"
          src="https://www.youtube.com/embed/2tR6eN--ieU"
          title="Welcome video"
        ></iframe>
      </div>
    </div>
  );
};

export default Banner;
