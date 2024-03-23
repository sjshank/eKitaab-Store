import { ThemeOptions, createTheme } from "@mui/material/styles";
import { Oxygen_Mono } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const oxygenMono: NextFont = Oxygen_Mono({
  weight: "400",
  subsets: ["latin-ext"],
  display: "swap",
  preload: true,
});

// Create a theme instance.
const theme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#007F73",
    },
    secondary: {
      main: "#F8FAE5",
    },
    text: {
      primary: "#0F0F0F",
      secondary: "#575f62e6",
    },
    divider: "#378677",
    background: {
      default: "#FDF6F0",
    },
  },
  typography: {
    htmlFontSize: 14,
    fontFamily: oxygenMono.style.fontFamily.concat(", monospace"),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    allVariants: {
      lineHeight: 1.3,
      accentColor: "auto",
      letterSpacing: 0.1,
      fontWeight: 600,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          width: "1.20em",
          height: "1.20em",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: "#1D24CA",
      },
    },
  },
});

export default theme;
