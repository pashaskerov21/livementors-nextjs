'use client'
import { GalleryDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Link from 'next/link'
import React from 'react'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    gallery_videos: GalleryDataType[],
}

const VideoHomeSection: React.FC<SectionProps> = ({ activeLocale, dictionary, gallery_videos }) => {
    return (
        <section className='gallery-video-section' style={{ backgroundImage: "url('/bg/video-bg.jpg')" }}>
            <div className="container">
            <Swiper
                    className='video-gallery-swiper pagination-true'
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
                    {gallery_videos.map((data) => (
                        <SwiperSlide key={data.id}>
                            <div className="video-iframe">
                                <iframe src={data.video_url ?? ''}></iframe>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Link href={`/${activeLocale}/video-gallery`} className='see-all-button white'>{dictionary['see_all']}</Link>
            </div>
        </section>
    )
}

export default React.memo(VideoHomeSection)
