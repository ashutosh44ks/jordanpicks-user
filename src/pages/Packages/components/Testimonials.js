import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="my-20">
      <div className="mb-6">
        <h2 className="font-medium text-center mb-2">
          Don’t just take <span className="text-yellow">Our Words</span>
        </h2>
        <p className="text-center text-lightgrey2">
          See the proof in every play. Our results speak volumes, so join us and
          let the wins do the talking!
        </p>
      </div>
      <div className="flex gap-8 lg:flex-row flex-col">
        <div className="flex items-center gap-6">
          <img
            src="/assets/testimonial1.png"
            alt="testimonial1"
            className="h-48"
          />
          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="mt-6 mb-2">
              "We love Landingfolio! Our designers were using it for their
              projects, so we already knew what kind of design they want."
            </p>
            <div className="font-medium">Marcus Rhiel Madsen</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <img
            src="/assets/testimonial2.png"
            alt="testimonial1"
            className="h-48"
          />
          <div>
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="mt-6 mb-2">
              "We love Landingfolio! Our designers were using it for their
              projects, so we already knew what kind of design they want."
            </p>
            <div className="font-medium">Corey Stanton</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
