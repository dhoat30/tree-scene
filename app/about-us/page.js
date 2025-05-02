import { getOptions, getSinglePostData, getAllPosts, getServiceJobs, getServiceClients } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'


export async function generateMetadata(props, parent) {
    const params = await props.params;
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("about-us", "/wp-json/wp/v2/pages")

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []
    if (data.length > 0) {
        const seoData = data[0].yoast_head_json
        return {
            title: seoData.title,
            description: seoData.description,
            metadataBase: new URL('https://treescene.co.nz'),
            openGraph: {
                title: seoData.title,
                description: seoData.description,
                url: 'https://treescene.co.nz',
                siteName: 'Epic Cleaning Tauranga',
                images: [
                    {
                        url: seoData?.og_image && seoData?.og_image[0]?.url,
                        width: 800,
                        height: 600,
                    }, {
                        url: seoData?.og_image && seoData?.og_image[0].url,
                        width: 1800,
                        height: 1600,
                    },

                ],
                type: 'website',
            },
        }
    }
}

export default async function Contact(props) {
    const params = await props.params;
    const slug = params.slug
    const postData = await getSinglePostData("about-us", "/wp-json/wp/v2/pages")
    const allPosts = await getAllPosts("wp-json/wp/v2/industrial-cleaning")
    const options = await getOptions()
    let  serviceJobs = await getServiceJobs() 
    const serviceClients = await getServiceClients() 
    serviceJobs = serviceJobs.map(job => {
        const client = serviceClients.find(c => c.uuid === job.company_uuid);
        return {
          ...job,
          client_name: client?.name.split(' ')[0] || 'Unknown',
        };
      });

    if (!postData) {
        return {
            notFound: true,
        }
    }

    return (
        <>
            <Header />
            <main className="mt-16">
                <OptimizedHero data={postData[0]?.acf?.hero_section} heroUSP={options.hero_usp} />
                <Layout sections={postData[0]?.acf?.sections} serviceJobs={serviceJobs}/>
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />

            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
