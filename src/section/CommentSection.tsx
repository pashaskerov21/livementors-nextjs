'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import { CommentDataType, CommentTranslateDataType } from '../types/data/type'
import Site from '../class/Site'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

type SectionProps = {
    activeLocale: LocaleType,
    comments: CommentDataType[],
    comment_translates: CommentTranslateDataType[],
}

const CommentSection: React.FC<SectionProps> = ({ activeLocale, comments, comment_translates }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();
    return (
        <section className="comment-section">
            <div className="row">
                <div className="col-12 col-lg-6 d-none d-lg-block" style={{ backgroundImage: "url('/bg/comment-bg-2.jpg')" }}></div>
                <div className="col-12 col-lg-6" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url('/bg/comment-bg-1.png')" }}>
                    <Swiper
                        className='comment-swiper pagination-true'
                        loop={true}
                        autoplay={{
                            delay: 10000,
                            stopOnLastSlide: true,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                    >
                        {comments.map((data) => (
                            <SwiperSlide key={data.id}>
                                <div className="comment-card">
                                    {data.image && (
                                        <Link href={apiURL + data.image} className="comment-image" data-fancybox=''>
                                            <img src={apiURL + data.image} width={100} height={100} alt='' />
                                        </Link>
                                    )}
                                    <div className="comment-body">
                                        <div className="comment-title">{site.getCommentTranslate(data.id, "title", activeLocale, comment_translates)}</div>
                                        <div className="comment-text" dangerouslySetInnerHTML={{ __html: site.getCommentTranslate(data.id, "text", activeLocale, comment_translates) }}></div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default React.memo(CommentSection)
