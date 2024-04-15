'use client'
import React, { useEffect, useRef } from 'react'
import { LocaleType } from '../types/general/type'
import { BannerDataType, BannerTranslateDataType } from '../types/data/type'
import Site from '../class/Site';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';


type SectionProps = {
    activeLocale: LocaleType,
    className?: string,
    banners: BannerDataType[],
    banner_translates: BannerTranslateDataType[],
}

const BannerSection: React.FC<SectionProps> = ({ activeLocale, className, banner_translates, banners }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    const mySwiperRef = useRef(null);

    useEffect(() => {
        let videos = document.querySelectorAll<HTMLVideoElement>('video[muted][autoplay]');
        videos.forEach(async (video) => {
            try {
                await video.play();
            } catch (err) {
                video.controls = true;
            }
        });

    }, []);

    return (
        <section className={`banner-section ${className}`}>
            <Swiper
                ref={mySwiperRef}
                className='banner-swiper'
                loop={true}
                autoplay={{
                    delay: 10000,
                    stopOnLastSlide: true,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    dynamicMainBullets: 5
                }}
                modules={[Autoplay, Pagination]}
            >
                {
                    banners.map((data) => (
                        <SwiperSlide key={data.id}>
                            {
                                data.type === 'photo' && data.file && (
                                    <div className="banner-slide">
                                        <Image src={apiURL + data.file} width={2000} height={2000} priority={true} className='banner-image' alt='banner-image' />
                                        <div className="banner-content">
                                            <div className="container">
                                                <div className="content-inner">
                                                    <div className="content-title">
                                                        {site.getBannerTranslate(data.id, "title", activeLocale, banner_translates)}
                                                    </div>
                                                    <div className="content-text" dangerouslySetInnerHTML={{ __html: site.getBannerTranslate(data.id, "text", activeLocale, banner_translates) }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                data.type === 'video' && data.file && (
                                    <div className="banner-slide">
                                        <video loop muted autoPlay playsInline>
                                            <source src={apiURL + data.file} type="video/mp4" />
                                        </video>
                                    </div>
                                )
                            }
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default React.memo(BannerSection)
