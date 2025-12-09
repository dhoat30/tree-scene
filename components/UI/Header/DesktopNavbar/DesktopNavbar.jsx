"use client";
import React, { useState, useEffect, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import styled from "@emotion/styled";
import { usePathname } from "next/navigation";
import { headerLinks } from "@/utils/headerLinks";
import ArrowIcon from "../../Icons/ArrowIcon";
import HeaderArrowIcon from "../../Icons/HeaderArrowIcon";

function DesktopNavbar() {
  const [showMenu, setShowMenu] = useState(-1);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setShowMenu(-1)
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [])

  const menuItems = headerLinks.map((item, index) => {
    const isOpen = showMenu === index;

    return (
      <Box
        className="link"
        component="li"
        key={index}
        ref={menuRef}
        sx={{ color: "white", display: "block", position: "relative" }}
        onMouseEnter={() => setShowMenu(index)}
        onMouseLeave={() => setShowMenu(-1)}
      >
        <Box
          className="nav-trigger"
          sx={{ display: "flex", alignItems: "center" }}
        >
          {!item.subLinks ? (
            <Link
              href={item.url}
              className={isActive(item.url) ? "active" : ""}
            >
              <Typography component="span" variant="body1" align="center">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography
              component="span"
              variant="body1"
              align="center"
              className="nav-parent"
            >
              {item.label}
            </Typography>
          )}

          {item.subLinks && (
            <HeaderArrowIcon className={`arrow ${isOpen ? "rotate" : ""}`} />
            // <KeyboardArrowDownRoundedIcon

            // />
          )}
        </Box>

        {item.subLinks && (
          <Paper
            component="ul"
            variant="outlined"
            className="sublinks-container"
            sx={
              {
                gridTemplateColumns: item.gridTemplateColumn || "1fr",
                width: item.width || "auto",
                pointerEvents: isOpen ? 'auto' : 'none',
                transform: isOpen ? 'scaleY(1)' : 'scaleY(0)', 
                opacity: isOpen ? 1 : 0
              }
            }
          >
            {item.subLinks.map((subLink, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subLink.url}
                  passHref
                  onClick={() => setTimeout(() => setShowMenu(-1), 200)}
                >
                  {subLink.graphic && (
                    <Image
                      className="icon-wrapper border-radius-8"
                      src={subLink.graphic}
                      alt={subLink.label}
                      width="48"
                      height="48"
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
          </Paper>
        )}
      </Box>
    );
  });

  return (
    <AppBarContainer
      position="static"
      sx={{
        display: { xs: "none", lg: "block" },
        background: "var(--light-surface-container-lowest)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="grid-links-wrapper">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              width={513 / 3.5}
              height={171 / 3.5}
              alt="Tree Scene Logo"
              style={{ cursor: "pointer" }}
            />
          </Link>

          {/* Navigation */}
          <div className="links-wrapper">
            <Box
              component="ul"
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                margin: 0,
              }}
            >
              {menuItems}
            </Box>
            <Link href="/get-a-quote">
              <Button size="large" variant="contained">
                GET FREE QUOTE
              </Button>
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBarContainer>
  );
}

export default DesktopNavbar;

const AppBarContainer = styled(AppBar)`
  z-index: 10000;
  top: 0;
  position: fixed;
  box-shadow: none;
  border-bottom: 1px solid var(--light-outline-variant);

  .grid-links-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .links-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: space-between;
  }

  .link {
    > .nav-trigger {
      padding: 16px 24px;
      cursor: pointer;
      color: var(--light-on-surface);
      transition: color 0.2s ease;

      &:hover {
        color: var(--light-primary);
      }

      .arrow {
        transition: transform 0.3s ease;
        margin-left: 4px;
        transform: rotate(0);
        path {
          stroke: var(--light-on-surface);
        }
      }

      .rotate {
        transform: rotate(180deg);
      }
    }

    @media (max-width: 1366px) {
      > .nav-trigger {
        padding: 16px 16px;
      }
    }
    @media (max-width: 1280px) {
      > .nav-trigger {
        padding: 16px 8px;
      }
    }

    a.active::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background: var(--light-primary);
      bottom: 0;
      left: 0;
    }
  }

  .sublinks-container {
    padding:  16px;
    position: absolute;
    left: -16px;
    border-radius: 12px;
    background: white;
    z-index: 100000 !important;
    transform-origin: top;
    transition: all 0.3s ease;
    max-height: 80vh;
    overflow: auto;
    display: grid;
    
    gap: 32px;
    .icon-wrapper {
      padding: 8px;
      display: inline-block;
      border: 1px solid var(--light-outline-variant);
    }
    li {
      a {
        display: grid;
        grid-template-columns: 48px auto;
        gap: 8px;
        align-items: center;
        .subLink {
          display: block;
          color: var(--light-on-surface);
        }
      }
    }
  }
`;
