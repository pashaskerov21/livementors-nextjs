'use client'
import Site from '@/src/class/Site'
import { SectionTitle } from '@/src/components'
import { ReportDataType, ReportTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    reports: ReportDataType[],
    report_translates: ReportTranslateDataType[],
}

const ReportMainSection: React.FC<SectionProps> = ({ activeLocale, dictionary, reports, report_translates }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className='report-main-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['report']}
                    subtitle={dictionary['report_subtext']}
                />
                <div className="grid-container max-4">
                    {reports.map((data) => (
                        <div className="primary-card report" key={data.id}>
                            {data.card_image && (
                                <Link href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`} className="card-image">
                                    <Image className='main-image' src={apiURL + data.card_image} width={2000} height={2000} priority={true} alt='card-image' />
                                    <div className="image-overlay">
                                        <Image className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                    </div>
                                </Link>
                            )}
                            <div className="card-body">
                                <Link href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`} className='card-title'>
                                    {site.getReportTranslate(data.id, "title", activeLocale, report_translates)}
                                </Link>
                                <div className="card-line"></div>
                                <div className="card-text">
                                    {site.getReportTranslate(data.id, "card_text", activeLocale, report_translates)} <Link href={`/${activeLocale}/report/${site.getReportTranslate(data.id, "slug", activeLocale, report_translates)}`}>{dictionary['etrafli']}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(ReportMainSection)
