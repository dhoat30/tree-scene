"use client";
import { serviceAreaGroups, coverageSummary } from "@/utils/serviceAreas";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";
import styles from "./AreasCovered.module.scss";

export default function AreasCovered({ title = "Areas Covered", description, groups, note, ctaGroup }) {
  if (!groups?.length) return null;

  return (
    <section className={styles.section} data-section="areas-covered">
      <Container maxWidth="lg">
        <div className={styles.intro}>
          <LocationOnOutlinedIcon className={styles.locationIcon} aria-hidden="true" />
          <Typography component="h2" variant="h2" className={styles.title}>{title}</Typography>
          {description && <Typography component="p" className={styles.description}>{description}</Typography>}
        </div>
        <div className={styles.grid}>
          {groups.map((group, index) => (
            <div key={index} className={`${styles.group} ${group.featured ? styles.featured : ""}`}>
              <Typography component="h3" variant="h6" className={styles.groupTitle}>{group.title}</Typography>
              <ul className={styles.locations}>
                {group.areas.map((area) => <li key={area}>{area}</li>)}
              </ul>
            </div>
          ))}
        </div>
        {(note || ctaGroup?.cta) && (
          <div className={styles.footer}>
            {note && <Typography component="p" className={styles.note}>{note}</Typography>}
            {ctaGroup?.cta && (
              <Button component={Link} href={ctaGroup.cta.url} variant={ctaGroup.cta_type || "contained"} size="large" disableElevation>
                {ctaGroup.cta.title}
              </Button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

// Shared site-wide instance; the configurable layout remains available in Layout.jsx.
export function SiteAreasCovered() {
  return (
    <AreasCovered
      title="Areas Covered"
      description={coverageSummary}
      groups={serviceAreaGroups}
      note="We work on residential properties, orchards, farms and lifestyle blocks throughout these areas. Contact us to check your location and arrange a quote."
      ctaGroup={{ cta: { title: "Request a free quote", url: "/get-a-quote" } }}
    />
  );
}
