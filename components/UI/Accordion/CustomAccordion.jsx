"use client";
import { useId, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CustomAccordion({ qaData }) {
  const [expanded, setExpanded] = useState(false);
  const instanceId = useId();
  if (!Array.isArray(qaData) || !qaData.length) return null;

  return (
    <Container>
      {qaData.map((item, index) => {
        const panelId = `${instanceId}-faq-${index}`;
        return (
          <MuiAccordion
            key={index}
            disableGutters
            elevation={0}
            className="faq-item"
            expanded={expanded === index}
            onChange={(_, isExpanded) => setExpanded(isExpanded ? index : false)}
          >
            <MuiAccordionSummary
              className="faq-question"
              expandIcon={expanded === index ? <RemoveIcon /> : <AddIcon />}
              id={`${panelId}-question`}
              aria-controls={`${panelId}-answer`}
            >
              <Typography component="span" className="faq-question-text">
                {item.question}
              </Typography>
            </MuiAccordionSummary>
            <MuiAccordionDetails className="faq-answer">
              <Typography component="div" variant="body1" className="faq-answer-text">
                {item.answer}
                {item.link?.url && (
                  <> <Link href={item.link.url} className="faq-answer-link">{item.link.title}</Link></>
                )}
              </Typography>
            </MuiAccordionDetails>
          </MuiAccordion>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;

  .faq-item {
    min-width: 0;
    margin: 0;
    border: 1px solid var(--light-outline-variant);
    border-radius: 12px;
    background: var(--light-surface-container-lowest);
    box-shadow: none;

    &::before { display: none; }
    &.Mui-expanded { margin: 0; border-color: var(--light-primary); }
    &.Mui-expanded .faq-question-text { color: var(--light-primary); }
  }

  .faq-question {
    min-height: 72px;
    padding: 18px 24px;
    gap: 20px;
    border-radius: 12px;
    background: transparent;
    transition: background-color .2s ease;

    &:hover { background: var(--light-surface-container-low); }
    &.Mui-focusVisible {
      outline: 2px solid var(--light-primary);
      outline-offset: -3px;
      background: var(--light-surface-container-low);
    }

    .MuiAccordionSummary-content { min-width: 0; margin: 0; }
    .MuiAccordionSummary-expandIconWrapper {
      flex-shrink: 0;
      color: var(--light-primary);
    }
    .MuiAccordionSummary-expandIconWrapper.Mui-expanded { transform: none; }
  }

  .faq-question-text {
    color: var(--light-on-surface-variant);
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
    letter-spacing: -.015em;
    overflow-wrap: break-word;
  }

  .faq-answer { padding: 0 24px 24px; }

  .faq-answer-text {
    padding-top: 18px;
    border-top: 1px solid var(--light-outline-variant);
    color: var(--light-on-surface-variant);
    font-size: .95rem;
    line-height: 1.7;
    white-space: pre-line;
    overflow-wrap: break-word;
  }

  .faq-answer-link {
    color: var(--light-primary);
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .faq-answer-link:hover { text-decoration-thickness: 2px; }
  .faq-answer-link:focus-visible { outline: 2px solid var(--light-primary); outline-offset: 4px; }

  @media (max-width: 600px) {
    gap: 10px;
    .faq-question { min-height: 64px; padding: 16px 18px; gap: 14px; }
    .faq-answer { padding: 0 18px 20px; }
    .faq-answer-text { padding-top: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-question, .MuiAccordionSummary-expandIconWrapper, .MuiCollapse-root { transition: none; }
  }
`;
