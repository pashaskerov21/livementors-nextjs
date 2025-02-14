'use client'
import Site from '@/src/class/Site'
import {AboutLayoutDataType, AboutTranslateDataType} from '@/src/types/data/type'
import {LocaleType} from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'

type SectionProps = {
    activeLocale: LocaleType,
    dataState: AboutLayoutDataType,
    about_translates: AboutTranslateDataType[]
}

const AboutMainSection: React.FC<SectionProps> = ({activeLocale, dataState, about_translates}) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    console.log(dataState);
    return (
        <section className='about-main-section'>
            <div className="container">
                <div className="row about-texts">
                    {dataState.about_texts.length > 0 && dataState.about_texts.map((data) => (
                        <div className="col-12 col-lg-6" key={data.id}>
                            <h2 className='title'>
                                {site.getAboutTextTranslate(data.id, "title", activeLocale, dataState.about_text_translates)}
                            </h2>
                            <div className="text"
                                 dangerouslySetInnerHTML={{__html: site.getAboutTextTranslate(data.id, "text", activeLocale, dataState.about_text_translates)}}></div>
                        </div>
                    ))}
                    {dataState.about_translates.length > 0 && (
                        <div className="col-12">
                            <div className="text"
                                 dangerouslySetInnerHTML={{__html: site.getAboutTranslate(1, "main_text", activeLocale, dataState.about_translates)}}></div>
                        </div>
                    )}
                </div>
                {dataState.about_gallery.length > 0 && (
                    <div className="row about-gallery">
                        {dataState.about_gallery.map((data) => (
                            data.image && (
                                <>
                                    <div className="col-12 col-lg-3 mb-4 mb-lg-0" key={data.id}>
                                        <Link href={apiURL + data.image} data-fancybox='about-gallery' className='gallery-img'>
                                            <img src={apiURL + data.image} width={1000} height={1000} alt='gallery-img object-fit-cover'/>
                                            <div className="image-overlay">
                                                <Link href={apiURL + data.image} data-fancybox='' className='zoom-button'><FaMagnifyingGlass/></Link>
                                            </div>
                                        </Link>
                                    </div>
                                    <div
                                        className="col-12 col-lg-8"
                                        dangerouslySetInnerHTML={{ __html: site.getAboutTranslate(1, "home_text", activeLocale, about_translates) }}
                                    ></div>
                                </>
                            )
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default React.memo(AboutMainSection)
