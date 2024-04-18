'use client'
import React from 'react'
import { PartnerDataType } from '../types/data/type'
import { LocaleType } from '../types/general/type'
import { SectionTitle } from '../components'
import Link from 'next/link'
import Image from 'next/image'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    partners: PartnerDataType[],
}

const PartnerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, partners }) => {
    const apiURL = process.env.API_URL;
    return (
        <section className='partner-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['partners']}
                />
                <div className="partner-wrapper">
                    {partners.map((data) => (
                        data.image && (
                            <Link target='_blank' href={data.url ?? `/${activeLocale}`} key={data.id} className='partner-logo'>
                                <img src={apiURL + data.image} width={220} height={100} alt='partner-logo' />
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(PartnerSection)
