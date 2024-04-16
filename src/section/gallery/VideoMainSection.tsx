'use client'
import { SectionTitle } from '@/src/components'
import { GalleryDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import React from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    gallery_videos: GalleryDataType[],
}

const VideoMainSection: React.FC<SectionProps> = ({ activeLocale, dictionary, gallery_videos }) => {
    return (
        <section className='gallery-video-section video-main' style={{ backgroundImage: "url('/bg/video-bg.jpg')" }}>
            <div className="container">
                <SectionTitle
                    title={dictionary['video_gallery']}
                    className='white'
                />
                <div className="grid-container max-3">
                    {gallery_videos.map((data) => (
                        <div className="video-iframe">
                            <iframe src={data.video_url ?? ''} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default React.memo(VideoMainSection)
