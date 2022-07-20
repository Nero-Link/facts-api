import React, { Fragment, useState } from "react";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/autoplay";
import "./App.css";

SwiperCore.use([Autoplay]);

function App() {
  const apiKey = "3iLLzYQSIqDPLAugE4VNkQ==yjVVpZ2Z6sN5omTp";
  const [facts, setFacts] = useState(0);

  function apiCall() {
    const limit = 30;
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/facts?limit=" + limit,
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
      success: function (result) {
        setFacts(result);
        console.log(facts);
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }

  return (
    <div className="App">
      <div className="facts-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          speed={750}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <p>1</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>2</p>
          </SwiperSlide>
          <SwiperSlide>
            <p>3</p>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* <button onClick={apiCall()}>New fact</button> */}
    </div>
  );
}

export default App;
