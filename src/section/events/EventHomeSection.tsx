'use client'
import Site from '@/src/class/Site'
import { Preloader, SectionTitle } from '@/src/components'
import { EventDataType, EventTranslateDataType } from '@/src/types/data/type'
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
    events: EventDataType[],
    event_translates: EventTranslateDataType[],
}

const EventHomeSection: React.FC<SectionProps> = ({ activeLocale, dictionary, events, event_translates, }) => {
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
        <section className='event-home-section' style={{ backgroundImage: "url('/bg/event-bg.png')" }}>
            {loading && <Preloader/>}
            <div className="container">
                <SectionTitle
                    title={dictionary['events']}
                    subtitle={dictionary['event_subtext']}
                    className="white" />
                <Swiper
                    className='event-swiper pagination-true'
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 3
                    }}
                    breakpoints={{
                        992: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination]}
                >
                    {events.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div className="primary-card event">
                                {data.image && (
                                    <Link
                                        href={`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`}
                                        onClick={() => handleLinkClick(`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`)}
                                        className="card-image">
                                        <img className='main-image' src={apiURL + data.image} width={2000} height={2000} alt='card-image' />
                                        <div className="image-overlay">
                                            <img className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                        </div>
                                    </Link>
                                )}
                                <div className="card-body">
                                    <Link
                                        href={`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`}
                                        onClick={() => handleLinkClick(`/${activeLocale}/events/${site.getEventTranslate(data.id, "slug", activeLocale, event_translates)}`)}
                                        className='card-title'>
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
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href={`/${activeLocale}/events`} className='see-all-button white'>{dictionary['see_all']}</Link>
            </div>
        </section>
    )
}

export default React.memo(EventHomeSection)
