import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Logo from "./assets/svg/logo.svg";

import moment from "moment";

function App() {
  let city = null;
  if (window.localStorage.getItem("city")) {
    city = window.localStorage.getItem("city");
  }

  const [data, setData] = useState(null);
  const [location, setLocation] = useState(city);
  const [initialRender, setInitial] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem("city")) {
      searchLoaction();
    }
  }, [initialRender]);

  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

  const searchLoaction = () => {
    if (location || location !== "") {
      setLocation("");
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);

        window.localStorage.setItem("city", location);
      });
    }
  };

  const converToEnglish = (item) => {
    item = item
      .replace("Ğ", "g")
      .replace("Ü", "u")
      .replace("Ş", "s")
      .replace("I", "i")
      .replace("İ", "i")
      .replace("Ö", "o")
      .replace("Ç", "c")
      .replace("ğ", "g")
      .replace("ü", "u")
      .replace("ş", "s")
      .replace("ı", "i")
      .replace("ö", "o")
      .replace("ç", "c");

    setLocation(item);
  };

  return (
    <div className="app">
      <div className="watsher">
        <div className="header">
          {data ? (
            <h1 className="cityName">{data.name}</h1>
          ) : (
            <img className="logo fadeIn" src={Logo} alt="" />
          )}
        </div>

        <div className="display-weather">
         <div className="left">
         {data ? (
                <h2>
                  {" "}
                  Now : {" "}
                  <strong>
                    {(data.main.temp - 273.15).toFixed()}
                  </strong> °C{" "}
                </h2>
              ) : null}
         </div>
          <div className="right">
            <div className="info">
              {data ? (
                <p>
                  {" "}
                  Sunrise{" "}
                  <strong>
                    {moment().startOf("day").fromNow(data.sys.sunrise)}
                  </strong>{" "}
                  later.
                </p>
              ) : null}
              {data ? (
                <p>
                  {" "}
                  Sunset{" "}
                  <strong>
                    {moment().endOf("day").fromNow(data.sys.sunset)}
                  </strong>{" "}
                  later.
                </p>
              ) : null}

              {data ? (
                <p>
                  {" "}
                  Today Max Temp :{" "}
                  <strong>
                    {(data.main.temp_max - 273.15).toFixed()}
                  </strong> °C{" "}
                </p>
              ) : null}
              {data ? (
                <p>
                  {" "}
                  Today Min Temp :{" "}
                  <strong>
                    {(data.main.temp_min - 273.15).toFixed()}
                  </strong> °C{" "}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="menu">
        <input
          required
          type="text"
          placeholder="Search for a city"
          value={location}
          onChange={(event) => converToEnglish(event.target.value)}
        />
        <button onClick={searchLoaction}>Search</button>
      </div>
    </div>
  );
}

export default App;
