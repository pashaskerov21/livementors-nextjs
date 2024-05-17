'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { usePathname } from 'next/navigation'
import { RootLayoutDataType } from '../types/data/type'
import Link from 'next/link'
import Image from 'next/image'
import Site from '../class/Site'
import { Language, SocialMedia } from '../components'

type HeaderProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: RootLayoutDataType,
    fixed: boolean,
}

const Header: React.FC<HeaderProps> = ({ activeLocale, dictionary, dataState, fixed }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    const pathName = usePathname();
    const [menuShow, setMenuShow] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const toggleMenu = useCallback(() => {
        setMenuShow(prev => !prev);
    }, [setMenuShow]);

    const handleLinkClick = (key: string) => {
        if (key !== pathName) {
          setLoading(true);
        }
      }

    useEffect(() => {
        setMenuShow(false);
        setLoading(false);
    }, [pathName]);

    return (
        <header className={fixed ? 'fixed-top' : ''}>
            {loading && (
                <div className="preloader">
                    <div className="preloader-icon"></div>
                </div>
            )}
            <nav className="mobile-nav d-xl-none">
                <div className="container">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-start align-items-end">
                            <Link href={`/${activeLocale}`} className='header-logo' onClick={() => handleLinkClick(`/${activeLocale}`)}>
                                {
                                    dataState.settings.logo ?
                                        <img src={apiURL + dataState.settings.logo} width={500} height={60} alt='logo' /> :
                                        <img src="/logo/header-logo.png" width={500} height={60} alt='logo' />
                                }
                            </Link>
                        </div>
                        <div className="col-6 d-flex justify-content-end align-items-end gap-3">
                            <Language activeLocale={activeLocale} />
                            <div className={`menu-button ${menuShow ? 'active' : ''}`} onClick={toggleMenu}>
                                <div className="bar"></div>
                                <div className="bar"></div>
                                <div className="bar"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {menuShow && (
                <div className="mobile-menu">
                    <div className="container">
                        <div className="menu-links">
                            {dataState.menues.length > 0 && dataState.menues.map((data) => (
                                <Link key={data.id} href={data.status === 0 ? `/${activeLocale}/${data.slug}` : data.slug} className={pathName === `/${activeLocale}/${data.slug}` ? 'active' : ''} onClick={() => handleLinkClick(`/${activeLocale}/${data.slug}`)}>
                                    {site.getMenuTranslate(data.id, "title", activeLocale, dataState.menu_translates)}
                                </Link>
                            ))}
                        </div>
                        <SocialMedia settings={dataState.settings} />
                    </div>
                </div>
            )}
            <nav className="general-nav d-none d-xl-block">
                <div className="container">
                    <div className="row">
                        <div className="col-2 d-flex justify-content-start align-items-end">
                            <Link href={`/${activeLocale}`} className='header-logo' onClick={() => handleLinkClick(`/${activeLocale}`)}>
                                {
                                    dataState.settings.logo ?
                                        <img src={apiURL + dataState.settings.logo} width={500} height={60} alt='logo' /> :
                                        <img src="/logo/header-logo.png" width={500} height={60} alt='logo' />
                                }
                            </Link>
                        </div>
                        <div className="col-8 d-flex justify-content-center align-items-end">
                            <div className="nav-links">
                                {dataState.menues.length > 0 && dataState.menues.map((data) => (
                                    <Link key={data.id} href={data.status === 0 ? `/${activeLocale}/${data.slug}` : data.slug} className={pathName === `/${activeLocale}/${data.slug}` ? 'active' : ''} onClick={() => handleLinkClick(`/${activeLocale}/${data.slug}`)}>
                                        {site.getMenuTranslate(data.id, "title", activeLocale, dataState.menu_translates)}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-end gap-4">
                            <SocialMedia settings={dataState.settings} />
                            <Language activeLocale={activeLocale} />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(Header)
