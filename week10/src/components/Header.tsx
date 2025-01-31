//import React from 'react';
import "../styles/header.css"
import { useTranslation } from 'react-i18next';


function Header() {

  const {t, i18n} = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <header className='header'>
        <h1>HELO THIS HEADER</h1>
        <nav>  
            <ul>
                <a href="/">{t("Home")}</a>   <a href="/about">{t("About")}</a>
            </ul>
            <button id="fi" onClick={()=>changeLanguage("fi")}>FI</button>
            <button id="en" onClick={()=>changeLanguage("en")}>EN</button>
        </nav>
    </header>
  );
};

export default Header;