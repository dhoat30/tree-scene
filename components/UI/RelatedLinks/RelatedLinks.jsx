"use client";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { getRelatedLinks } from "@/utils/serviceLinks";

export default function RelatedLinks({
  pageId,
  title = "Related tree services in Tauranga",
  description,
}) {
  const links = getRelatedLinks(pageId);
  if (!links.length) return null;

  return (
    <Section aria-labelledby={`related-links-${pageId}`}>
      <Container maxWidth="xl">
        <div className="section-header">
          <Typography
            variant="h2"
            component="h2"
            className="section-title"
            id={`related-links-${pageId}`}
          >
            {title}
          </Typography>
          {description && (
            <Typography component="p" className="section-description body1">
              {description}
            </Typography>
          )}
        </div>

        <ul className="links-grid">
          {links.map((link) => (
            <li key={link.url} className="link-card">
              {/* Only the title is the anchor, so its text describes the target page;
                  the ::after overlay keeps the whole card clickable. */}
              <Typography variant="h6" component="h3" className="link-title">
                <Link href={link.url}>{link.label}</Link>
              </Typography>
              <p className="link-description body1">{link.description}</p>
              <span className="link-arrow" aria-hidden="true">
                →
              </span>
            </li>
          ))}
        </ul>

        <div className="all-services">
          <Link href="/services">View all tree services</Link>
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-surface-container-low);
  @media (max-width: 900px) {
    padding: 40px 0;
  }

  .section-header {
    max-width: 850px;
    margin-bottom: 36px;
  }

  .section-title {
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  .section-description {
    max-width: 65ch;
    margin-top: 16px;
    font-size: 1rem;
    line-height: 1.65;
  }

  .links-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media (max-width: 1100px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 650px) {
      grid-template-columns: 1fr;
    }
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .link-card {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 24px;
    background: var(--light-surface-container-lowest);
    border: 1px solid var(--light-outline-variant);
    border-radius: 16px;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &:hover,
    &:focus-within {
      border-color: var(--light-primary);
      transform: translateY(-2px);
    }
  }

  .link-title {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.3;

    a {
      color: var(--light-on-surface);
      text-decoration: none;

      &::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
      }

      &:focus-visible {
        outline: none;
      }
    }
  }

  .link-card:focus-within {
    outline: 2px solid var(--light-primary);
    outline-offset: 2px;
  }

  .link-description {
    margin: 8px 0 0;
    color: var(--light-on-surface-variant);
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .link-arrow {
    margin-top: auto;
    padding-top: 16px;
    color: var(--light-primary);
    font-size: 1.25rem;
    line-height: 1;
  }

  .all-services {
    margin-top: 32px;
    text-align: center;

    a {
      color: var(--light-primary);
      font-weight: 600;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;
