import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme();

// My own created component to have responsive font.
// Tbh could have been on MUI already but why not lol

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

// PROPS to send on component
// variantText can only be one of 5 so there is no mixhap
interface Props {
    text: string;
    variantText: "h3" | "body2" | "h4" | "h5" | "caption";
  }

const ResponsiveFont: React.FC<Props> = ({ text, variantText }) => {
  return (
    <ThemeProvider theme={theme}>
      <Typography sx={{wordWrap: 'break-word'}} variant={variantText}>{text}</Typography>
    </ThemeProvider>
  );
}

export default ResponsiveFont;