import { serviceAreas } from "@/utils/serviceAreas";
import Layout from '@/components/UI/Layout/Layout';
import Header from '@/components/UI/Header/Header';
import Footer from '@/components/UI/Footer/Footer';
import RelatedLinks from '@/components/UI/RelatedLinks/RelatedLinks';
import { getOptions } from '@/utils/fetchData';
import { sections, serviceTitle, serviceDescription, serviceImage, serviceSlug } from './content';

export const revalidate = 2592000;
const pageUrl = `https://treescene.co.nz/services/${serviceSlug}/`;
const title = 'Shelterbelt Topping & Removal Tauranga | Treescene NZ';
export const metadata = {
  title: { absolute: title },
  description: serviceDescription,
  alternates: { canonical: pageUrl },
  openGraph: { title, description: serviceDescription, url: pageUrl, images: [{ url: serviceImage, width: 1536, height: 1152, alt: 'Treescene grapple crane truck at work' }] },
  twitter: { card: 'summary_large_image', title, description: serviceDescription, images: [serviceImage] },
};

export default async function ShelterbeltPage() {
  const options = await getOptions();
  const pageSections = sections.map((section) => section.acf_fc_layout === 'usp' ? {
    ...section,
    title: options.usp?.section_title,
    description: options.usp?.section_description,
    items: options.usp?.items,
    stats: options.stats?.items,
  } : section);
  const schema = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Service', name: serviceTitle, description: serviceDescription, url: pageUrl, serviceType: 'Shelterbelt topping, height reduction and removal', provider: { '@type': 'LocalBusiness', name: 'Treescene NZ Ltd', url: 'https://treescene.co.nz', telephone: '021 242 0305' }, areaServed: serviceAreas },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://treescene.co.nz/' }, { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://treescene.co.nz/services/' }, { '@type': 'ListItem', position: 3, name: serviceTitle, item: pageUrl }] },
    ],
  };
  return <>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <Layout sections={pageSections} />
      <RelatedLinks pageId={serviceSlug} />
    </main>
    <Footer showFooterCta={false} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
  </>;
}
