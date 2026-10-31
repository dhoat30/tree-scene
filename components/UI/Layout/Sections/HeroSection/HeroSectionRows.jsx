import React from "react";
import styles from "./HeroSection.module.scss";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import HeroUSP from "@/components/UI/USP/HeroUSP";
import Image from "next/image";
import Video from "@/components/UI/Video/Video";
// import GoogleReviewSnippet from "@/Components/UI/GoogleReviews/GoogleReviewCard/GoogleReviewSnippet";

export default function HeroSectionRows({
  title,
  subtitle,
  reviewTitle,
  description,
  ctaArr,
  graphicType,
  graphicData,
  uspData,
  reviewerPics,
  ctaMicroCopy,
}) {
  let graphic;

  if (graphicType === "image") {
    graphic = (
      <div
        className="image-wrapper border-radius-12"
        style={{
          paddingBottom: `${(graphicData.height / graphicData.width) * 100}%`,
        }}
      >
        <Image
          src={graphicData.sizes.large}
          alt={graphicData.alt || title}
          fill
          className={`${styles.image}`}
        />
      </div>
    );
  }

  if (graphicType === "youtube_video") {
    graphic = (
      <Video
        videoID={graphicData.youtube_id}
        placeholderImage={graphicData.placeholder_image}
        priority={true}
      />
    );
  }
  return (
    <section className={`${styles.sectionRows}`}>
      <Container className={`${styles.container} align-center`} maxWidth="lg">
        <div className={`${styles.contentWrapper}`}>
          {/* <GoogleReviewSnippet reviewerPics={reviewerPics} reviewTitle={reviewTitle} />  */}
          {subtitle && (
            <Typography component="p" className={styles.subtitle}>
              {subtitle}
            </Typography>
          )}
          <div
            dangerouslySetInnerHTML={{ __html: title }}
            className={`heading-1  colored-text center-align ${styles.title}`}
          />
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className={`heading-4 ${styles.description}`}
          />
          {uspData && (
            <div className={styles.uspWrapper}>
              <HeroUSP data={uspData} />
            </div>
          )}

          {ctaArr && ctaArr.length > 0 && (
            <div className={styles.ctaWrapper}>
              {ctaArr.map((cta, index) => {
                return (
                  <Button
                    key={index}
                    component={Link}
                    href={cta.cta_link.url}
                    variant={index === 0 ? "contained" : "outlined"}
                    disableElevation
                    size="large"
                  >
                    {cta.cta_link.title}
                  </Button>
                );
              })}
            </div>
          )}
          {ctaMicroCopy && (
            <div className={styles.microcopy}>
              <Typography
                variant="body1"
                component={"p"}
                className="center-align"
              >
                {ctaMicroCopy}
              </Typography>
            </div>
          )}
        </div>
        {graphic && <div className={styles.graphicWrapper}>{graphic}</div>}
      </Container>
    </section>
  );
}
