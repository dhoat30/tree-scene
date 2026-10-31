"use client";
import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Container from "@mui/material/Container";

export default function USP({ title, description, cards, showTitle = false, statsArray }) {
  const items = Array.isArray(cards) ? cards : [];
  const stats = Array.isArray(statsArray) ? statsArray : [];
  const hasHeading = showTitle && (title || description);
  if (!hasHeading && !items.length && !stats.length) return null;

  return (
    <Section data-section="usp">
      <Container maxWidth="lg">
        {(hasHeading || stats.length > 0) && (
          <div className={`usp-header ${hasHeading ? "" : "stats-only"}`}>
            {hasHeading && (
              <div className="usp-intro">
                {title && (
                  <Typography variant="h2" component="h2" className="usp-title">
                    {title}
                  </Typography>
                )}
                {description && (
                  <Typography variant="body1" component="p" className="usp-description">
                    {description}
                  </Typography>
                )}
              </div>
            )}
            {stats.length > 0 && (
              <dl className="usp-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="usp-stat">
                    <dt>{stat.label}</dt>
                    <dd>{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
        {items.length > 0 && (
          <div className="usp-grid">
            {items.map((card, index) => (
              <article key={index} className="usp-card">
                <div className="usp-card-header">
                  {card.icon?.url && (
                    <span className="usp-icon">
                      <Image src={card.icon.url} alt="" width={48} height={48} />
                    </span>
                  )}
                  <Typography variant="h6" component="h3" className="usp-card-title">
                    {card.title}
                  </Typography>
                </div>
                <Typography variant="body1" component="p" className="usp-card-description">
                  {card.description}
                </Typography>
              </article>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-primary-fixed-dim);
  color: var(--light-on-primary-container);

  .usp-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 48px;
    margin-bottom: 36px;
  }

  .usp-intro { max-width: 650px; min-width: 0; }

  .usp-title {
    color: var(--light-on-primary-container);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -.04em;
    text-wrap: balance;
  }

  .usp-description {
    margin-top: 18px;
    color: var(--light-inverse-primary);
    font-size: 1rem;
    line-height: 1.65;
    text-wrap: pretty;
  }

  .usp-stats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    flex-shrink: 0;
    max-width: 45%;
  }

  .usp-stat {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 24px;
    border-left: 1px solid var(--light-surface-tint);
    max-width: 160px;

    dt { font-size: .8rem; line-height: 1.5; color: var(--light-inverse-primary); }
    dd {
      order: -1;
      margin: 0;
      color: var(--light-on-primary-container);
      font-size: clamp(2rem, 3vw, 2.75rem);
      font-weight: 600;
      letter-spacing: -.04em;
      line-height: 1.1;
      font-variant-numeric: tabular-nums;
    }
  }

  .stats-only { justify-content: center; }
  .stats-only .usp-stats { max-width: 100%; }

  .usp-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .usp-card {
    min-width: 0;
    padding: 28px;
    border-radius: 16px;
    border: 1px solid var(--light-surface-tint);
    background: var(--light-primary-container);
  }

  .usp-card-header { display: flex; align-items: center; gap: 16px; margin-bottom: 18px; }
  .usp-icon { display: inline-flex; flex-shrink: 0; }
  .usp-icon img { width: 48px; height: 48px; object-fit: contain; }

  .usp-card-title {
    color: var(--light-on-primary-container);
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -.02em;
    overflow-wrap: break-word;
  }

  .usp-card-description {
    color: var(--light-inverse-primary);
    font-size: .95rem;
    line-height: 1.7;
  }

  @media (max-width: 900px) {
    .usp-header { flex-direction: column; gap: 28px; text-align: center; }
    .usp-stats { max-width: 100%; }
    .usp-stat { text-align: left; }
  }

  @media (max-width: 650px) {
    padding: 48px 0;
    .usp-header { margin-bottom: 28px; }
    .usp-grid { grid-template-columns: 1fr; gap: 16px; }
    .usp-card { padding: 24px; border-radius: 12px; }
    .usp-card-header { gap: 12px; margin-bottom: 14px; }
    .usp-card-title { font-size: 1.125rem; }
    .usp-icon img { width: 40px; height: 40px; }
    .usp-stats { gap: 20px; }
    .usp-stat { padding-left: 16px; max-width: 140px; }
  }
`;
