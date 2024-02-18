"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles.css";

function Rules() {
  const slides = [
    {
      imgUrl: "/sliderRulesPics/the-official-rules-of-padel.jpg",
      text: "If you are already playing tennis and enjoy it, chances are that padel will also appeal to you. The foundation of the game is based on good positioning and strategy, using speed and accuracy to place the ball where it will put your opponent under pressure.",
    },
    {
      imgUrl: "/sliderRulesPics/Screenshot 2023-07-27 111530.png",
      text: "The court is enclosed and is surrounded by walls of glass and metallic mash. The dark grey areas in below image indicates what on the court that is glass. The ball can bounce off any wall but can only hit the turf once before being returned.",
    },
    {
      imgUrl: "/sliderRulesPics/adidas-padel-racket-v70-1024x683.jpg",
      text: "Generally, padel rackets are made of carbon fiber or fiberglass. More advanced players normally prefer rackets with carbon fiber whereas beginner players would be more suited to start with bats made out of fiberglass. Padel rackets are available in different shapes: Round, Drop-shaped and Diamond-shaped",
    },
    {
      imgUrl: "sliderRulesPics/SPORTBÄLLE-ALE.jpg",
      text: "One of the most common misconceptions is that a padel ball is the same as a tennis ball. It is not! A padel ball is slightly smaller and has less pressure which alters how high the ball with bounce.",
    },
    {
      imgUrl: "sliderRulesPics/paddle-4.jpg",
      text: 'All the rules and details of what you are allowed and not allowed to do and how you score can be found here <a href="https://padelmania.ro/wp-content/uploads/2017/03/Official-Padel-Rules.pdf" target="_blank">Official Padel Rules</a>.',
    },
    {
      imgUrl: "sliderRulesPics/Leagues.png",
      text: `What now? Just join one of the many leagues you can find here or connect with an already existing team here:<a href=${process.env.SERVER}/leagues target="_blank"> Leagues </a>`,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100 pt-10 flex justify-center h-screen w-full">
      <div className="bg-white w-full md:w-3/4 p-10">
        <h1 className="text-2xl text-primary-focus font-bold mb-10 text-center">
          Everything you need to know:
        </h1>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="h-96 md:h-80 lg:h-96">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={slide.imgUrl}
                  alt={`Slide ${index + 1}`}
                  className="h-full object-contain rounded-lg mb-10"
                />
              </div>
              <p
                className="text-center mt-2 text-neutral"
                dangerouslySetInnerHTML={{ __html: slide.text }}
              ></p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Rules;
