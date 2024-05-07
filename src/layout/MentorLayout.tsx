'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { MentorLayoutDataType } from '../types/data/type'
import { BannerSection, MentorMainSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const MentorLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'mentors'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<MentorLayoutDataType>({
        mentors: [],
        mentor_translates: [],
        banners: [],
        banner_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: MentorLayoutDataType = await site.mentors();
            setDataState(prev => ({
                ...prev,
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                mentors: response.mentors ?? [],
                mentor_translates: response.mentor_translates ?? [],
            }));
            setLoading(false)
        }

        fetchData();
    }, []);
    return (
        <main className='primary-bg'>
            {loading && (
                <div className="preloader">
                    <div className="preloader-icon"></div>
                </div>
            )}
            {dataState.banners.length > 0 && dataState.banner_translates.length > 0 && (
                <BannerSection
                    activeLocale={activeLocale}
                    banners={dataState.banners}
                    banner_translates={dataState.banner_translates}
                />
            )}
            {dataState.mentors.length > 0 && dataState.mentor_translates.length > 0 && (
                <MentorMainSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    mentors={dataState.mentors}
                    mentor_translates={dataState.mentor_translates}
                />
            )}
        </main>
    )
}

export default React.memo(MentorLayout)
