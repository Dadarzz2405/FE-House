import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/LogoSchool/Full_COLOR.png";

const NavbarContainer = ({ activatedPage }) => {
  const [open, setOpen] = useState(false);

  const linkClass = (path) =>
    `px-2 py-1 text-sm transition-all duration-150 ${
      activatedPage === path
        ? "text-white [text-shadow:0_0_8px_var(--color-highlight),0_0_2px_var(--color-highlight),0_0_1px_white]"
        : "text-white/60 hover:text-white hover:text-white"
    }`;

  return (
    <nav className="fixed backdrop-blur-md bg-dark border-b border-white/10 h-[60px] flex items-center justify-between px-6 z-[9999] right-0 left-0">
      {/* Brand */}
      <a
        href="https://gda.sch.id"
        className="flex items-center gap-6 text-white font-bold"
      >
        <img
          src="https://gda.sch.id/wp-content/uploads/2025/01/percobaan-2-scaled.png"
          alt="Logo"
          className="h-9 w-auto opacity-90"
        />
      </a>

      <a
        href="https://gda.sch.id"
        className="absolute left-1/2 -translate-x-1/2 text-white font-bold"
      >
        <span className="heading-text tracking-wide [text-shadow:0_0_2px_white,0_0_6px_white]">
          Darsa Houses
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex gap-5 items-center">
        <Link to="/" className={linkClass("/")}>
          Home
        </Link>
        <Link to="/livescores" className={linkClass("/livescores")}>
          Live Scores
        </Link>
        <Link to="/announcement" className={linkClass("/announcement")}>
          Announcements
        </Link>
        <Link to="/login" className={linkClass("/login")}>
          Login
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-white/70 hover:text-white text-xl transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-[50px] left-0 w-full bg-[#0f0f0f] border-b border-white/10 flex flex-col gap-1 p-4 md:hidden z-50">
          <Link
            to="/"
            className={linkClass("/")}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/livescores"
            className={linkClass("/livescores")}
            onClick={() => setOpen(false)}
          >
            Live Scores
          </Link>
          <Link
            to="/announcement"
            className={linkClass("/announcement")}
            onClick={() => setOpen(false)}
          >
            Announcements
          </Link>
          <Link
            to="/login"
            className={linkClass("/login")}
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarContainer;
