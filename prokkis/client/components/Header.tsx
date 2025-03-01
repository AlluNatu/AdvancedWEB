import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import "../styles/header.css"
import { Avatar, Typography } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';


export const Header = () => {

  // Setup usestate to update states
  const [userImage, setUserImage] = useState<string | null>(null);

  // Translation
  const {t, i18n} = useTranslation()
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  // Simple function to handle logout, removes token and takes user to /login
  const handleLogOut = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  // Check if token is there
  const token: string | null = localStorage.getItem("token")

  // Use this to get the avatar for user. useEffect so it updates when token changes
  useEffect(() => {
    if (token) {
      // Normal fetch, uses auth header to check if token is legit
      const fetchUserImage = async () => {
        try {
          const response = await fetch('/api/getImage', {
          method: 'get',
          headers:
          {'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        } });
        // console.log(response);
        
          const data = await response.json();
          // console.log(data);
          // console.log(data.imagePath);
          
          // set the image here to the usestate
          setUserImage(data.imagePath);
        } catch (error) {
          // Log error if error
          console.error("Error fetching user image:", error);
        }
      };

      fetchUserImage();
    }
  }, [token]);


  // Check for token so knows what to return and to render

  if (token) {
    return (
      // AppBar
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t("Notes app")}
            </Typography>
            {/* Buttons for different things such as change language and handle logout */}
              <Button onClick={()=>changeLanguage("fi")} color="inherit">FI</Button>
              <Button onClick={()=>changeLanguage("en")} color="inherit">EN</Button>
              <Button onClick={handleLogOut} color="inherit">{t("logout")}</Button>
              {/* Check if image is null or user has image, if null it appoints a holder, if not null it takes the
              the path from the fetch and puts it into the avatar */}
              {userImage ? (
              
              <Avatar alt="User Image" src={userImage} />
            ) : (
              <Avatar alt="User Image" />
            )}
          </Toolbar>
        </AppBar>
      </Box>
    )
  }

// No token, different return and render

  if (!token) {
    return (
      <Box sx={{ flexGrow: 2 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {t("Notes app")}
            </Typography>
              <Button id="fi" onClick={()=>changeLanguage("fi")} color="inherit">FI</Button>
              <Button id="en" onClick={()=>changeLanguage("en")} color="inherit">EN</Button>
              <Button component={Link} to="/login" color="inherit">{t("login")}</Button>
              <Button component={Link} to="/signup" color="inherit">{t("signup")}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
  }


export default Header