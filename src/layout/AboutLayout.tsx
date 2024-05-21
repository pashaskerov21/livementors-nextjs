'use client'
import React, { useEffect, useState } from 'react'
import { LocaleStateType, LocaleType } from '../types/general/type'
import { useDispatch } from 'react-redux'
import { i18n } from '@/i18n-config'
import { updateLocaleSlug } from '../redux/actions/LocaleAction'
import Site from '../class/Site'
import { AboutDataType, AboutLayoutDataType } from '../types/data/type'
import { AboutMainSection, BannerSection, CommiteSection } from '../section'
import { Preloader } from '../components'

type LayoutProps = {
  activeLocale: LocaleType,
  dictionary: { [key: string]: string },
}

const AboutLayout: React.FC<LayoutProps> = ({ activeLocale, dictionary }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(true);
  const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
    return {
      locale: locale,
      slug: 'about'
    }
  });
  useEffect(() => {
    dispatch(updateLocaleSlug(localeSlugs))
  }, [dispatch]);

  const site = new Site();
  const [dataState, setDataState] = useState<AboutLayoutDataType>({
    banners: [],
    banner_translates: [],
    about: {} as AboutDataType,
    about_translates: [],
    about_texts: [],
    about_text_translates: [],
    about_gallery: [],
    commites: [],
    commite_translates: [],
    commite_members: [],
    commite_member_translates: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response: AboutLayoutDataType = await site.about();
      setDataState(prev => ({
        ...prev,
        banners: response.banners ?? [],
        banner_translates: response.banner_translates ?? [],
        about: response.about ?? {},
        about_translates: response.about_translates ?? [],
        about_texts: response.about_texts ?? [],
        about_text_translates: response.about_text_translates ?? [],
        about_gallery: response.about_gallery ?? [],
        commites: response.commites ?? [],
        commite_translates: response.commite_translates ?? [],
        commite_members: response.commite_members ?? [],
        commite_member_translates: response.commite_member_translates ?? [],
      }));
      setLoading(false);
    }

    fetchData();
  }, []);
  return (
    <main className={`primary-bg ${loading ? 'd-none' : ''}`}>
      {/* {loading && <Preloader/>} */}
      {dataState.banners.length > 0 && dataState.banner_translates.length > 0 && (
        <BannerSection
          activeLocale={activeLocale}
          banners={dataState.banners}
          banner_translates={dataState.banner_translates}
        />
      )}
      <AboutMainSection
        activeLocale={activeLocale}
        dataState={dataState}
      />
      {dataState.commites.length > 0 && dataState.commite_translates.length > 0 && (
        <CommiteSection
          activeLocale={activeLocale}
          dataState={dataState}
        />
      )}
    </main>
  )
}

export default React.memo(AboutLayout)
