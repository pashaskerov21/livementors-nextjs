import { getTranslate } from "@/get-translate";
import Site from "@/src/class/Site";
import { RootLayout } from "@/src/layout";
import { MetaDataType } from "@/src/types/data/type";
import { LocaleType } from "@/src/types/general/type";
import { MetaRequestDataType } from "@/src/types/request/type";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";


const apiURL = process.env.API_URL;
const site = new Site();

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
  try {
    const data: MetaRequestDataType = {
      lang: lang,
      page: 0,
    }
    const response: MetaDataType = await site.meta(data);
    const favicon = response.favicon ? apiURL + response.favicon : '/logo/favicon.png';
    const headerLogo = response.header_logo ? apiURL + response.header_logo : '/logo/header-logo.png';
    const footerLogo = response.footer_logo ? apiURL + response.footer_logo : '/logo/footer-logo.png';

    return {
      metadataBase: new URL(`${apiURL}`),
      title: response.title ?? 'Livementors',
      description: response.description ?? 'Livementors',
      keywords: response.keywords ?? 'Livementors',
      authors: {
        name: response.author ?? '',
        url: response.author_url ?? '',
      },
      icons: {
        icon: favicon,
      },
      openGraph: {
        type: "website",
        title: response.title ?? 'Livementors',
        siteName: response.title ?? 'Livementors',
        description: response.description ?? 'Livementors',
        locale: lang === 'az' ? 'az_AZ' : lang === 'en' ? 'en_GB' : 'ru_RU',
        alternateLocale: lang === 'az' ? ['en_GB', 'ru_RU'] : lang === 'en' ? ['az_AZ', 'ru_RU'] : ['az_AZ', 'en_GB'],
        images: [headerLogo, footerLogo]
      }
    }
  } catch {
    return {
      title: 'Livementors',
      icons: {
        icon: '/logo/favicon.png',
      },
    };
  }
}


export default async function Root({ children, params: { lang } }: { children: React.ReactNode; params: { lang: LocaleType }; }) {
  try {
    unstable_noStore();
    const dictionary = await getTranslate(lang);
    return (
      <html lang={lang}>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        </head>
        <body>
          <RootLayout activeLocale={lang} dictionary={dictionary}>
            {children}
          </RootLayout>
        </body>
      </html>
    )

  } catch (error) {
    console.log(error)
  }
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}