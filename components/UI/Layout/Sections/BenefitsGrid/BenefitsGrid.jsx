import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import styles from "./BenefitsGrid.module.scss";

export default function BenefitsGrid({ title, subtitle, description, items, ctaGroup }) {
  if (!items?.length) return null;

  return (
    <section className={styles.section}>
      <Container maxWidth="lg">
        <div className={styles.intro}>
          {subtitle && (
            <Typography component="p" className={styles.subtitle}>
              {subtitle}
            </Typography>
          )}
          {title && (
            <Typography component="h2" variant="h2" className={styles.title}>
              {title}
            </Typography>
          )}
          {description && (
            <Typography component="p" variant="body1" className={styles.description}>
              {description}
            </Typography>
          )}
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <article className={styles.card} key={index}>
              <div className={styles.cardHeader}>
                <CheckCircleOutlineIcon className={styles.icon} aria-hidden="true" />
                <Typography component="h3" variant="h6" className={styles.cardTitle}>
                  {item.title}
                </Typography>
              </div>
              <div
                className={`${styles.content} body1`}
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </article>
          ))}
        </div>

        {ctaGroup?.cta && (
          <div className={styles.actions}>
            <Button
              component={Link}
              href={ctaGroup.cta.url}
              variant={ctaGroup.cta_type || "contained"}
              size="large"
              disableElevation
            >
              {ctaGroup.cta.title}
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
