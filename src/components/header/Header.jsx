import "./header.scss";
import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logoHeader from "../../assets/images/Netflix_logo.svg";

const headerNav = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Movies",
    path: "/movie",
  },
  {
    display: "TV Series",
    path: "/tv",
  },
];
export default function Header() {
  const headerRef = useRef(null);
  const { pathname } = useLocation();
  const indexLinks = headerNav.findIndex((x) => x.path === pathname);
  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);
  return (
    <header ref={headerRef} className="header">
      <div className="header__wrap">
        <div className="header__logo">
          <Link
            to={{
              pathname: "/",
            }}
          >
            <img src={logoHeader} alt="logo" />
          </Link>
        </div>
        <div className="header__nav">
          {headerNav.map((item, idx) => (
            <Link
              className={`header__links ${indexLinks === idx ? "active" : ""}`}
              to={{
                pathname: item.path,
              }}
              key={idx}
            >
              {item.display}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
