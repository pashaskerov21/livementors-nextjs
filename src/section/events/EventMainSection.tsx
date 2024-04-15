'use client'
import Site from '@/src/class/Site'
import { SectionTitle } from '@/src/components'
import { EventDataType, EventTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    events: EventDataType[],
    event_translates: EventTranslateDataType[],
}

const EventMainSection: React.FC<SectionProps> = ({ activeLocale, dictionary, events, event_translates, }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className='event-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['events']}
                    subtitle={dictionary['event_subtext']}
                    />
                <div className="grid-container max-3">
                    {events.map((data) => (
                        <div className="primary-card event" key={data.id}>
                            {data.image && (
                                <Link href={`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`} className="card-image">
                                    <Image className='main-image' src={apiURL + data.image} width={2000} height={2000} priority={true} alt='card-image' />
                                    <div className="image-overlay">
                                        <Image className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                    </div>
                                </Link>
                            )}
                            <div className="card-body">
                                <Link href={`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`} className='card-title'>
                                    {site.getEventTranslate(data.id, "title", activeLocale, event_translates)}
                                </Link>
                                <div className="card-subtitle">
                                    {site.getEventTranslate(data.id, "subtitle", activeLocale, event_translates)}
                                </div>
                                <div className="card-line"></div>
                                <div className="card-date">
                                    {site.getEventTranslate(data.id, "date", activeLocale, event_translates)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(EventMainSection)
