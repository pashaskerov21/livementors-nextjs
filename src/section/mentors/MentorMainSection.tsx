'use client'
import Site from '@/src/class/Site'
import { PersonModal, SectionTitle } from '@/src/components'
import { MentorDataType, MentorTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import React, { useState } from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    mentors: MentorDataType[],
    mentor_translates: MentorTranslateDataType[],
}

const MentorMainSection: React.FC<SectionProps> = ({ activeLocale, dictionary, mentors, mentor_translates }) => {
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
        <section className='mentor-main-section'>
            <div className="container">
                <SectionTitle
                    title={dictionary['mentors']}
                    subtitle={dictionary['mentor_subtext']}
                />
                <div className="grid-container max-5">
                    {mentors.map((data) => (
                        <div className="primary-card mentor" key={data.id} onClick={() => showModal(data)}>
                            {data.image && (
                                <div className="card-image">
                                    <img className='main-image' src={apiURL + data.image} width={2000} height={2000} alt='card-image' />
                                    <div className="image-overlay">
                                        <img className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
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
                    ))}
                </div>
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

export default React.memo(MentorMainSection)
