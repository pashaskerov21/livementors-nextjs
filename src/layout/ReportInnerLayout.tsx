'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { ReportInnerLayoutType, ReportDataType, ReportTranslateDataType } from '../types/data/type'
import { ReportInnerSection } from '../section'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    slug: string,
}

const ReportInnerLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary, slug }) => {
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
    const [dataState, setDataState] = useState<ReportInnerLayoutType>({
        report: {} as ReportDataType,
        report_translate: {} as ReportTranslateDataType,
        report_translates: [],
        report_media: [],
        report_documents: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                lang: activeLocale,
                slug: slug,
            }
            const response: ReportInnerLayoutType = await site.report_inner(data);
            setDataState(prev => ({
                ...prev,
                report: response.report ?? {},
                report_translate: response.report_translate ?? {},
                report_translates: response.report_translates ?? [],
                report_media: response.report_media ?? [],
                report_documents: response.report_documents ?? [],
            }));
            setLoading(false)
        }

        fetchData();
    }, []);
    useEffect(() => {
        if(dataState.report_translates.length === i18n.locales.length){
            const newLocaleSlugs: LocaleStateType[] = dataState.report_translates.map((data) => {
                return {
                    locale: data.lang,
                    slug: `report/${data.slug}`
                }
            });
            dispatch(updateLocaleSlug(newLocaleSlugs));
        }
    }, [dataState.report_translates])
    return (
        <>
            <ReportInnerSection
                activeLocale={activeLocale}
                dictionary={dictionary}
                dataState={dataState}
            />
        </>
    )
}

export default React.memo(ReportInnerLayout)
