'use client'
import Site from '@/src/class/Site'
import { AboutLayoutDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dataState: AboutLayoutDataType,
}

const AboutMainSection: React.FC<SectionProps> = ({ activeLocale, dataState }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className='about-main-section'>
            <div className="container">
                <div className="row about-texts">
                    {dataState.about_texts.length > 0 && dataState.about_texts.map((data) => (
                        <div className="col-12 col-lg-6" key={data.id}>
                            <h2 className='title'>
                                {site.getAboutTextTranslate(data.id, "title", activeLocale, dataState.about_text_translates)}
                            </h2>
                            <div className="text" dangerouslySetInnerHTML={{ __html: site.getAboutTextTranslate(data.id, "text", activeLocale, dataState.about_text_translates) }}></div>
                        </div>
                    ))}
                    {dataState.about_translates.length > 0 && (
                        <div className="col-12">
                            <div className="text" dangerouslySetInnerHTML={{ __html: site.getAboutTranslate(1, "main_text", activeLocale, dataState.about_translates) }}></div>
                        </div>
                    )}
                </div>
                {dataState.about_gallery.length > 0 && (
                    <div className="row about-gallery">
                        {dataState.about_gallery.map((data) => (
                            data.image && (
                                <div className="col-4" key={data.id}>
                                    <Link href={apiURL + data.image} data-fancybox='about-gallery' className='gallery-img'>
                                        <Image src={apiURL + data.image} width={1000} height={1000} priority={true} alt='gallery-img' />
                                    </Link>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default React.memo(AboutMainSection)
