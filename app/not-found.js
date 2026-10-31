import { SiteAreasCovered } from "@/components/UI/Layout/Sections/AreasCovered/AreasCovered";
import NotFoundPage from "@/components/Pages/NotFoundPage/NotFoundPage";
import Header from "@/components/UI/Header/Header";

export default function Custom404() {
    return (
        <>
            <Header />
            <main>
                <NotFoundPage />
            </main>
      <SiteAreasCovered />
        </>
    )
}