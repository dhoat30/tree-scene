"use client";
import { useState, useRef, useEffect } from "react";
import { styled as style, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import MenuIcon from "../../Icons/MenuIcon";
import Link from "next/link";
import ArrowIcon from "../../Icons/ArrowIcon";
import { headerLinks } from "@/utils/headerLinks";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";

const Drawer = dynamic(() => import("@mui/material/Drawer"));

const drawerWidth = "auto";

const DrawerHeader = style("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function MobileNavbar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(-1); // To track which submenu is open
  const pathname = usePathname();
  const router = useRouter(); // To programmatically navigate

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event, item, index) => {
  
   console.log(index)
    // Check if the link has sublinks
    if (item.subLinks && item.subLinks.length > 0) {
      event.preventDefault();

      setShowMenu((prevIndex) =>
        prevIndex === index ? -1 : index
      ); // Toggle the submenu open/close
      // If the same submenu is open, navigate to the link

      // router.push(item.url); // Navigate to the link
      // handleDrawerClose(); // Close the drawer after navigation
    } 
    else { 
      handleDrawerClose(); // Close the drawer after navigation

    }

  };

  const menuItems = headerLinks.map((item, index) => {
    const isOpen = showMenu === index;

    return (
      <li
        className="flex-auto text-center relative parent-list-item"
        key={index}
      >
        <a
          href={item.url}
          className={`parent-link ${pathname === item.url ? "active" : ""}`}
          onClick={(event) => handleClick(event, item, index)}
        >
          {item.label}
          {item.subLinks && <ArrowIcon className="arrow" />}
        </a>

        {item.subLinks && (
          <ul
            className={`${
              showMenu === index ? "block" : "hidden"
            } bg-primary-light text-surface-light top-8 dropdown`}

          
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex} className="text-left child-list-item" onClick={()=> handleDrawerClose() }>
                <Divider
                  key={subIndex + 100}
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                />
                <Link href={subLink.url} className="child-link">
                {subLink.graphic && (
                    <Image
                      className="icon-wrapper border-radius-8"
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="40"
                      height="40"
                      quality={100}
                    />
                  )}
                  <div className="label-wrapper">
                    <Typography
                      className="subLink"
                      component="span"
                      variant="subtitle1"
                    >
                      {subLink.label}
                    </Typography>
                    <Typography
                      className="subLink"
                      component="span"
                      variant="body2"
                    >
                      {subLink.subtitle}
                    </Typography>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Divider
          key={index + 122}
        />
      </li>
    );
  });

  return (
    <>
      <AppBarStyled
        position="fixed"
        sx={{
          display: {
            xs: "block",
            lg: "none",
          },
          background: pathname.includes("blogs")
            ? "var(--light-surface-container-lowest)"
            : "var(--light-surface-container-lowest)",
        }}
      >
        <Container maxWidth="xl" sx={{ padding: "0 6px !important" }}>
          <Toolbar disableGutters>
            <Box sx={{ width: "100%" }} id="menu-container">
              <div className="menu-logo-wrapper">
                <IconButton
                  size="small"
                  aria-label="Open navigation menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleDrawerOpen}
                  color="primary"
                  disableRipple={true}
                  className="hamburger-icon"
                >
                  <MenuIcon fontSize="large" />
                </IconButton>
                <Link href="/" className="logo-wrapper">
                  <Image
                    src="/logo.png"
                    width={513 /4}
                    height={171/4}
                    alt="Epic Cleaning Logo"
                    quality={100}
                  />
                </Link>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBarStyled>
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          zIndex: "100",
        }}
        role="presentation"
        id="menu-appbar"
      >
        <Drawer
          sx={{
            width: "95%",
            maxWidth: "500px", 
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: "95%",
              maxWidth: "500px", 
              boxSizing: "border-box",
              backgroundColor: "var(--light-surface-container-low)",
            },
          }}
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIconStyle />
              ) : (
                <ChevronRightIconStyle />
              )}
            </IconButton>
          </DrawerHeader>
          <ListContainer>{menuItems}</ListContainer>
          <Link href="/get-free-quote" style={{ margin: "16px" }}>
            <Button
              size="large"
              variant="outlined"
              className="button"
              onClick={handleDrawerClose}
              sx={{ width: "100%" }}
            >
              GET A QUOTE
            </Button>
          </Link>
        </Drawer>
      </Box>
    </>
  );
}

const AppBarStyled = styled(AppBar)`
  backdrop-filter: blur(7.6px);
  
  .menu-logo-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo-wrapper {
  }
  .hamburger-icon {
    svg {
      path {
      }
    }
  }
`;

const ListContainer = styled.ul`
  margin: 0;
  padding: 0;
  .block {
    display: block;
    margin: 0;
    padding: 0;
  }
  .hidden {
    margin: 0;
    padding: 0;
    display: none;
  }

  .parent-list-item {
    .parent-link {
      display: block;
      text-align: left;
      padding: 16px 16px;
      color: var(--light-on-surface);
      font-weight: 500;
      letter-spacing: 0.005rem;
      position: relative;
  
      &.active {
        color: var(--light-primary  );
      }
    }
    svg {
      position: absolute;
      right: 24px;
      top: 24px;
      transform: rotate(180deg);
      path {
        fill: var(--light-on-surface) !important;
      }
    }
  }
  .child-list-item {
    .child-link {
      display: block;
      text-align: left;
      padding: 16px 16px;
      color: var(--light-on-surface-variant);
      font-weight: 400;
      position: relative;
      display: grid;
        grid-template-columns: 40px auto;
        gap: 8px;
        align-items: center;
        img{ 
          padding: 4px; 
          border: 1px solid var(--light-outline-variant);
        }
        .label-wrapper{ 
          display: flex; 
         flex-direction: column;
        }
      &:hover {
        color: var(--light-primary);
      }
    }
  }
`;

const ChevronLeftIconStyle = styled(ChevronLeftIcon)`
  path {
    fill: var(--light-on-surface) !important;
  }
`;
const ChevronRightIconStyle = styled(ChevronLeftIcon)`
  path {
    fill: var(--light-on-surface) !important;
  }
`;
