import { getOptions, getSinglePostData, getAllPosts, getSingleServicePackage } from '@/utils/fetchData'
import Layout from '@/components/UI/Layout/Layout'
import OptimizedHero from '@/components/UI/Hero/OptimizedHero/OptimizedHero'
import TechLogos from '@/components/UI/TechLogos/TechLogos'
import USP from '@/components/UI/USP/USP'
import Header from '@/components/UI/Header/Header'
import Footer from '@/components/UI/Footer/Footer'
import ServicesCardsTemplate from '@/components/UI/Services/ServicesCardsTemplate'
import ContactHero from '@/components/UI/Hero/OptimizedHero/ContactHero'
import Gallery from '@/components/UI/Gallery/Gallery'
import BreadcrumbHero from '@/components/UI/Hero/BreadcrumbHero'


export async function generateMetadata(props, parent) {
    const params = await props.params;
    // read route params
    const slug = params.slug

    // fetch data
    const data = await getSinglePostData("gallery", "/wp-json/wp/v2/pages")

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

export default async function Contact() {

    const postData = await getSinglePostData("gallery", "/wp-json/wp/v2/pages")
    const options = await getOptions()
    if (!postData) {
        return {
            notFound: true,
        }
    }
    return (
        <>
            <Header />
            <main>
                <BreadcrumbHero title={postData[0]?.acf.hero_section.title} description={postData[0]?.acf.hero_section.description} showBreadcrumb={false} />
                <Gallery galleryData={postData[0]?.acf.gallery} />
                <TechLogos data={options.clients_logos} />
                <Layout sections={postData[0]?.acf?.sections} />
                <USP showTitle={true} statsArray={options.stats.items} cards={options.usp.items} title={options.usp.section_title} description={options.usp.section_description} />
            </main>
            <Footer footerCtaData={options.footer_cta} certifications={options.certifications} contactInfo={options.contact_info} socialData={options.social_links} />
        </>

    )
}
