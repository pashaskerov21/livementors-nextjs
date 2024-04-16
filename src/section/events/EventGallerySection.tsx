'use client'
import { SectionTitle } from '@/src/components'
import { EventGalleryDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    event_gallery: EventGalleryDataType[],
}

const EventGallerySection: React.FC<SectionProps> = ({ activeLocale, dictionary, event_gallery }) => {
    const apiURL = process.env.API_URL;
    return (
        <section className='event-gallery-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['photos']}
                />
                <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 3, 1200: 4 }}>
                    <Masonry gutter='15px' columnsCount={2}>
                        {
                            event_gallery.map((data) => (
                                data.image && (
                                    <div className="gallery-image" key={data.id}>
                                        <Image src={apiURL + data.image} width={1000} height={1000} alt='' priority={true} />
                                        <div className="image-overlay">
                                            <Link href={apiURL + data.image} data-fancybox='event-gallery' className='zoom-button'><FaMagnifyingGlass/></Link>
                                        </div>
                                    </div>
                                )
                            ))
                        }
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </section>
    )
}

export default React.memo(EventGallerySection)
