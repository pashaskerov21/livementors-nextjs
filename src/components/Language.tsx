import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType, ReduxRootStateType } from '../types/general/type'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type LanguageProps = {
  activeLocale: LocaleType,
}

const Language: React.FC<LanguageProps> = ({ activeLocale }) => {
  const localeStateData: LocaleStateType[] = useSelector((state: ReduxRootStateType) => state.localeState);

  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLinkClick = (key: string) => {
    if (key !== pathName) {
      setLoading(true);
    }
  }
  useEffect(() => {
    setLoading(false);
  }, [pathName]);

  return (
    <>
      {loading && (
        <div className="preloader">
          <div className="preloader-icon"></div>
        </div>
      )}
      <div className='languages'>
        <Link
          href={`/az/${localeStateData.find((data) => data.locale === 'az')?.slug}`}
          onClick={() => handleLinkClick(`/az/${localeStateData.find((data) => data.locale === 'az')?.slug}`)}
          className={activeLocale === 'az' ? 'active' : ''}
          locale="az"
        >
          az
        </Link>
        <Link
          href={`/en/${localeStateData.find((data) => data.locale === 'en')?.slug}`}
          onClick={() => handleLinkClick(`/en/${localeStateData.find((data) => data.locale === 'en')?.slug}`)}
          className={activeLocale === 'en' ? 'active' : ''}
          locale="en"
        >
          en
        </Link>
        <Link
          href={`/ru/${localeStateData.find((data) => data.locale === 'ru')?.slug}`}
          onClick={() => handleLinkClick(`/ru/${localeStateData.find((data) => data.locale === 'ru')?.slug}`)}
          className={activeLocale === 'ru' ? 'active' : ''}
          locale="ru"
        >
          ru
        </Link>
      </div>
    </>
  )
}

export default React.memo(Language)
