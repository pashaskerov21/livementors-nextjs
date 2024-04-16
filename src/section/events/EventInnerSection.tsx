'use client'
import { SectionTitle } from '@/src/components'
import { EventInnerLayoutType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import React from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: EventInnerLayoutType,
}

const EventInnerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, dataState, }) => {
    return (
        <section className='event-inner-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['report']}
                    subtitle={`${dataState.event_translate.title} - ${dataState.event_translate.subtitle}`}
                />
                <div className="event-video-iframe">
                    <iframe src={dataState.event.video_url ?? ''} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <div className="event-text" dangerouslySetInnerHTML={{__html: dataState.event_translate.text ?? ''}}></div>
            </div>
        </section>
    )
}

export default React.memo(EventInnerSection)
