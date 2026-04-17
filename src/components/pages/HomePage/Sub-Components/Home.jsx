import React, { useRef, useEffect, useState, use } from "react";
import axios from "axios";

function hexToRgb(hex) {
  const bigint = parseInt(hex.replace("#", ""), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function getLuminance({ r, g, b }) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getAdaptiveOpacity(hex) {
  const rgb = hexToRgb(hex);
  const luminance = getLuminance(rgb);

  // normalize (0–255 → 0–1)
  const normalized = luminance / 255;

  // invert: bright → lower opacity
  return 1 - normalized * 0.8;
}

function Home() {
  const logoRefs = useRef([]);
  const lightRefs = useRef([]);

  const [housesLogo, setHousesLogo] = useState({});
  const [logoNames, setLogoNames] = useState([]);
  const [housesLights, setHousesLights] = useState({});

  useEffect(() => {
    // Simulate fetching logos from an API
    const housesData = [];
    const fetchLogos = () => {
      axios.get("http://127.0.0.1:5000/api/houses").then((response) => {
        // Assuming the response contains the logos in the expected format
        for (let house in response.data) {
          if (response.data[house].logo_url) {
            setHousesLogo((prev) => ({
              ...prev,
              [response.data[house].name]: response.data[house].logo_url,
            }));
            housesData.push(response.data[house].name);
          }
        }
        if (housesData.length === response.data.length) {
          setLogoNames((prev) => housesData.sort(() => Math.random() - 0.5));
        }
      });
    };
    fetchLogos();
  }, []);

  useEffect(() => {
    const housesColors = {
      "Al-Adiyat": "#9a3b2a",
      "Al-Ghuraab": "#526b84",
      "Al-Hudhud": "#ffc400",
      "An-Nahl": "#e8a217",
      "An-Naml": "#556B2F",
      "An-Nun": "#005B7F",
    };

    for (let house in housesColors) {
      const opacity = getAdaptiveOpacity(housesColors[house]);
      setHousesLights((prev) => ({
        ...prev,
        [house]: `rgba(${hexToRgb(housesColors[house]).r}, ${hexToRgb(housesColors[house]).g}, ${hexToRgb(housesColors[house]).b}, ${opacity})`,
      }));
    }
  }, []);

  useEffect(() => {
    if (logoNames.length === 0) return;

    let currentIndex = 1;
    let lastIndex = 0;

    logoRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.classList.toggle("animate-logo-appear", index === 0);
      }
    });

    lightRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.opacity = index === 0 ? "1" : "0";
      }
    });

    const interval = setInterval(() => {
      logoRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.classList.toggle("animate-logo-appear", index === currentIndex);
          ref.classList.toggle("animate-logo-disappear", index === lastIndex);
        }
      });
      lightRefs.current.forEach((ref, index) => {
        if (ref) {
          ref.style.opacity = index === currentIndex ? "1" : "0";
        }
      });
      lastIndex = currentIndex;
      currentIndex = (currentIndex + 1) % logoNames.length;
    }, 5000);

    return () => clearInterval(interval);
  }, [logoNames]);

  console.log("Houses Lights:", housesLights);

  return (
    <div className="h-screen w-[100%] h-[100vh] flex justify-center items-center bg-[linear-gradient(to_bottom_left,#0a0f2c,var(--color-dark))] overflow-hidden relative">
      {logoNames.map((logo, index) => (
        <div
          className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] transition-all duration-1000 pointer-events-none"
          key={index}
          ref={(el) => (lightRefs.current[index] = el)}
          style={{
            background: `radial-gradient(circle at bottom left, ${housesLights[logo]} 0%, transparent 70%)`,
            opacity: 0,
          }}
        />
      ))}

      <div className="h-[60vh] flex justify-center items-center container mx-auto px-4">
        {/* House logos grid */}
        <div className="w-[300px] h-[300px] flex justify-center items-center relative mr-24 flex-shrink-0">
          {logoNames.map((logo, index) => (
            <img
              key={index}
              ref={(el) => (logoRefs.current[index] = el)}
              src={housesLogo[logo]}
              alt="Darsa Houses"
              className="max-h-full w-auto absolute opacity-0"
            />
          ))}
        </div>

        {/* Text content */}
        <div className="h-[300px] flex flex-col justify-center items-start fw-5">
          <h1 className="elegant-text text-6xl text-white leading-[3rem] m-0 mb-5">
            Darsa Houses
            <br />
            <span
              className="heading-text text-4xl"
              style={{
                textShadow: "0 0 20px var(--color-highlight)",
              }}
            >
              Dashboard
            </span>
          </h1>

          <p className="body-text text-white/90 mb-6">
            Monitor scores, announcements, houses events here!
          </p>

          <div className="flex gap-2.5">
            <a href="/livescores">
              <button className="btn-darsa-solid-blue">Current Podium</button>
            </a>
            <a href="/">
              <button className="btn-darsa-blank-yellow">
                Houses Details {">>"}
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
