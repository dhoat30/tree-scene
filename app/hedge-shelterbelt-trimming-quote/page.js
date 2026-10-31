import ServiceQuotePage, { quoteMetadata } from '@/components/Pages/ServiceQuotePage/ServiceQuotePage';
import { quotePages } from '@/utils/serviceQuotePages';

export const revalidate = 2592000;
export const metadata = quoteMetadata(quotePages.hedgeShelterbelt);

export default function Page() {
  return <ServiceQuotePage config={quotePages.hedgeShelterbelt} />;
}
