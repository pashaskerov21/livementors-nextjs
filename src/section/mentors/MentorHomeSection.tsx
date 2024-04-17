'use client'
import Site from '@/src/class/Site'
import { PersonModal, SectionTitle } from '@/src/components'
import { MentorDataType, MentorTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    mentors: MentorDataType[],
    mentor_translates: MentorTranslateDataType[],
}

const MentorHomeSection: React.FC<SectionProps> = ({ activeLocale, dictionary, mentors, mentor_translates }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    const [activeData, setActiveData] = useState<MentorDataType | undefined>();
    const showModal = (data: MentorDataType) => {
        if (activeData && activeData.id === data.id) {
            setActiveData(undefined);
        } else {
            setActiveData(data);
        }
    }
    const closeModal = () => {
        setActiveData(undefined);
    }
    return (
        <section className="mentors-home-section">
            <div className="container">
                <SectionTitle
                    title={dictionary['mentors']}
                    subtitle={dictionary['mentor_subtext']}
                />
                <Swiper
                    className='mentor-swiper pagination-true'
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                        dynamicMainBullets: 5
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
                        1400: {
                            slidesPerView: 5,
                            spaceBetween: 20,
                        },
                    }}
                    modules={[Pagination]}
                >
                    {mentors.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div className="primary-card mentor" onClick={() => showModal(data)}>
                                {data.image && (
                                    <div className="card-image">
                                        <Image className='main-image' src={apiURL + data.image} width={2000} height={2000} priority={true} alt='card-image' />
                                        <div className="image-overlay">
                                            <Image className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                        </div>
                                    </div>
                                )}
                                <div className="card-body">
                                    <div className='card-title'>
                                        {site.getMentorTranslate(data.id, "title", activeLocale, mentor_translates)}
                                    </div>
                                    <div className="card-line"></div>
                                    <div className="card-subtitle">
                                        {site.getMentorTranslate(data.id, "subtitle", activeLocale, mentor_translates)}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href={`/${activeLocale}/mentors`} className='see-all-button'>{dictionary['see_all']}</Link>
            </div>
            {activeData && activeData.content_status === 1 &&
                <PersonModal
                    image={activeData.image}
                    title={site.getMentorTranslate(activeData.id, "title", activeLocale, mentor_translates)}
                    subtitle={site.getMentorTranslate(activeData.id, "subtitle", activeLocale, mentor_translates)}
                    text={site.getMentorTranslate(activeData.id, "text", activeLocale, mentor_translates)}
                    closeModal={closeModal}
                />}
        </section>
    )
}

export default React.memo(MentorHomeSection)
