import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types/general/type';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const dictionary = await getTranslate(lang);
        const title = `Livementors | ${dictionary['page_not_found']}`
        return {
            title: title
        };
    } catch (error) {
        console.log(error)
        return {
            title: 'Livementors'
        };
    }
}

const Page404 = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const dictionary = await getTranslate(lang);
        return (
            // <Page404Layout
            //   activeLocale={lang}
            //   dictionary={dictionary}
            // />
            <>404</>
        )
    } catch (error) {
        console.log(error);
        return (
            <></>
        )
    }
}

export default Page404
