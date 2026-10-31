import Header from '@/components/UI/Header/Header';
import Footer from '@/components/UI/Footer/Footer';
import Layout from '@/components/UI/Layout/Layout';
import { getOptions } from '@/utils/fetchData';
import { serviceAreas } from '@/utils/serviceAreas';

export function quoteMetadata(config) {
  const url = `https://treescene.co.nz/${config.slug}`;
  return {
    title: { absolute: config.seoTitle },
    description: config.seoDescription,
    alternates: { canonical: url },
    openGraph: { title: config.seoTitle, description: config.seoDescription, url, type: 'website', images: [{ url: config.image.url, alt: config.image.alt }] },
    twitter: { card: 'summary_large_image', title: config.seoTitle, description: config.seoDescription, images: [config.image.url] },
  };
}

export default async function ServiceQuotePage({ config }) {
  const options = await getOptions();
  const pageSections = [
    { ...config, acf_fc_layout: 'quote_request' },
    { acf_fc_layout: 'local_faq', section_title: 'Before you request a quote', section_description: 'A few helpful answers about planning your tree work. You can also call our team on 021 242 0305.', items: config.faqs },
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: config.form.serviceLabel, description: config.seoDescription, url: `https://treescene.co.nz/${config.slug}`, areaServed: serviceAreas, provider: { '@type': 'LocalBusiness', name: 'Treescene NZ Ltd', telephone: '021 242 0305', url: 'https://treescene.co.nz' } },
      { '@type': 'FAQPage', mainEntity: config.faqs.map((item) => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
    ],
  };
  return <>
    <Header />
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <Layout sections={pageSections} />
    </main>
    <Footer showFooterCta={false} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
  </>;
}
