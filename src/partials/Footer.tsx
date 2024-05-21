'use client'
import React, { useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { RootLayoutDataType } from '../types/data/type'
import Link from 'next/link'
import Site from '../class/Site'
import { Preloader, SocialMedia } from '../components'
import { FaEnvelope, FaListCheck, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { Accordion, AccordionBody, AccordionItem } from 'react-bootstrap'
import { usePathname } from 'next/navigation'

type FooterProps = {
  activeLocale: LocaleType,
  dictionary: { [key: string]: string },
  dataState: RootLayoutDataType,
}

const Footer: React.FC<FooterProps> = ({ activeLocale, dictionary, dataState }) => {
  const apiURL = process.env.API_URL;
  const site = new Site();

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
    <footer>
      {loading && <Preloader/>}
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-start align-items-start gap-3 mb-5 mb-lg-0">
              <Link href={`/${activeLocale}`} className='footer-logo' onClick={() => handleLinkClick(`/${activeLocale}`)}>
                {
                  dataState.settings.logo ?
                    <img src={apiURL + dataState.settings.logo} width={500} height={60} alt='logo' /> :
                    <img src="/logo/footer-logo.png" width={500} height={60} alt='logo' />
                }
              </Link>
              <div className="footer-text">
                {site.getSettingTranslate(1, "footer_text", activeLocale, dataState.setting_translates)}
              </div>
              <SocialMedia settings={dataState.settings} />
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-start align-items-start gap-3 mb-5 mb-lg-0">
              <h4 className="col-title">{dictionary['faq']}</h4>
              <Accordion>
                {dataState.faqs.map((data) => (
                  <AccordionItem key={data.id} eventKey={`${data.id}`}>
                    <Accordion.Header>
                      {site.getFaqTranslate(data.id, "title", activeLocale, dataState.faq_translates)}
                    </Accordion.Header>
                    <AccordionBody>
                      <div className="collapse-inner">
                        {site.getFaqTranslate(data.id, "text", activeLocale, dataState.faq_translates)}
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="col-12 col-md-6 col-lg-4 d-flex flex-column justify-content-start align-items-start gap-3 mb-5 mb-lg-0">
              <h4 className="col-title">{dictionary['contact']}</h4>
              <div className="contact-links">
                <Link target='_blank' href={`mailto:${dataState.settings.email}`}><FaEnvelope /><span>{dataState.settings.email}</span></Link>
                <Link target='_blank' href={`tel:${dataState.settings.phone}`}><FaPhone /><span>{dataState.settings.phone}</span></Link>
                <Link target='_blank' href={`/${activeLocale}`}><FaLocationDot /><span>{site.getSettingTranslate(1, "address_text", activeLocale, dataState.setting_translates)}</span></Link>
                <Link href={`/${activeLocale}/contact`} onClick={() => handleLinkClick(`/${activeLocale}/contact`)}><FaListCheck /> <span>{dictionary['apply']}</span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          {activeLocale === 'az' && <div className="copyright"><Link target='_blank' href="https://dayaq.az/">&copy; Dayaq Xeyriyyə</Link> Məhsuludur</div>}
          {activeLocale === 'en' && <div className="copyright">&copy; Product of <Link target='_blank' href="https://dayaq.az/"> Dayaq Charity</Link></div>}
          {activeLocale === 'ru' && <div className="copyright">&copy; Product of <Link target='_blank' href="https://dayaq.az/"> Dayaq Charity</Link></div>}
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
