'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { PartnerLayoutDataType } from '../types/data/type'
import { BannerSection, PartnerSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const PartnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'partners'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<PartnerLayoutDataType>({
        partners: [],
        banners: [],
        banner_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: PartnerLayoutDataType = await site.partners();
            setDataState(prev => ({
                ...prev,
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                partners: response.partners ?? [],
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
            {dataState.partners && (
                <PartnerSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    partners={dataState.partners}
                />
            )}
        </>
    )
}

export default React.memo(PartnerLayout)
