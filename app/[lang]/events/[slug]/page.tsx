import { getTranslate } from "@/get-translate";
import Site from "@/src/class/Site";
import { EventInnerLayout } from "@/src/layout";
import { MetaDataType } from "@/src/types/data/type";
import { LocaleType } from "@/src/types/general/type";
import { MetaRequestDataType } from "@/src/types/request/type";
import { Metadata } from "next";

const apiURL = process.env.API_URL;
const site = new Site();

export async function generateMetadata({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }): Promise<Metadata> {
    try {
        const data: MetaRequestDataType = {
            lang: lang,
            page: 2,
            parent: "events",
            slug: slug,
        }
        const response: MetaDataType = await site.meta(data);

        return {
            metadataBase: new URL(`${apiURL}`),
            title: response.title ? `Livementors | ${response.title}` : 'Livementors',
            description: response.description ?? 'Livementors',
            keywords: response.keywords ?? 'Livementors',
            openGraph: {
                type: "website",
                title: response.title ? `Livementors | ${response.title}` : 'Livementors',
                siteName: response.title ? `Livementors | ${response.title}` : 'Livementors',
                description: response.description ?? 'Livementors',
            }
        }
    } catch {
        return {
            title: 'Livementors',
        };
    }
}


const EventInner = async ({ params: { lang, slug } }: { params: { lang: LocaleType, slug: string } }) => {
    try {
        const dictionary = await getTranslate(lang);
        return (
            <>
                <EventInnerLayout
                    activeLocale={lang}
                    dictionary={dictionary}
                    slug={slug}
                />
            </>
        )
    } catch (error) {
        console.log(error);
        return (
            <></>
        )
    }
}

export default EventInner