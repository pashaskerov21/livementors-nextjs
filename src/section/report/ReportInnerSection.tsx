'use client'
import Site from '@/src/class/Site'
import { ReportInnerLayoutType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: ReportInnerLayoutType,
}

const ReportInnerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, dataState }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    const [activeTab, setActiveTab] = useState<"media" | "documents">('media');
    const changeTab = (key: "media" | "documents") => setActiveTab(key);
    return (
        <section className="report-inner-section">
            <div className="container">
                {dataState.report.banner_image && (
                    <div className="report-banner-image">
                        <img src={apiURL + dataState.report.banner_image} width={1400} height={350} alt='report-banner-image' />
                    </div>
                )}
                <div className="report-content">
                    <h1 className="title">{dataState.report_translate.title}</h1>
                    <div className="text" dangerouslySetInnerHTML={{ __html: dataState.report_translate.main_text ?? '' }}></div>
                </div>
                {(dataState.report_media.length > 0 || dataState.report_documents.length > 0) && (
                    <div className="report-navbar">
                        {dataState.report_media.length > 0 && (
                            <div className={`tab-button ${activeTab === 'media' ? 'active' : ''}`} onClick={() => changeTab('media')}>{dictionary['media']}</div>
                        )}
                        {dataState.report_documents.length > 0 && (
                            <div className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => changeTab('documents')}>{dictionary['documents']}</div>
                        )}
                    </div>
                )}
                {activeTab === 'media' && (
                    <div className="report-media-tab">
                        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 3, 1200: 4 }}>
                            <Masonry gutter='15px' columnsCount={2}>
                                {
                                    dataState.report_media.map((data) => (
                                        <React.Fragment key={data.id}>
                                            {
                                                data.type === 'video' && (
                                                    <div className="video-iframe">
                                                        <iframe src={data.video_url ?? ''} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                                    </div>
                                                )
                                            }
                                            {
                                                data.type === 'photo' && data.image && (
                                                    <div className="gallery-image">
                                                        <img src={apiURL + data.image} width={1000} height={1000} alt='' />
                                                        <div className="image-overlay">
                                                            <Link href={apiURL + data.image} data-fancybox='event-gallery' className='zoom-button'><FaMagnifyingGlass /></Link>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </Masonry>
                        </ResponsiveMasonry>
                    </div>
                )}
                {activeTab === 'documents' && (
                    <div className="report-documents-tab">
                        <div className="grid-container max-4">
                            {dataState.report_documents.map((data) => (
                                <div className="report-document-item" key={data.id}>
                                    {data.type === 'pdf' && data.pdf && (
                                        <>
                                            <iframe src={apiURL + data.pdf + '#page=1&view=FitV&toolbar=0&statusbar=0&messages=0&navpanes=0&scrollbar=0'} height={400}></iframe>
                                            <div className="document-overlay">
                                                <Link href={apiURL + data.pdf} data-fancybox='' className='zoom-button'><FaMagnifyingGlass /></Link>
                                            </div>
                                        </>
                                    )}
                                    {data.type === 'photo' && data.image && (
                                        <>
                                            <img src={apiURL + data.image} width={1000} height={1000} alt='report-document' />
                                            <div className="document-overlay">
                                                <Link href={apiURL + data.image} data-fancybox='' className='zoom-button'><FaMagnifyingGlass /></Link>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default React.memo(ReportInnerSection)
