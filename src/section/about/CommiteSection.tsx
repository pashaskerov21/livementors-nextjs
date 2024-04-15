'use client'
import Site from '@/src/class/Site'
import { PersonModal } from '@/src/components'
import { AboutLayoutDataType, CommiteMemberDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

type SectionProps = {
    activeLocale: LocaleType,
    dataState: AboutLayoutDataType,
}

const CommiteSection: React.FC<SectionProps> = ({ activeLocale, dataState }) => {
    const apiURL = process.env.API_URL;
    const site = new Site();

    const [activeData, setActiveData] = useState<CommiteMemberDataType | undefined>();
    const showModal = (data: CommiteMemberDataType) => {
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
        <section className='commite-section'>
            <div className="container">
                {
                    dataState.commites.map((data) => (
                        <div className="commite-content" key={data.id}>
                            <h2 className="title">
                                {site.getCommiteTranslate(data.id, "title", activeLocale, dataState.commite_translates)}
                            </h2>
                            <div className="text" dangerouslySetInnerHTML={{ __html: site.getCommiteTranslate(data.id, "text", activeLocale, dataState.commite_translates) }}></div>
                            <div className="grid-container max-5">
                                {dataState.commite_members.filter((member_data) => member_data.commite_id === data.id).map((member_data) => (
                                    <div className="primary-card commite-member" key={member_data.id} onClick={() => showModal(member_data)}>
                                        {
                                            member_data.image && (
                                                <div className="card-image">
                                                    <Image className='main-image' src={apiURL + member_data.image} width={2000} height={2000} priority={true} alt='card-image' />
                                                    <div className="image-overlay">
                                                        <Image className='overlay-icon' src='/icon/icon-large.png' width={60} height={60} alt='large-icon' />
                                                    </div>
                                                </div>
                                            )
                                        }
                                        <div className="card-body">
                                            <div className="card-title">
                                                {site.getCommiteMemberTranslate(member_data.id, "title", activeLocale, dataState.commite_member_translates)}
                                            </div>
                                            <div className="card-line"></div>
                                            <div className="card-subtitle">
                                                {site.getCommiteMemberTranslate(member_data.id, "sub_title", activeLocale, dataState.commite_member_translates)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))
                }
            </div>
            {activeData && activeData.content_status === 1 &&
                <PersonModal
                    image={activeData.image}
                    title={site.getCommiteMemberTranslate(activeData.id, "title", activeLocale, dataState.commite_member_translates)}
                    subtitle={site.getCommiteMemberTranslate(activeData.id, "sub_title", activeLocale, dataState.commite_member_translates)}
                    text={site.getCommiteMemberTranslate(activeData.id, "text", activeLocale, dataState.commite_member_translates)}
                    closeModal={closeModal}
                />}
        </section>
    )
}

export default React.memo(CommiteSection)
