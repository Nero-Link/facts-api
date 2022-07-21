import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/autoplay";
import "./App.css";

SwiperCore.use([Autoplay]);

function App() {
  const apiKey = "3iLLzYQSIqDPLAugE4VNkQ==yjVVpZ2Z6sN5omTp";
  const tick = 3600000;
  const [facts, setFacts] = useState([]);
  let [refresh, setRefresh] = useState(0);
  let [timer, setTimer] = useState(0);

  useEffect(() => {
    apiCall();
  }, [refresh]);

  function apiCall() {
    const limit = 6;
    $.ajax({
      method: "GET",
      url: "https://api.api-ninjas.com/v1/facts?limit=" + limit,
      headers: { "X-Api-Key": apiKey },
      contentType: "application/json",
      success: function (result) {
        setFacts(result);
        console.log("API Call Successful");
      },
      error: function ajaxError(jqXHR) {
        console.error("Error: ", jqXHR.responseText);
      },
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, tick);
    return () => clearInterval(interval);
  }, []);

  if (timer > 0) {
    setRefresh(refresh + 1);
    setTimer(0);
  }

  return (
    <div className="App">
      <div className="banner">
        <h2 className="title">Random Facts of the Hour</h2>
      </div>
      <div className="facts-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          speed={750}
          autoplay={{
            delay: 600000,
            disableOnInteraction: false,
          }}
        >
          {facts.length > 0 &&
            facts.map((fact) => {
              return (
                <SwiperSlide>
                  <p>{fact.fact}</p>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
