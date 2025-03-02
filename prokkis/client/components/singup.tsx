import React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, styled, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useTranslation } from 'react-i18next';

function Signup() {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);

  // Function which is called when files are added
  // Sets them in a state so can be sent to backend
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  // Function that handles the signput
  // Takes data and puts to form
  // Sends to backend
  // Backend then saves to db
  const handlebuttonSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (image) {
      formData.append("image", image, image.name);
    }
    console.log(formData);
    

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setEmail("");
        setPassword("");
        window.location.href = "/login"
      } else {
        console.log('Error signing in:', response);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };
  // From MUI and was not really explained

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <>
        <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" gutterBottom>
        {t("Sign up!")}
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
    {/* INPUT FIELDS AND BUTTONS */}
    <TextField name='email' id="standard-basic" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" />
    <TextField name='password' id="standard-basic" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="standard" />
    <Button name="signupButton" variant="contained" color="primary" onClick={handlebuttonSubmit} fullWidth>
       {t("Sign up!")}
    </Button>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      {t("Upload files")}
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Button>
    <Link href="/login" variant="body2">
      {t("Already have an account? Log in!")}
  </Link>
  </Box>
  </Box>
    </>
  )
}

export default Signup