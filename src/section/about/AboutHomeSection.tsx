'use client'
import React from 'react'
import { LocaleType } from '../../types/general/type'
import { AboutDataType, AboutTranslateDataType } from '../../types/data/type'
import Site from '../../class/Site'

type SectionProps = {
    activeLocale: LocaleType,
    about: AboutDataType,
    about_translates: AboutTranslateDataType[],
}

const AboutHomeSection: React.FC<SectionProps> = ({ about, about_translates, activeLocale, }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className='about-home-section'>
            <div className="container">
                <div className="text" dangerouslySetInnerHTML={{ __html: site.getAboutTranslate(1, "home_text", activeLocale, about_translates) }}></div>
                <div className="author-row">
                    {about.author_image && (
                        <div className="author-image">
                            <img src={apiURL + about.author_image} width={80} height={80} alt='author-image' />
                        </div>
                    )}
                    <div className="author-info">
                        <div className="author-title">
                            {site.getAboutTranslate(1, "author_title", activeLocale, about_translates)}
                        </div>
                        <div className="author-subtitle">
                            {site.getAboutTranslate(1, "author_sub_title", activeLocale, about_translates)}
                        </div>
                    </div>
                    {about.author_signature && (
                        <div className="author-signature">
                            <img src={apiURL + about.author_signature} width={300} height={150} alt='author-image' />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default React.memo(AboutHomeSection)
