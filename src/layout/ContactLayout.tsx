'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { ContactLayoutDataType, SettingDataType } from '../types/data/type'
import { BannerSection, ContactSection, EventMainSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ContactLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'contact'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<ContactLayoutDataType>({
        settings: {} as SettingDataType,
        setting_translates: [],
        banners: [],
        banner_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: ContactLayoutDataType = await site.contact();
            setDataState(prev => ({
                ...prev,
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                settings: response.settings ?? {},
                setting_translates: response.setting_translates ?? []
            }));
            setLoading(false)
        }

        fetchData();
    }, []);

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
                    banners={dataState.banners}
                    banner_translates={dataState.banner_translates}
                />
            )}
            <ContactSection
                activeLocale={activeLocale}
                dictionary={dictionary}
                dataState={dataState}
            />
        </>
    )
}

export default React.memo(ContactLayout)
