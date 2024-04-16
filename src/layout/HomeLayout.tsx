'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { AboutDataType, HomeLayoutDataType, SettingDataType } from '../types/data/type'
import Site from '../class/Site'
import { AboutHomeSection, BannerSection, EventHomeSection, MentorHomeSection, ReportHomeSection, TimerSection, VideoHomeSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const HomeLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: ''
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);


    const site = new Site();
    const [dataState, setDataState] = useState<HomeLayoutDataType>({
        settings: {} as SettingDataType,
        setting_translates: [],
        banners: [],
        banner_translates: [],
        about: {} as AboutDataType,
        about_translates: [],
        events: [],
        event_translates: [],
        mentors: [],
        mentor_translates: [],
        gallery_images: [],
        gallery_videos: [],
        reports: [],
        report_translates: [],
        comments: [],
        comment_translates: [],
        partners: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: HomeLayoutDataType = await site.home();
            setDataState(prev => ({
                ...prev,
                settings: response.settings ?? {},
                setting_translates: response.setting_translates ?? [],
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                about: response.about ?? {},
                about_translates: response.about_translates ?? [],
                events: response.events ?? [],
                event_translates: response.event_translates ?? [],
                mentors: response.mentors ?? [],
                mentor_translates: response.mentor_translates ?? [],
                gallery_images: response.gallery_images ?? [],
                gallery_videos: response.gallery_videos ?? [],
                reports: response.reports ?? [],
                report_translates: response.report_translates ?? [],
                comments: response.comments ?? [],
                comment_translates: response.comment_translates ?? [],
                partners: response.partners ?? [],
            }));
            setLoading(false);
        }

        fetchData();
    }, [])

    return (
        <>
            {loading && (
                <div className="preloader">
                    <div className="preloader-icon"></div>
                </div>
            )}
            {dataState.banners.length > 0 && dataState.banner_translates.length > 0 && (
                <BannerSection
                    activeLocale={activeLocale}
                    className='home'
                    banners={dataState.banners}
                    banner_translates={dataState.banner_translates}
                />
            )}
            {dataState.settings.timer_date && (
                <TimerSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    settings={dataState.settings}
                />
            )}
            {dataState.about_translates.length > 0 && (
                <AboutHomeSection
                    about={dataState.about}
                    about_translates={dataState.about_translates}
                    activeLocale={activeLocale}
                />
            )}
            {dataState.events.length > 0 && dataState.event_translates.length > 0 && (
                <EventHomeSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    event_translates={dataState.event_translates}
                    events={dataState.events}
                />
            )}
            {dataState.mentors.length > 0 && dataState.mentor_translates.length > 0 && (
                <MentorHomeSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    mentors={dataState.mentors}
                    mentor_translates={dataState.mentor_translates}
                />
            )}
            {dataState.gallery_videos.length > 0 && (
                <VideoHomeSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    gallery_videos={dataState.gallery_videos}
                />
            )}
            {dataState.reports.length > 0 && dataState.report_translates.length > 0 && (
                <ReportHomeSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    reports={dataState.reports}
                    report_translates={dataState.report_translates}
                />
            )}
            {dataState.comments.length > 0 && dataState.comment_translates.length > 0 && (
                <div>comments</div>
            )}
            {dataState.partners.length > 0 && (
                <div>partners</div>
            )}
            {dataState.gallery_images.length > 0 && (
                <div>gallery_images</div>
            )}
        </>
    )
}

export default React.memo(HomeLayout)
