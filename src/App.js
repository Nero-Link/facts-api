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
  const [facts, setFacts] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  function apiCall() {
    const limit = 30;
    if (!fetched) {
      $.ajax({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/facts?limit=" + limit,
        headers: { "X-Api-Key": apiKey },
        contentType: "application/json",
        success: function (result) {
          setFacts(result);
          setFetched(true);
          console.log(facts.forEach((fact) => console.log(fact.fact)));
        },
        error: function ajaxError(jqXHR) {
          console.error("Error: ", jqXHR.responseText);
        },
      });
    }
  }

  return (
    <div className="App">
      <div className="banner">
        <h2 className="title">Random Fact of the Hour</h2>
      </div>
      <div className="facts-container">
        <Swiper
          slidesPerView={1}
          loop={true}
          speed={750}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
        >
          {apiCall()}
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
