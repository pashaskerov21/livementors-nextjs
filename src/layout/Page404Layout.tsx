'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'

type LayoutProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const Page404Layout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(true);
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: '404'
        }
    });
    useEffect(() => {
        dispatch(updateLocaleSlug(localeSlugs))
    }, [dispatch]);
    return (
        <section className="page-404-section">
            <div className="container">
                <div className="wrapper-404">
                    <div className="error-code">404</div>
                    <div className="error-text">{dictionary['page_not_found']}</div>
                    <Link href={`/${activeLocale}`}>{dictionary['home']}</Link>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Page404Layout)
