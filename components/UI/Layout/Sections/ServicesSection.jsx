import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ServicesSection({
  title,
  subtitle,
  description,
  cards,
  sectionCtaGroup,
}) {
  if (!cards?.length) return null;

  return (
    <Section id="our-services">
      <Container maxWidth="xl">
        <div className="section-header">
          <div className="title-wrapper">
            {subtitle && (
              <Typography component="p" className="section-subtitle">
                {subtitle}
              </Typography>
            )}
            {title && (
              <Typography variant="h2" component="h2" className="section-title">
                {title}
              </Typography>
            )}
            {description && (
              <div
                className="section-description body1"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
          {sectionCtaGroup?.cta && (
            <div className="section-cta">
              <Button
                component={Link}
                href={sectionCtaGroup.cta.url}
                variant="contained"
                size="large"
                disableElevation
              >
                {sectionCtaGroup.cta.title}
              </Button>
            </div>
          )}
        </div>

        <div className="cards-wrapper">
          {cards.map((card, index) => (
            <article key={index} className="service-card">
              <span className="card-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {card.subtitle && (
                <Typography component="p" className="card-subtitle">
                  {card.subtitle}
                </Typography>
              )}
              <Typography variant="h4" component="h3" className="card-title">
                {card.title}
              </Typography>
              <div
                className="card-description body1"
                dangerouslySetInnerHTML={{ __html: card.description }}
              />
              {card.cta_group?.cta && (
                <div className="card-cta">
                  <Button
                    component={Link}
                    href={card.cta_group.cta.url}
                    variant={card.cta_group.cta_type || "outlined"}
                    color="primary"
                    disableElevation
                  >
                    {card.cta_group.cta.title}
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0;
  background: var(--light-surface-container-low);

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    margin-bottom: 36px;
  }

  .title-wrapper {
    min-width: 0;
    max-width: 850px;
  }

  .section-subtitle {
    margin-bottom: 14px;
    color: var(--light-primary);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    line-height: 1.5;
    text-transform: uppercase;
  }

  .section-title {
    max-width: 26ch;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.04em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .section-description {
    max-width: 65ch;
    margin-top: 18px;

    &, p {
      font-size: 1rem;
      line-height: 1.65;
    }

    p { margin: 0; }
    p + p { margin-top: 12px; }
  }

  .section-cta {
    flex-shrink: 0;
  }

  .cards-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
    gap: 24px;
    align-items: stretch;
  }

  .service-card {
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background: var(--light-surface-container-lowest);
    border: 1px solid var(--light-outline-variant);
    border-radius: 16px;
  }

  .card-number {
    align-self: flex-start;
    color: var(--light-primary);
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding-bottom: 12px;
    margin-bottom: 24px;
    border-bottom: 2px solid var(--light-primary);
  }

  .card-subtitle {
    color: var(--light-primary);
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .card-title {
    margin-bottom: 16px;
    font-size: clamp(1.35rem, 2vw, 1.65rem);
    line-height: 1.2;
    font-weight: 600;
    letter-spacing: -0.025em;
    text-wrap: balance;
    overflow-wrap: break-word;
  }

  .card-description {
    margin: 0;

    &, p, li {
      color: var(--light-on-surface-variant);
      font-size: 0.95rem;
      line-height: 1.65;
    }

    p { margin: 0 0 12px; }
    p:last-child { margin-bottom: 0; }

    ul {
      margin: 22px 0 0;
      padding-top: 18px;
      border-top: 1px solid var(--light-outline-variant);
    }

    ul li {
      margin: 0 0 10px;
      padding-left: 25px;
    }

    ul li:last-child { margin-bottom: 0; }

    ul li::before {
      content: "✓";
      color: var(--light-primary);
      font-weight: 600;
      left: 0;
      top: 0;
    }
  }

  .card-cta {
    margin-top: auto;
    padding-top: 24px;
  }

  @media (max-width: 1000px) {
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
    }
  }

  @media (max-width: 600px) {
    padding: 48px 0;
    .section-header { margin-bottom: 28px; }
    .cards-wrapper { grid-template-columns: 1fr; gap: 16px; }
    .service-card { padding: 24px; border-radius: 12px; }
    .card-number { margin-bottom: 20px; }
    .section-cta { width: 100%; }
    .section-cta a { width: 100%; }
  }
`;
