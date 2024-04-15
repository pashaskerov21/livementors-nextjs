import { i18n } from "@/i18n-config";
import Site from "@/src/class/Site";
import { EventTranslateDataType } from "@/src/types/data/type";
import { MetadataRoute } from "next";

const site = new Site();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response: {
        event_translates: EventTranslateDataType[],
        report_translates: EventTranslateDataType[],
    } = await site.sitemap();

    const eventSiteMap: MetadataRoute.Sitemap = response.event_translates.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/events/${data.slug}`,
        lastModified: new Date(),
    }));
    const reportSiteMap: MetadataRoute.Sitemap = response.event_translates.map((data) => ({
        url: `${process.env.SITE_URL}/${data.lang}/report/${data.slug}`,
        lastModified: new Date(),
    }));
    return [
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/about`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/events`,
            lastModified: new Date(),
        })),
        ...eventSiteMap,
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/mentors`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/report`,
            lastModified: new Date(),
        })),
        ...reportSiteMap,
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/partners`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/contact`,
            lastModified: new Date(),
        })),
        ...i18n.locales.map(locale => ({
            url: `${process.env.SITE_URL}/${locale}/404`,
            lastModified: new Date(),
        })),
    ]
}