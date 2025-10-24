import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Welcome = ({ theme }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <h1
      data-aos="zoom-in-down"
      className="welcome font-bold text-center text-white flex justify-center items-center"
    >
      Welcome to WordWizard!
    </h1>

  );
};

export default Welcome;
