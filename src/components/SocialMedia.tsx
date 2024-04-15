'use client'
import React from 'react'
import { SettingDataType } from '../types/data/type'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';


type SocialMediaProps = {
    settings: SettingDataType,
}

const SocialMedia: React.FC<SocialMediaProps> = ({ settings }) => {
    return (
        <div className='social-media'>
            {settings.facebook && <Link target='_blank' href={settings.facebook}><FaFacebookF /></Link>}
            {settings.linkedin && <Link target='_blank' href={settings.linkedin}><FaLinkedinIn /></Link>}
            {settings.instagram && <Link target='_blank' href={settings.instagram}><FaInstagram /></Link>}
            {settings.twitter && <Link target='_blank' href={settings.twitter}><FaXTwitter /></Link>}
            {settings.youtube && <Link target='_blank' href={settings.youtube}><FaYoutube /></Link>}
        </div>
    )
}

export default React.memo(SocialMedia)
