import { LocaleType } from "../general/type";

type SettingFileDataKeyType = "logo" | "logo_2" | "favicon";
type SettingMainDataKeyType = "email" | "phone" | "timer_date" | "facebook" | "linkedin" | "twitter" | "instagram" | "youtube" | "whatsapp" | "telegram" | "author_url" | "address_url";
type SettingTranslateDataKeyType = "lang" | "title" | "description" | "author" | "keywords" | "copyright" | "address_text" | "footer_text";

type SettingFileDataType = {
    logo?: File,
    logo_2?: File,
    favicon?: File,
}
type SettingMainDataType = {
    email: string,
    phone: string,
    timer_date: string
    facebook: string,
    linkedin: string,
    twitter: string,
    instagram: string,
    youtube: string,
    whatsapp: string,
    telegram: string,
    author_url: string,
    address_url: string,
}
type SettingFormTranslateDataType = {
    lang: LocaleType[],
    title: string[],
    description: string[],
    author: string[],
    keywords: string[],
    copyright: string[],
    address_text: string[],
    footer_text: string[],
}
type MenuTranslateKeyType = "title" | "meta_title" | "meta_description" | "meta_keywords";
type AboutTranslateKeyType = "lang" | "author_title" | "author_sub_title" | "home_text" | "main_text";
type AboutFileKeyType = "author_image" | "author_signature" | "gallery";
type EventTranslateKeyType = "lang" | "title" | "slug" | "subtitle" | "date" | "text" | "meta_text";
type ReportTranslateKeyType = "lang" | "title" | "slug" | "card_text" | "main_text" | "meta_text";
type ReportFileKeyType = "card_image" | "banner_image" | "media_images" | "document_images" | "document_pdfs";
type MentorTranslateKeyType = "lang" | "title" | "subtitle" | "text";
type CommentTranslateKeyType = "lang" | "title" | "text";


export type {
    SettingFileDataKeyType,
    SettingMainDataKeyType,
    SettingTranslateDataKeyType,
    SettingFileDataType,
    SettingMainDataType,
    SettingFormTranslateDataType,
    MenuTranslateKeyType,
    AboutTranslateKeyType,
    AboutFileKeyType,
    EventTranslateKeyType,
    ReportTranslateKeyType,
    ReportFileKeyType,
    MentorTranslateKeyType,
    CommentTranslateKeyType,
}