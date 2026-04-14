import { useEffect, useRef, useState } from "react";

import AlAdiyat from "../../../Assets/Houses/Al-Adiyat.png";
import AlGhuraab from "../../../Assets/Houses/Al-Ghuraab.png";
import AlHudHud from "../../../Assets/Houses/Al-HudHud.png";
import AnNaml from "../../../Assets/Houses/An-Naml.png";
import AnNahl from "../../../Assets/Houses/An-Nahl.png";
import AnNun from "../../../Assets/Houses/An-Nun.png";

function HomePage() {
  const logoRefs = useRef([]);
  const lightRefs = useRef([]);

  const housesLogo = {
    AlAdiyat: AlAdiyat,
    AlGhuraab: AlGhuraab,
    AlHudHud: AlHudHud,
    AnNahl: AnNahl,
    AnNaml: AnNaml,
    AnNun: AnNun,
  };

  const housesColors = {
    AlAdiyat: "#4d1a1a",
    AlGhuraab: "#2c3e4a",
    AlHudHud: "#b0692d",
    AnNahl: "#3a5a40",
    AnNaml: "#585a49",
    AnNun: "#2c2f7c",
  };

  const [logoNames, setLogoNames] = useState([]);

  useEffect(() => {
    const logos = [
      "AlAdiyat",
      "AlGhuraab",
      "AlHudHud",
      "AnNahl",
      "AnNaml",
      "AnNun",
    ];
    const shuffled = [...logos].sort(() => Math.random() - 0.5);
    setLogoNames(shuffled);
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
        ref.style.opacity = index === 0 ? "0.4" : "0";
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
          ref.style.opacity = index === currentIndex ? "0.4" : "0";
        }
      });
      lastIndex = currentIndex;
      currentIndex = (currentIndex + 1) % logoNames.length;
    }, 5000);

    return () => clearInterval(interval);
  }, [logoNames]);

  return (
    <div className="home-page w0-[100%] h-[100vh] overflow-hidden">
      {/* Hero / Welcome section */}
      <div className="h-screen w-[100%] flex justify-center items-center bg-[linear-gradient(to_bottom_right,var(--color-dark),#0a0f2c,var(--color-dark))]">
        {logoNames.map((logo, index) => (
          <div
            className="absolute bottom-[0] left-[0] w-[700px] h-[700px] transition-all duration-1000 pointer-events-none"
            key={index}
            ref={(el) => (lightRefs.current[index] = el)}
            style={{
              background: `radial-gradient(circle at bottom left, ${housesColors[logo]} 0%, transparent 70%)`,
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
    </div>
  );
}

export default HomePage;
