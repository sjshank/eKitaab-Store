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
      main: "#378677",
    },
    secondary: {
      main: "#F8FAE5",
    },
    text: {
      primary: "#1B1A17",
      secondary: "#73777B",
    },
    divider: "#378677",
    background: {
      default: "rgb(144 194 220 / 16%)",
    },
  },
  typography: {
    htmlFontSize: 14,
    fontFamily: oxygenMono.style.fontFamily.concat(", monospace"),
    // fontSize: 15,
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
      // overflow: "hidden",
      // whiteSpace: "nowrap",
      // textOverflow: "ellipsis",
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
  },
});

export default theme;
