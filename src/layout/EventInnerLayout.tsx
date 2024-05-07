'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { EventDataType, EventInnerLayoutType, EventTranslateDataType } from '../types/data/type'
import { EventGallerySection, EventInnerSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const EventInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);

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
    const [dataState, setDataState] = useState<EventInnerLayoutType>({
        event: {} as EventDataType,
        event_translate: {} as EventTranslateDataType,
        event_translates: [],
        event_gallery: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                lang: activeLocale,
                slug: slug,
            }
            const response: EventInnerLayoutType = await site.event_inner(data);
            setDataState(prev => ({
                ...prev,
                event: response.event ?? {},
                event_translate: response.event_translate ?? {},
                event_translates: response.event_translates ?? [],
                event_gallery: response.event_gallery ?? []
            }));
            setLoading(false);
        }

        fetchData();
    }, []);
    useEffect(() => {
        if (dataState.event_translates.length === i18n.locales.length) {
            const newLocaleSlugs: LocaleStateType[] = dataState.event_translates.map((data) => {
                return {
                    locale: data.lang,
                    slug: `events/${data.slug}`
                }
            });
            dispatch(updateLocaleSlug(newLocaleSlugs));
        }
    }, [dispatch, dataState.event_translates])
    return (
        <main>
            {dataState.event.id && dataState.event_translate.title && (
                <EventInnerSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    dataState={dataState}
                />
            )}
            {dataState.event_gallery.length > 0 && (
                <EventGallerySection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    event_gallery={dataState.event_gallery}
                />
            )}
        </main>
    )
}

export default React.memo(EventInnerLayout)
