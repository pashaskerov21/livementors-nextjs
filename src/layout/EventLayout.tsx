'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { EventDataType, EventLayoutDataType, EventTranslateDataType } from '../types/data/type'
import { BannerSection, EventMainSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const EventLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'events'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<EventLayoutDataType>({
        events: [],
        event_translates: [],
        banners: [],
        banner_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: EventLayoutDataType = await site.events();
            setDataState(prev => ({
                ...prev,
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                events: response.events ?? [],
                event_translates: response.event_translates ?? [],
            }))
        }

        fetchData();
    }, []);

    return (
        <>
            {dataState.banners.length > 0 && dataState.banner_translates.length > 0 && (
                <BannerSection
                    activeLocale={activeLocale}
                    banners={dataState.banners}
                    banner_translates={dataState.banner_translates}
                />
            )}
            {dataState.events && dataState.event_translates && (
                <EventMainSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    event_translates={dataState.event_translates}
                    events={dataState.events}
                />
            )}
        </>
    )
}

export default React.memo(EventLayout)
