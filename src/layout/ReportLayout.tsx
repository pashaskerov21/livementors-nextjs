'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { BannerSection, EventMainSection, ReportMainSection } from '../section'
import { ReportLayoutDataType } from '../types/data/type'
import { Preloader } from '../components'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const ReportLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: 'report'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);

    const site = new Site();
    const [dataState, setDataState] = useState<ReportLayoutDataType>({
        reports: [],
        report_translates: [],
        banners: [],
        banner_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: ReportLayoutDataType = await site.report();
            setDataState(prev => ({
                ...prev,
                banners: response.banners ?? [],
                banner_translates: response.banner_translates ?? [],
                reports: response.reports ?? [],
                report_translates: response.report_translates ?? [],
            }));
            setLoading(false)
        }

        fetchData();
    }, []);

    return (
        <main className={`primary-bg ${loading ? 'd-none' : ''}`}>
            {/* {loading && <Preloader />} */}
            {dataState.banners.length > 0 && dataState.banner_translates.length > 0 && (
                <BannerSection
                    activeLocale={activeLocale}
                    banners={dataState.banners}
                    banner_translates={dataState.banner_translates}
                />
            )}
            {dataState.reports && dataState.report_translates && (
                <ReportMainSection
                    activeLocale={activeLocale}
                    dictionary={dictionary}
                    reports={dataState.reports}
                    report_translates={dataState.report_translates}
                />
            )}
        </main>
    )
}

export default React.memo(ReportLayout)
