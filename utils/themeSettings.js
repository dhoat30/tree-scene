import { createTheme } from "@mui/material/styles";
//export theme settings

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#254336",
    },
    secondary: {
      main: "#6B8A7A",
    },
    tertiary: {
      main: "#DAD3BE",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontSize: "4rem",
      fontWeight: 900,
      color: "var(--light-on-surface)",
      textTransform: "uppercase", 
      lineHeight: "90%", 
      "@media (max-width:900px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontWeight: 600,
      fontSize: "3rem",
      lineHeight: "100%",
      color: "var(--light-on-surface)",

      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.05rem",
      color: "var(--light-on-surface)",
              lineHeight: "100%",

      "@media (max-width:600px)": {
        fontSize: "1.7rem",
      
      },
    },
    h4: {
      fontWeight: 600,
      color: "var(--light-on-surface)",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: "-0.05rem",

      color: "var(--light-on-surface)",
    },

    h6: {
      color: "var(--light-on-surface)",
    },
    body1: {
      color: "var( --light-on-surface-variant)",
      letterSpacing: "-0.03rem",
      lineHeight: 1.5
    },
    body2: {},
    subtitle1: {
      color: "var(--light-on-surface)",
      fontWeight: 500,
      fontSize: "0.9rem"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          color: "var(--light-on-primary)",
          paddingRight: "32px",
          paddingLeft: "32px",
     
        },
        contained: { 
          background: "var(--light-primary)"
        }, 
        outlined: {
          border: "1px solid var(--light-primary)",
          color: "var(--light-primary)",
        },
      },
    },
  },
});
// mui theme settings
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#254336",
    },
    secondary: {
      main: "#6B8A7A",
    },
    tertiary: {
      main: "#DAD3BE",
    },
    contrastThreshold: 4.5,
  },
  typography: {
    fontFamily: ["var(--font-work-sans)", "Segoe UI", "sans-serif"].join(","),
    h1: {
      fontSize: "5rem",
      fontWeight: 600,
      color: "var(--dark-on-surface)",
      "@media (max-width:900px)": {
        fontSize: "3rem",
      },
    },
    h2: {
      fontWeight: 600,
      color: "var(--dark-on-surface)",
      "@media (max-width:600px)": {
        fontSize: "2.5rem",
      },
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "0.05rem",
      color: "var(--dark-on-surface)",
    },
    h4: {
      fontWeight: 500,
      color: "var(--dark-on-surface)",

      "@media (max-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h5: {
      fontWeight: 400,
      letterSpacing: "0.02rem",

      color: "var(--dark-on-surface)",
    },

    h6: {
      fontWeight: 400,
      letterSpacing: "0.02rem",
      color: "var(--dark-on-surface)",
    },
    body1: {
      fontWeight: 350,
      letterSpacing: "0.02rem",
      color: "var( --dark-on-surface-variant)",
    },
    body2: {
      fontWeight: 300,
      letterSpacing: "0.05rem",
    },
    subtitle1: {
      color: "var(--dark-on-surface)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
        },
      },
    },
  },
});
