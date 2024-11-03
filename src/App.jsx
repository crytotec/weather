import React, { useState, useEffect, useRef } from 'react';
import weather1 from './assets/image/weather1.jpg';
import searchIcon from './assets/image/search.png';
import icons from './assets/image/icons.png';
import logo from './assets/image/logo.png';
import icon from './assets/image/icon.png';

const App = () => {
  const inputRef = useRef();
  const [weather, setWeather] = useState(null);
  const [showWeather, setShowWeather] = useState(false); // State to control weather visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle hamburger

  const searchWeather = async (data) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=99383f77909e9825e06c07085930ef21`;
    if (data === '') {
      alert('Enter a city name');
      return;
    }
    try {
      const response = await fetch(url);
      const dat = await response.json();
      if (response.ok) {
        setWeather({
          humidity: dat.main.humidity,
          windspeed: dat.wind.speed,
          temperature: dat.main.temp,
          location: dat.name,
        });
        setShowWeather(true); // Show weather result when data is fetched
        setIsMenuOpen(true); // Automatically open the menu when data is fetched
      } else {
        alert(dat.message);
        setShowWeather(false);
      }
    } catch (error) {
      setWeather(null);
      setShowWeather(false);
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputRef.current) {
      searchWeather(inputRef.current.value);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="relative w-full max-w-[800px] min-w-[200px] min-h-[250px] md:h-[500px] rounded-lg overflow-hidden">
        {/* Background Image and Header */}
        <div
          className="absolute inset-0 h-[100%] bg-cover bg-center"
          style={{ backgroundImage: `url(${weather1})` }}
        >
          <div className="bg-black bg-opacity-50 h-full p-4 flex flex-col justify-between">
            {/* Logo and Title */}
            <div className="flex justify-between items-center">
              <img src={logo} className="w-12 md:w-20" alt="Logo" />
              <h1 className="text-white text-lg md:text-2xl font-bold">Forecast</h1>

              
            </div>

            {/* Input and Search Form */}
            <div className="mt-10 md:mt-20 text-center">
              <h1 className="text-white text-sm md:text-base font-bold">
                The Only Weather Forecast You Need
              </h1>
              <form className="flex justify-center mt-4" onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    ref={inputRef}
                    className="w-[90%] md:w-[350px] pl-10 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#465C62]"
                    placeholder="Type here..."
                    style={{
                      backgroundImage: `url(${searchIcon})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '95% center',
                      backgroundSize: '16px',
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Weather Details Section */}
        {showWeather && isMenuOpen && (
          <div className="absolute h-full inset-x-0 bottom-0 md:bottom-auto md:right-0 bg-[#465C62] bg-opacity-90 w-full md:w-[350px] p-6 md:rounded-lg shadow-lg">
           <div className='flex flex-row justify-between items-center'>
            <h1 className="text-[30px] md:text-[50px] -mb-8 md:mb-0 text-[#FFD570]">Today</h1>
            {/* Hamburger / Close Icon */}
            <button onClick={toggleMenu} className="text-white focus:outline-none">
                {isMenuOpen ? (
                  <span className="text-2xl font-bold">×</span> // Close icon
                ) : (
                  <span className="text-2xl font-bold">☰</span> // Hamburger icon
                )}
              </button>
              </div>
            <div className="flex flex-col md:flex-row justify-between items-center mt-0 md:mt-4">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-[#FFD570] font-bold">{weather.temperature}°C</p>
                <p className="text-white font-semibold">{weather.location}</p>
                <p className="text-white text-sm">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-white text-sm">
                  {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <h2 className="text-[25px] md:text-[40px] text-[#FFD570] md:mt-8 mt-1">Daily</h2>
            <div className="flex flex-row gap-2 justify-center items-center md:mt-4 mt-0 ">
              <div className="flex flex-col mb-4 items-center h-[60px] md:h-[100px] bg-[#FFD570] rounded-md md:p-4 p-1 shadow-md">
                <img src={icon} alt="Humidity Icon" className="w-8 " />
                <p className="text-[#465C62] font-bold">{weather.humidity}%</p>
                <p className="text-[#465C62] font-semibold">Humidity</p>
              </div>
              <div className="flex flex-col items-center h-[60px] md:h-[100px] mb-4 bg-[#FFD570] rounded-md md:p-4 p-1 shadow-md">
                <img src={icons} alt="Wind Speed Icon" className=" w-8" />
                <p className="text-[#465C62] font-bold">{weather.windspeed}Km/h</p>
                <p className="text-[#465C62] font-semibold whitespace-nowrap">Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
