'use client'
import React, { useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import 'react-quill/dist/quill.snow.css';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/index.scss';
import { Fancybox } from '@fancyapps/ui';
import { RootLayoutDataType, SettingDataType } from '../types/data/type';
import Site from '../class/Site';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import { FaArrowUp, FaCommentDots, FaEnvelope, FaRegComments, FaWhatsapp } from 'react-icons/fa6';
import { FaTelegramPlane } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';

type LayoutProps = {
    children: React.ReactNode,
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
}

const RootLayout: React.FC<LayoutProps> = ({ activeLocale, children, dictionary }) => {
    useEffect(() => { Fancybox.bind("[data-fancybox]", {}) }, []);
    const site = new Site();
    const [loading, setLoading] = useState<boolean>(true);

    const [dataState, setDataState] = useState<RootLayoutDataType>({
        settings: {} as SettingDataType,
        setting_translates: [],
        menues: [],
        menu_translates: [],
        faqs: [],
        faq_translates: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            const response: RootLayoutDataType = await site.root();
            setDataState(prev => ({
                ...prev,
                settings: response.settings ?? {},
                setting_translates: response.setting_translates ?? [],
                menues: response.menues ?? [],
                menu_translates: response.menu_translates ?? [],
                faqs: response.faqs ?? [],
                faq_translates: response.faq_translates ?? [],
            }));
            setLoading(false);
        }

        fetchData();
    }, [])

    const [fixed, setFixed] = useState<boolean>(false);
    const [showToolbar, setShowToolbar] = useState<boolean>(false);
    useEffect(() => {
        window.addEventListener('scroll', function () {
            if (this.scrollY > 300) {
                setFixed(true);
            } else {
                setFixed(false)
            }
        });

        return () => {
            window.removeEventListener('scroll', () => { });
        }
    }, []);

    const toggleToolbar = () => setShowToolbar(prev => !prev);
    return (
        <Provider store={store}>
            {loading && (
                <div className="preloader">
                    <div className="preloader-icon"></div>
                </div>
            )}
            {fixed && <button className='scroll-button' onClick={() => window.scrollTo(0, 0)} type='button'><FaArrowUp /></button>}
            <div className={`social-toolbar ${fixed ? 'fixed-true' : ''}`}>
                {showToolbar && (
                    <div className="social-icons">
                        <Link target='_blank' href={dataState.settings.whatsapp ?? ''} className='icon wp'><FaWhatsapp /></Link>
                        <Link target='_blank' href={dataState.settings.email ? `mailto:${dataState.settings.email}` : ''} className='icon msg'><FaEnvelope /></Link>
                        {dataState.settings.telegram && <Link target='_blank' href={dataState.settings.telegram ?? ''} className='icon tg'><FaTelegramPlane /></Link>}
                    </div>
                )}
                <button className='open-toolbar-button' onClick={toggleToolbar}><FaCommentDots /></button>
            </div>
            <Header activeLocale={activeLocale} dictionary={dictionary} dataState={dataState} fixed={fixed} />
            {children}
            <Footer activeLocale={activeLocale} dictionary={dictionary} dataState={dataState} />
        </Provider>
    )
}

export default React.memo(RootLayout)
