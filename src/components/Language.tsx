import React from 'react'
import { LocaleStateType, LocaleType, ReduxRootStateType } from '../types/general/type'
import { useSelector } from 'react-redux'
import Link from 'next/link'

type LanguageProps = {
  activeLocale: LocaleType,
}

const Language: React.FC<LanguageProps> = ({ activeLocale }) => {
  const localeStateData: LocaleStateType[] = useSelector((state: ReduxRootStateType) => state.localeState)
  return (
    <div className='languages'>
      <Link href={`/az/${localeStateData.find((data) => data.locale === 'az')?.slug}`} locale="az" className={activeLocale === 'az' ? 'active' : ''}>az</Link>
      <Link href={`/en/${localeStateData.find((data) => data.locale === 'en')?.slug}`} locale="en" className={activeLocale === 'en' ? 'active' : ''}>en</Link>
      <Link href={`/ru/${localeStateData.find((data) => data.locale === 'ru')?.slug}`} locale="ru" className={activeLocale === 'ru' ? 'active' : ''}>ru</Link>
    </div>
  )
}

export default React.memo(Language)
