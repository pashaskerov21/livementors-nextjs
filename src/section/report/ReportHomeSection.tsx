'use client'
import Site from '@/src/class/Site'
import { Preloader, SectionTitle } from '@/src/components'
import { ReportDataType, ReportTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    reports: ReportDataType[],
    report_translates: ReportTranslateDataType[],
}

const ReportHomeSection: React.FC<SectionProps> = ({ activeLocale, dictionary, reports, report_translates }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();

    const pathName = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const handleLinkClick = (key: string) => {
        if (key !== pathName) {
            setLoading(true);
        }
    }
    useEffect(() => {
        setLoading(false);
    }, [pathName]);
    return (
        <section className='report-home-section'>
            {/* {loading && <Preloader/>} */}
            <div className="container">
                <SectionTitle
                    title={dictionary['report']}
                    subtitle={dictionary['report_subtext']}
                />
                <Swiper
                    className='report-swiper pagination-true'
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination]}
                >
                    {reports.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div className="primary-card report">
                                {data.card_image && (
                                    <Link
                                        href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`}
                                        onClick={() => handleLinkClick(`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`)}
                                        className="card-image">
                                        <img className='main-image' src={apiURL + data.card_image} width={2000} height={2000} alt='card-image' />
                                        <div className="image-overlay">
                                            <img className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                        </div>
                                    </Link>
                                )}
                                <div className="card-body">
                                    <Link
                                        href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`}
                                        onClick={() => handleLinkClick(`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`)}
                                        className='card-title'>
                                        {site.getReportTranslate(data.id, "title", activeLocale, report_translates)}
                                    </Link>
                                    <div className="card-line"></div>
                                    <div className="card-text">
                                        {site.getReportTranslate(data.id, "card_text", activeLocale, report_translates)} <Link href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`}>{dictionary['etrafli']}</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href={`/${activeLocale}/report`} className='see-all-button'>{dictionary['see_all']}</Link>
            </div>
        </section>
    )
}

export default React.memo(ReportHomeSection)
