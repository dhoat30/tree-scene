"use client";
import styled from "@emotion/styled";
import { SiteAreasCovered } from "@/components/UI/Layout/Sections/AreasCovered/AreasCovered";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "../Forms/NewsletterForm";
import { services, informationLinks } from "./FooterLinks";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import { coverageSummary } from "@/utils/serviceAreas";

export default function Footer({ footerCtaData, showFooterCta = true, certifications, contactInfo, socialData }) {
  const badges = Array.isArray(certifications?.cards) ? certifications.cards : [];
  const socials = Array.isArray(socialData) ? socialData : [];

  return (
    <>
      {showFooterCta && footerCtaData?.cta_link && (
        <FooterCta title={footerCtaData.title} description={footerCtaData.description} cta={footerCtaData.cta_link} />
      )}
      <SiteAreasCovered />
      <FooterSection>
        <Container maxWidth="xl">
          <div className="footer-top">
            <div className="footer-brand">
              <Link href="/" aria-label="Tree Scene home" className="footer-logo">
                <Image src="/logo.png" alt="Tree Scene" width={180} height={60} />
              </Link>
              <Typography component="p" className="brand-description">
                Professional tree care for Tauranga and surrounding areas.
              </Typography>
              {badges.length > 0 && (
                <div className="certifications" aria-label="Certifications">
                  {badges.map((item, index) => item.certification_image?.url && (
                    <Image key={index} src={item.certification_image.url} alt={item.alt || item.certification_image.alt || "Certification"} width={item.certification_image.width} height={item.certification_image.height} />
                  ))}
                </div>
              )}
            </div>
            <div className="newsletter-wrapper">
              <Typography component="h2" className="footer-heading">Get tips & tricks every month</Typography>
              <Typography component="p" className="newsletter-description">Tree care advice, straight to your inbox.</Typography>
              <NewsletterForm className="newsletter-form" formName="Newsletter Form" formType="newsletter-form" emailRoute="/api/newsletter-hubspot" emailTo="designer@treescene.co.nz" btnLabel="Subscribe" />
            </div>
          </div>

          <div className="footer-grid">
            <nav className="services-links" aria-label="Footer services">
              <Typography component="h2" className="footer-heading">Services</Typography>
              <ul className="service-list">
                {services.map((link) => <li key={link.url}><Link href={link.url}>{link.label}</Link></li>)}
              </ul>
            </nav>
            <nav className="information-links" aria-label="Footer information">
              <Typography component="h2" className="footer-heading">Information</Typography>
              <ul>
                {informationLinks.map((link) => <li key={link.url}><Link href={link.url}>{link.label}</Link></li>)}
              </ul>
            </nav>
            <div className="contact-wrapper">
              {contactInfo?.info?.length > 0 && <ContactInfo contactInfo={contactInfo} />}
              {socials.length > 0 && (
                <div className="social-wrapper">
                  <Typography component="h2" className="footer-heading">Follow us</Typography>
                  <div className="social-links">
                    {socials.map((social, index) => social.social_media_icon?.url && (
                      <a key={index} aria-label={social.social_media_name} href={social.link} target="_blank" rel="noopener noreferrer">
                        <Image src={social.social_media_icon.url} alt="" width={32} height={32} />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="footer-coverage"><Typography component="p">{coverageSummary}</Typography></div>
        </Container>
        <Copyright />
      </FooterSection>
    </>
  );
}

const FooterSection = styled.footer`
  padding-top: 56px;
  background: var(--light-surface-variant);
  color: var(--light-on-surface-variant);
  border-top: 1px solid var(--light-outline-variant);

  .footer-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 56px;
    padding-bottom: 40px;
    border-bottom: 1px solid var(--light-outline-variant);
  }

  .footer-brand { max-width: 360px; }
  .footer-logo { display: inline-flex; }
  .footer-logo img { display: block; max-width: 100%; height: auto; }
  .brand-description { margin-top: 16px; font-size: .95rem; line-height: 1.65; }
  .certifications { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: 20px; }
  .certifications img { width: auto; height: auto; max-width: 100px; max-height: 56px; object-fit: contain; }

  .footer-heading {
    color: var(--light-primary-fixed-dim);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: -.015em;
    margin-bottom: 16px;
  }

  .newsletter-wrapper { width: 100%; max-width: 500px; }
  .newsletter-wrapper .footer-heading { margin-bottom: 6px; }
  .newsletter-description { font-size: .9rem; line-height: 1.6; margin-bottom: 14px; }
  .newsletter-form { min-height: 0 !important; }
  .newsletter-form .form { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: start; gap: 12px; margin: 0 !important; }
  .newsletter-form .MuiFormControl-root { min-width: 0; }
  .newsletter-form .MuiOutlinedInput-root { background: var(--light-surface-container-lowest); border-radius: 8px; }
  .newsletter-form .MuiButton-root { margin: 0; min-height: 56px; }
  .newsletter-form .MuiAlert-root { grid-column: 1 / -1; }

  .footer-grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.25fr);
    gap: 48px;
    padding: 40px 0;
  }
  .footer-grid > * { min-width: 0; }
  .footer-grid nav ul { margin: 0; padding: 0; }
  .service-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 24px; }
  .footer-grid nav li { min-width: 0; }
  .footer-grid nav a { display: inline-block; padding: 6px 0; color: var(--light-on-surface-variant); font-size: .9rem; line-height: 1.55; overflow-wrap: break-word; }
  .footer-grid nav a:hover { color: var(--light-primary); text-decoration: underline; text-underline-offset: 4px; }

  .contact-wrapper { align-self: start; padding: 24px; border: 1px solid var(--light-outline-variant); border-radius: 16px; background: var(--light-surface-container-lowest); }
  .contact-wrapper .MuiTypography-h6 { font-size: 1rem; line-height: 1.4; font-weight: 600; color: var(--light-primary-fixed-dim); }
  .contact-wrapper .info-wrapper { align-items: center; gap: 10px; padding-block: 3px; }
  .contact-wrapper .info-wrapper .label { top: 0; min-width: 0; overflow-wrap: anywhere; font-size: .9rem; line-height: 1.6; }
  .social-wrapper { margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--light-outline-variant); }
  .social-wrapper .footer-heading { margin-bottom: 12px; }
  .social-links { display: flex; flex-wrap: wrap; gap: 10px; }
  .social-links a { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; }
  .social-links a:hover { background: var(--light-surface-container); }

  .footer-coverage { border-top: 1px solid var(--light-outline-variant); padding: 22px 0; }
  .footer-coverage p { max-width: 100ch; font-size: .8rem; line-height: 1.7; color: var(--light-on-surface-variant); }
  a:focus-visible { outline: 2px solid var(--light-primary); outline-offset: 4px; border-radius: 4px; }

  @media (max-width: 1100px) {
    .footer-grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); gap: 32px; }
    .contact-wrapper { grid-column: 1 / -1; }
    .footer-top { gap: 32px; }
  }
  @media (max-width: 750px) {
    padding-top: 40px;
    .footer-top { flex-direction: column; align-items: stretch; gap: 28px; padding-bottom: 32px; }
    .newsletter-wrapper { max-width: none; }
    .footer-grid { padding: 32px 0; gap: 28px; }
    .service-list { grid-template-columns: minmax(0, 1fr); }
    .footer-grid { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); }
  }
  @media (max-width: 450px) {
    .newsletter-form .form { grid-template-columns: minmax(0, 1fr); }
    .newsletter-form .MuiButton-root { width: 100%; min-height: 48px; }
    .contact-wrapper { padding: 20px; }
  }
`;
