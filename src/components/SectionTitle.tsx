import React from 'react'

type SectionTitleProps = {
    title: string,
    subtitle?: string,
    className?: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className }) => {
    return (
        <div className={`section-title ${className}`}>
            <h2 className='main-title'>{title}</h2>
            {subtitle && <h3 className='sub-title'>{subtitle}</h3>}
        </div>
    )
}

export default React.memo(SectionTitle)
