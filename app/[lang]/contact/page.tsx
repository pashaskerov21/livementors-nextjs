import { getTranslate } from "@/get-translate";
import Site from "@/src/class/Site";
import { MetaDataType } from "@/src/types/data/type";
import { LocaleType } from "@/src/types/general/type";
import { MetaRequestDataType } from "@/src/types/request/type";
import { Metadata } from "next";

const apiURL = process.env.API_URL;
const site = new Site();

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const data: MetaRequestDataType = {
            lang: lang,
            page: 6,
        }
        const response: MetaDataType = await site.meta(data);

        return {
            metadataBase: new URL(`${apiURL}`),
            title: response.title ?? 'Livementors',
            description: response.description ?? 'Livementors',
            keywords: response.keywords ?? 'Livementors',
            openGraph: {
                type: "website",
                title: response.title ?? 'Livementors',
                siteName: response.title ?? 'Livementors',
                description: response.description ?? 'Livementors',
            }
        }
    } catch {
        return {
            title: 'Livementors',
        };
    }
}


const Contact = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const dictionary = await getTranslate(lang);
        return (
            <>
            </>
        )
    } catch (error) {
        console.log(error);
        return (
            <></>
        )
    }
}

export default Contact