"use client";
import React from "react";
import ZigZagCardsSection from "./Sections/ZigZagCardsSection";
import RowSection from "./Sections/RowSection";
import ServicesSection from "./Sections/ServicesSection";
import ProcessSection from "./Sections/ProcessSection";
import ProjectsSection from "./Sections/ProjectsSection";
import ServiceTabs from "./Sections/ServiceTabs";
import Packages from "./Sections/Packages";
import FaqAccordionSection from "./Sections/FaqAccordionSection";
import ServiceChecklist from "./Sections/ServiceChecklist";
import dynamic from "next/dynamic";
import HeroSectionColumns from "./Sections/HeroSection/HeroSectionColumns";
import HeroSectionRows from "./Sections/HeroSection/HeroSectionRows";
import styles from "./Layout.module.scss";
import RegularProcess from "./Sections/Process/RegularProcess";
import EmpathySection from "./Sections/EmpathySection/EmpathySection";
import SolutionSection from "./Sections/SolutionSection/SolutionSection";
import TestimonialSection from "./Sections/TestimonialSection/TestimonialSection";
import FooterCta from "../CTA/FooterCta";
const JobsMap = dynamic(() => import("./Sections/JobsMap/JobsMap"), {
  ssr: false, // <-- disables server-side rendering for this component
});

export default function Layout({ sections, projectsData, serviceJobs }) {
  console.log(sections);
  if (!sections) return null;
  const sectionsJSX = sections.map((section, index) => {
    if (section.acf_fc_layout === "zigzag_cards") {
      return (
        <ZigZagCardsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "row") {
      return (
        <RowSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          imageAlignment={section.image_alignment}
          image={section.image}
          ctaGroup={section.cta_group}
          bulletPoints={section.bullet_points}
          showBeforeAfterImages={section.show_before_after_images}
          beforeImage={
            section.show_before_after_images &&
            section.before_after_images.before_image
          }
          afterImage={
            section.show_before_after_images &&
            section.before_after_images.after_image
          }
        />
      );
    }
    if (section.acf_fc_layout === "services") {
      return (
        <ServicesSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.card}
          sectionCtaGroup={section.cta_group}
        />
      );
    }
    if (section.acf_fc_layout === "process") {
      return (
        <ProcessSection
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }
    if (section.acf_fc_layout === "new_process") {
      return (
        <RegularProcess
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
          image={section.image}
        />
      );
    }
    if (section.acf_fc_layout === "projects") {
      return (
        <ProjectsSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          cards={section.select_projects}
          projectsData={projectsData}
        />
      );
    }

    if (section.acf_fc_layout === "services_tab") {
      return (
        <ServiceTabs
          key={index}
          title={section.title}
          description={section.description}
          cards={section.cards}
        />
      );
    }

    if (section.acf_fc_layout === "packages") {
      return (
        <Packages
          key={index}
          serviceName={section.service_name}
          title={section.title}
          packagesArray={section.package}
          termsAndConditions={section.terms_conditions}
        />
      );
    }
    if (section.acf_fc_layout === "local_faq") {
      return (
        <FaqAccordionSection
          key={index}
          title={section.section_title}
          description={section.section_description}
          qaData={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "service_checklist") {
      return (
        <ServiceChecklist
          key={index}
          title={section.title}
          description={section.description}
          cards={section.items}
        />
      );
    }
    if (section.acf_fc_layout === "show_jobs_map" && serviceJobs) {
      return (
        <section
          key={index}
          className={`${styles.jobs_section} flex align-center`}
        >
          <JobsMap jobs={serviceJobs} />
        </section>
      );
    }

    if (section.acf_fc_layout === "hero_section") {
      let graphicData;
      if (section.graphic_type === "new_graphic_type") {
        graphicData = section.new_graphic_type;
      }
      if (section.graphic_type === "image") {
        graphicData = section.image;
      }
      if (section.graphic_type === "youtube_video") {
        graphicData = section.youtube_video_group;
      }

      if (section.layout === "columns") {
        return (
          <HeroSectionColumns
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            ctaArr={section.cta_array}
            graphicType={section.graphic_type}
            graphicData={graphicData}
            uspData={section.usp}
          />
        );
      }
      if (section.layout === "rows") {
        return (
          <HeroSectionRows
            key={index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            ctaArr={section.cta_array}
            graphicType={section.graphic_type}
            graphicData={graphicData}
            uspData={section.usp}
            ctaMicroCopy={section.cta_microcopy}
          />
        );
      }
    }

    if (section.acf_fc_layout === "empathy_section") {
      return (
        <EmpathySection
          key={index}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "solution_section") {
      return (
        <SolutionSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          items={section.items}
        />
      );
    }

    if (section.acf_fc_layout === "testimonials") {
      return (
        <TestimonialSection
          key={index}
          subtitle={section.subtitle}
          title={section.title}
          description={section.description}
          ctaArray={section.cta_array}
          statsArray={section.stats}
          testimonialsArray={section.testimonials}
          clientLogosArray={section.client_logos}
        />
      );
    }

    if (section.acf_fc_layout === "cta_section") {
      return (
        <FooterCta
          key={index}
          title={section.title}
          description={section.description}
          cta={
            section.cta && {
              url: section.cta[0].link.url,
              title: section.cta[0].link.title,
            }
          }
          image={section.image}
          lightBackground={section.light_background}
        />
      );
    }
  });

  return <div>{sectionsJSX} </div>;
}
