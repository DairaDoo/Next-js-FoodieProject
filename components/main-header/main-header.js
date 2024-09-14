"use client";

import Link from "next/link";
import classes from "./main-header.module.css"; // importamos css como un objeto y añádimos en los classNames.
import Image from "next/image"; // componente image perteneciente a NextJs.

// así se pueden importar imagenes en NextJs (@ es un alias para el root del proyecto).
import logoImg from "@/assets/logo.png";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link"; // usamos esto para no tener que renderizar esta página en el client side.
import { useState } from "react";

export default function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenuHandler = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
    <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <button
          className={classes.menuToggle}
          onClick={toggleMenuHandler}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        <nav className={`${classes.nav} ${isMenuOpen ? classes.open : ""}`}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
