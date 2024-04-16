import { getTranslate } from '@/get-translate';
import { VideoLayout } from '@/src/layout';
import { LocaleType } from '@/src/types/general/type';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const dictionary = await getTranslate(lang);
        const title = `Livementors | ${dictionary['video_gallery']}`
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

const VideoGallery = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const dictionary = await getTranslate(lang);
        return (
            <>
                <VideoLayout
                    activeLocale={lang}
                    dictionary={dictionary}
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

export default VideoGallery
