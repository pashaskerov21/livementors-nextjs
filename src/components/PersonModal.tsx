'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import Image from 'next/image'
import { FaXmark } from 'react-icons/fa6'

type ModalProps = {
    image: string | null,
    title: string | null,
    subtitle?: string | null,
    text: string | null,
    closeModal: () => void,
}

const PersonModal: React.FC<ModalProps> = ({ image, title, subtitle, text, closeModal }) => {
    const apiURL = process.env.API_URL;
    return (
        <>
            <div className="modal_backdrop" onClick={closeModal}></div>
            <div className="person-modal">
                <div className="modal-inner">
                    <div className="close-button" onClick={closeModal}><FaXmark/></div>
                    <div className="row">
                        {image && (
                            <div className="col-12 col-lg-4">
                                <div className="image">
                                    <Image src={apiURL + image} width={1000} height={1000} alt='' />
                                </div>
                            </div>
                        )}
                        <div className={`col-12 ${image && 'col-lg-8'}`}>
                            <div className="modal-content">
                                <h3 className="title">{title}</h3>
                                {subtitle && <h6 className="subtitle">{subtitle}</h6>}
                                <div className="text" dangerouslySetInnerHTML={{ __html: text ?? '' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(PersonModal)
