'use client'
import { GalleryDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    gallery_images: GalleryDataType[],
}

const ImageHomeSection: React.FC<SectionProps> = ({ activeLocale, dictionary, gallery_images }) => {
    const apiURL = process.env.API_URL;
    return (
        <section className='gallery-images-section'>
            <Swiper
                loop={true}
                slidesPerView={1}
                speed={2000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                breakpoints={{
                    576: {
                        slidesPerView: 2,
                    },
                    992: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                    1400: {
                        slidesPerView: 5,
                    },
                }}
                modules={[Autoplay]}
            >
                {gallery_images.map((data) => (
                    <SwiperSlide key={data.id}>
                        {data.type === 'image' && data.image && (
                            <div className="gallery-image">
                                <img src={apiURL + data.image} width={1000} height={1000} alt='gallery_image' />
                                <div className="image-overlay">
                                    <Link href={apiURL + data.image} data-fancybox='event-gallery' className='zoom-button'><FaMagnifyingGlass /></Link>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
                {gallery_images.map((data) => (
                    <SwiperSlide key={data.id}>
                        {data.type === 'image' && data.image && (
                            <div className="gallery-image">
                                <img src={apiURL + data.image} width={1000} height={1000} alt='gallery_image' />
                                <div className="image-overlay">
                                    <Link href={apiURL + data.image} data-fancybox='' className='zoom-button'><FaMagnifyingGlass /></Link>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default React.memo(ImageHomeSection)
