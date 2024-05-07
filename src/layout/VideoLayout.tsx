'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { GalleryDataType, VideoLayoutDataType } from '../types/data/type'
import Site from '../class/Site'
import { VideoMainSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const VideoLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'video-gallery'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<VideoLayoutDataType>({
        gallery_videos: []
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: VideoLayoutDataType = await site.videos();
            setDataState(prev => ({
                ...prev,
                gallery_videos: response.gallery_videos ?? [],
            }));
            setLoading(false)
        }

        fetchData();
    }, []);
    return (
        <main>
            {dataState.gallery_videos.length > 0 && (
                <VideoMainSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    gallery_videos={dataState.gallery_videos}
                />
            )}
        </main>
    )
}

export default React.memo(VideoLayout)
