import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// Types or interfaces to use typescript is better with
type TLogin = {
  email: string,
  password: string,
}

interface LoginResponse {
  token: string;
  success: boolean;
}

function Login() {
  const { t } = useTranslation();

// Usestates to use later. Good for rendering and such
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Button for submitting login.
  // Takes email and password from inputs from user
  // Sends to backend
  // Backend gives back a token
  // If token there cool if not error
  const handlebuttonSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const newLogin: TLogin = {
      email: email,
      password: password,
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
          const data: LoginResponse = await response.json()
            console.log(data)
            
            if(data.token) {
                localStorage.setItem('token', data.token)
                window.location.href = "/"
            }
      } else {
        console.log('Error logging in:', response);
      }
    } catch (error: unknown) {
      console.log(error);
    }

    
  };


  return (
    <>
        <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        {t("login")}
      </Typography>
      <Box
            component="form"
            justifyContent="center"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '300px',
              p: 3,
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: 'white',
            }}
  >
    {/* INPUTS for the form on the front */}
    <TextField name='email' id="standard-basic" label={t("Email")} value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" />
    <TextField name='password' id="standard-basic" label={t("Password")} type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" />
    <Button id='loginButton' variant="contained" color="primary" onClick={handlebuttonSubmit} fullWidth>
    {t("Log in")}
    </Button>
    {/* A link if user has no login info. Seen on many sites */}
    <Link href="/signup" variant="body2">
      {t("Don't have an account? Sign Up")}
  </Link>
  </Box>
  </Box>
    </>
  )
}

export default Login