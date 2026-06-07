export const revalidate = 2592000; // applies to both page and metadata

import {
  getOptions,
  getSinglePostData,
  getAllPosts,
  getServiceJobsWithClients,
} from "@/utils/fetchData";
import Layout from "@/components/UI/Layout/Layout";
import OptimizedHero from "@/components/UI/Hero/OptimizedHero/OptimizedHero";
import TechLogos from "@/components/UI/TechLogos/TechLogos";
import USP from "@/components/UI/USP/USP";
import Header from "@/components/UI/Header/Header";
import Footer from "@/components/UI/Footer/Footer";
import FaqAccordionSection from "@/components/UI/Layout/Sections/FaqAccordionSection";
import BlogsArchive from "@/components/Pages/BlogsPage/BlogsArchive";
import GoogleReviewsCarousel from "@/components/UI/GoogleReviews/GoogleReviewsCarousel";
import ServicesCardsTemplate from "@/components/UI/Services/ServicesCardsTemplate";
import reviewsData from "@/data/google-reviews.json";

export async function generateMetadata(props, parent) {
  const params = await props.params;
  // read route params
  const slug = params.slug;

  // fetch data
  const data = await getSinglePostData("home", "/wp-json/wp/v2/pages");

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  if (data.length > 0) {
    const seoData = data[0].yoast_head_json;
    return {
      title: seoData?.title,
      description: seoData?.description,
      metadataBase: new URL("https://treescene.co.nz"),
      alternates: {
        canonical: "https://treescene.co.nz",
      },
      openGraph: {
        title: seoData?.title,
        description: seoData?.description,
        url: "https://treescene.co.nz",
        siteName: "Tree Scene Tauranga",
        images: [
          {
            url: seoData?.og_image && seoData?.og_image[0]?.url,
            width: 800,
            height: 600,
          },
          {
            url: seoData?.og_image && seoData?.og_image[0].url,
            width: 1800,
            height: 1600,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoData?.title,
        description: seoData?.description,
        images: seoData?.og_image?.[0]?.url ? [seoData.og_image[0].url] : [],
      },
    };
  }
}

export default async function Page() {
  const [postData, options, allPosts, serviceJobs] = await Promise.all([
    getSinglePostData("home", "/wp-json/wp/v2/pages"),
    getOptions(),
    getAllPosts("wp-json/wp/v2/service"),
    getServiceJobsWithClients(),
  ]);

  if (!postData) {
    return {
      notFound: true,
    };
  }
  // google reviews data fetch

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Tree Scene Tauranga",
            url: "https://treescene.co.nz",
            telephone: options?.contact_info?.info?.find((i) =>
              i.url?.startsWith("tel:")
            )?.label,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Tauranga",
              addressRegion: "Bay of Plenty",
              addressCountry: "NZ",
            },
            areaServed: "Tauranga",
            sameAs: options?.social_links?.map((s) => s.link).filter(Boolean),
          }),
        }}
      />
      <Header />
      <main>
        <OptimizedHero
          data={postData[0]?.acf?.hero_section}
          heroUSP={options.hero_usp}
        />
        <TechLogos data={options.clients_logos} />
        <GoogleReviewsCarousel data={reviewsData} />
        <ServicesCardsTemplate
          title="All Services"
          description="We offer a wide range of services to cater to all your cleaning needs."
          cards={allPosts}
          archivePageSlug="services"
          showLimitedServices={true}
        />
        {/* <ServiceSelectorTabs residentialServicesData={residentialServices} commercialServicesData={commercialServices} industrialServicesData={industrialServices} title={postData[0]?.acf?.services_selector.title} description={postData[0]?.acf?.services_selector.description} /> */}
        <Layout
          sections={postData[0]?.acf?.sections}
          serviceJobs={serviceJobs}
        />
        <USP
          showTitle={true}
          statsArray={options.stats.items}
          cards={options.usp.items}
          title={options.usp.section_title}
          description={options.usp.section_description}
        />
        <FaqAccordionSection
          title={options.faq.section_title}
          description={options.faq.section_description}
          qaData={options.faq.items}
        />
        {/* <BlogsArchive blogsData={allBlogsData} sectionUI={true} show={3} /> */}
      </main>
      <Footer
        footerCtaData={options.footer_cta}
        certifications={options.certifications}
        contactInfo={options.contact_info}
        socialData={options.social_links}
      />
    </>
  );
}
