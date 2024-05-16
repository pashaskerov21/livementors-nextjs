'use client'
import React from 'react'
import { LocaleType } from '../../types/general/type'
import { AboutDataType, AboutTranslateDataType } from '../../types/data/type'
import Site from '../../class/Site'
import Link from 'next/link'

type SectionProps = {
    activeLocale: LocaleType,
    about: AboutDataType,
    about_translates: AboutTranslateDataType[],
    dictionary: { [key: string]: string },
}

const AboutHomeSection2: React.FC<SectionProps> = ({ about, about_translates, activeLocale, dictionary }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className='about-home-section-2'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-4 col-xl-3">
                        {about.author_image && (
                            <div className="author-image">
                                <img src={apiURL + about.author_image} width={1000} height={1000} alt='author-image' />
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-7 col-lg-8 col-xl-9">
                        <div className="content">
                            <div className="text" dangerouslySetInnerHTML={{ __html: site.getAboutTranslate(1, "home_text", activeLocale, about_translates) }}></div>
                            <div className="content-bottom">
                                <Link className='about-button' href={`/${activeLocale}/about`}>{dictionary['about_us']}</Link>
                                <div className="bottom-right">
                                    <div className="author-title">
                                        {dictionary['hormetle']}, <br />
                                        {site.getAboutTranslate(1, "author_title", activeLocale, about_translates)}
                                    </div>
                                    {about.author_signature && (
                                        <div className="author-signature">
                                            <img src={apiURL + about.author_signature} width={300} height={150} alt='author-image' />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(AboutHomeSection2)
