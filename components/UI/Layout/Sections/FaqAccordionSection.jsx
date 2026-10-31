"use client";
import styled from "@emotion/styled";
import CustomAccordion from "../../Accordion/CustomAccordion";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function FaqAccordionSection({ title, description, qaData }) {
  if (!Array.isArray(qaData) || !qaData.length) return null;

  return (
    <Section data-section="faq">
      <Container maxWidth="lg">
        <div className={`faq-layout ${!title && !description ? "questions-only" : ""}`}>
          {(title || description) && (
            <div className="faq-intro">
              {title && (
                <Typography variant="h2" component="h2" className="faq-title">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body1" component="p" className="faq-description">
                  {description}
                </Typography>
              )}
            </div>
          )}
          <CustomAccordion qaData={qaData} />
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-surface-container-low);

  .faq-layout {
    display: grid;
    grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
    gap: 64px;
    align-items: start;
  }

  .questions-only { grid-template-columns: minmax(0, 1fr); }

  .faq-intro {
    position: sticky;
    top: 100px;
  }

  .faq-title {
    color: var(--light-on-surface);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -.04em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .faq-description {
    max-width: 42ch;
    margin-top: 20px;
    color: var(--light-on-surface-variant);
    font-size: 1rem;
    line-height: 1.7;
    text-wrap: pretty;
  }

  @media (max-width: 900px) {
    .faq-layout { grid-template-columns: minmax(0, 1fr); gap: 32px; }
    .faq-intro { position: static; max-width: 650px; }
    .faq-description { max-width: 65ch; }
  }

  @media (max-width: 600px) {
    padding: 48px 0;
    .faq-layout { gap: 28px; }
    .faq-description { margin-top: 16px; }
  }
`;
