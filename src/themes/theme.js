import { DefaultTheme } from "react-native-paper";

const customTheme = {
  ...DefaultTheme,
  colors: {
    // Base Colors
    baseWhite: "#FFFFFF",
    baseBlack: "#000000",

    // Neutral Colors
    neutral: {
      25: "#F9F9FA",
      50: "#F5F6F7",
      100: "#F0F1F3",
      200: "#EBECF0",
      300: "#E6E8EC",
      400: "#CED0D9",
      500: "#B5B8C6",
      600: "#9CA1B4",
      700: "#8489A1",
      800: "#595F76",
      900: "#363947",
    },

    // Primary Colors
    primary: {
      25: "#F9FEFF",
      50: "#F4FDFF",
      100: "#EBFBFF",
      200: "#E4FBFF",
      300: "#D1F8FF",
      400: "#AFEDF9",
      500: "#60DAF3",
      600: "#10C8ED",
      700: "#0FBADD",
      800: "#0FADCD",
      900: "#029BBA",
    },
    warning: {
      25: "#fff9f6",
      50: "#fff4ed",
      100: "#ffe3d2",
      200: "#ffd0b4",
      300: "#ffb98e",
      400: "#ffa268",
      500: "#ff8a43",
      600: "#ff731d",
      700: "#d46018",
      800: "#aa4d13",
      900: "#803a0f",
    },
    success: {
      25: "#f8fdf9",
      50: "#f1faf2",
      100: "#dcf3df",
      200: "#c5ebca",
      300: "#a8e1af",
      400: "#8cd795",
      500: "#6fcd7b",
      600: "#52c360",
      700: "#44a250",
      800: "#378240",
      900: "#296230",
    },
    info: {
      25: "#f6fbff",
      50: "#edf8ff",
      100: "#d1edff",
      200: "#b3e0ff",
      300: "#8dd1ff",
      400: "#67c2ff",
      500: "#41b2ff",
      600: "#1ba3ff",
      700: "#1788d4",
      800: "#126daa",
      900: "#0e5280",
    },
    danger: {
      // Danger Colors
      25: "#FEF6F8",
      50: "#FDECF1",
      100: "#F9D0DB",
      200: "#F5B1C3",
      300: "#EF89A5",
      400: "#EA6288",
      500: "#E53B6A",
      600: "#E0144C",
      700: "#BB113F",
      800: "#950D33",
      900: "#700A26",
    },
  },

  fonts: {
    regular: "Roboto-Regular",
    medium: "Roboto-Medium",
  },
  spacing: {
    extraSmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  },
  typography: {
    headline1: {
      fontFamily: "medium",
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0.25,
      color: "primary100",
    },
  },
  padding: {
    horizontal: 20,
  },
};

export default customTheme;
