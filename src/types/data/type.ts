import { LocaleType } from "../general/type"

type UserDataType = {
    id: 1,
    name: string,
    email: string,
    email_verified_at: string,
    user_type: string,
    api_token: string,
    created_at: string,
    updated_at: string,
}
type SettingDataType = {
    id: number,
    logo: string | null,
    logo_2: string | null,
    favicon: string | null,
    email: string | null,
    phone: string | null,
    timer_date: string | null,
    facebook: string | null,
    linkedin: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    whatsapp: string | null,
    telegram: string | null,
    author_url: string | null,
    address_url: string | null,
}
type SettingTranslateDataType = {
    id: number,
    setting_id: number | null,
    lang: LocaleType,
    title: string | null,
    description: string | null,
    author: string | null,
    keywords: string | null,
    copyright: string | null,
    address_text: string | null,
    footer_text: string | null,
}
type MenuDataType = {
    id: number,
    slug: string,
    order: number,
}
type MenuTranslateDataType = {
    id: number,
    menu_id: number,
    lang: LocaleType,
    title: string,
    meta_title: string | null,
    meta_description: string | null,
    meta_keywords: string | null,
}
type FaqDataType = {
    id: number,
    order: number,
}
type FaqTranslateDataType = {
    id: number,
    faq_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}
type BannerDataType = {
    id: number,
    file: string | null,
    type: "photo" | "video",
    page: number,
    order: number,
}
type BannerTranslateDataType = {
    id: number,
    banner_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}

type AboutDataType = {
    id: number,
    author_image: string | null,
    author_signature: string | null,
}
type AboutTranslateDataType = {
    id: number,
    about_id: number,
    lang: LocaleType,
    author_title: string | null,
    author_sub_title: string | null,
    home_text: string | null,
    main_text: string | null,
}
type AboutGalleryDataType = {
    id: number,
    image: string | null,
    order: number,
}
type AboutTextDataType = {
    id: number,
    order: number,
}
type AboutTextTranslateDataType = {
    id: number,
    text_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}
type CommiteDataType = {
    id: number,
    order: number,
}
type CommiteTranslateDataType = {
    id: number,
    commite_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}
type CommiteMemberDataType = {
    id: number,
    image: string | null,
    commite_id: number,
    content_status: number,
    order: number,
}
type CommiteMemberTranslateDataType = {
    id: number,
    member_id: number,
    lang: LocaleType,
    title: string | null,
    sub_title: string | null,
    text: string | null,
}
type EventDataType = {
    id: number,
    image: string | null,
    video_url: string | null,
    order: number,
}
type EventTranslateDataType = {
    id: number,
    event_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
    subtitle: string | null,
    date: string | null,
    text: string | null,
    meta_text: string | null,
}
type EventGalleryDataType = {
    id: number,
    event_id: number,
    image: string | null,
    order: number,
}
type ReportDataType = {
    id: number,
    card_image: string | null,
    banner_image: string | null,
    order: number,
    destroy: number,
}
type ReportTranslateDataType = {
    id: number,
    report_id: number,
    lang: LocaleType,
    title: string | null,
    slug: string | null,
    card_text: string | null,
    main_text: string | null,
    meta_text: string | null,
    destroy: number,
}
type ReportMediaDataType = {
    id: number,
    report_id: number,
    type: "photo" | "video",
    image: string | null,
    video_url: string | null,
    order: number,
    destroy: number,
}
type ReportDocumentDataType = {
    id: number,
    report_id: number,
    type: "photo" | "pdf",
    image: string | null,
    pdf: string | null,
    order: number,
    destroy: number,
}
type MentorDataType = {
    id: number,
    image: string | null,
    content_status: number,
    order: number,
    destroy: number,
}
type MentorTranslateDataType = {
    id: number,
    mentor_id: number,
    lang: LocaleType,
    title: string | null,
    subtitle: string | null,
    text: string | null,
}
type GalleryDataType = {
    id: number,
    type: "image" | "video",
    image: string | null,
    video_url: string | null,
    order: number,
    destroy: number,
}
type CommentDataType = {
    id: number,
    image: string | null,
    order: number,
    destroy: number,
}
type CommentTranslateDataType = {
    id: number,
    comment_id: number,
    lang: LocaleType,
    title: string | null,
    text: string | null,
}
type PartnerDataType = {
    id: number,
    image: string | null,
    url: string | null,
    order: number,
    destroy: number,
}
type MessageDataType = {
    id: number,
    fullname: string | null,
    phone: string | null,
    email: string | null,
    subject: string | null,
    text: string | null,
    destroy: number,
    created_at: string | null,
}

type MetaDataType = {
    title: string | null,
    description: string | null,
    author: string | null,
    keywords: string | null,
    author_url: string | null,
    header_logo: string | null,
    footer_logo: string | null,
    favicon: string | null,
}

type RootLayoutDataType = {
    settings: SettingDataType,
    setting_translates: SettingTranslateDataType[],
    menues: MenuDataType[],
    menu_translates: MenuTranslateDataType[],
    faqs: FaqDataType[],
    faq_translates: FaqTranslateDataType[],
}

type HomeLayoutDataType = {
    settings: SettingDataType,
    setting_translates: SettingTranslateDataType[],
    banners: BannerDataType[],
    banner_translates: BannerTranslateDataType[],
    about: AboutDataType,
    about_translates: AboutTranslateDataType[],
    events: EventDataType[],
    event_translates: EventTranslateDataType[],
    mentors: MentorDataType[],
    mentor_translates: MentorTranslateDataType[],
    gallery_images: GalleryDataType[],
    gallery_videos: GalleryDataType[],
    reports: ReportDataType[],
    report_translates: ReportTranslateDataType[],
    comments: CommentDataType[],
    comment_translates: CommentTranslateDataType[],
    partners: PartnerDataType[],
}
type EventLayoutDataType = {
    banners: BannerDataType[],
    banner_translates: BannerTranslateDataType[],
    events: EventDataType[],
    event_translates: EventTranslateDataType[],
}
type AboutLayoutDataType = {
    banners: BannerDataType[],
    banner_translates: BannerTranslateDataType[],
    about: AboutDataType,
    about_translates: AboutTranslateDataType[],
    about_texts: AboutTextDataType[],
    about_text_translates: AboutTextTranslateDataType[],
    about_gallery: AboutGalleryDataType[],
    commites: CommiteDataType[],
    commite_translates: CommiteTranslateDataType[],
    commite_members: CommiteMemberDataType[],
    commite_member_translates: CommiteMemberTranslateDataType[],
}
type MentorLayoutDataType = {
    banners: BannerDataType[],
    banner_translates: BannerTranslateDataType[],
    mentors: MentorDataType[],
    mentor_translates: MentorTranslateDataType[],
}

export type {
    UserDataType,
    SettingDataType,
    SettingTranslateDataType,
    MenuDataType,
    MenuTranslateDataType,
    FaqDataType,
    FaqTranslateDataType,
    BannerDataType,
    BannerTranslateDataType,
    AboutDataType,
    AboutTranslateDataType,
    AboutGalleryDataType,
    AboutTextDataType,
    AboutTextTranslateDataType,
    CommiteDataType,
    CommiteTranslateDataType,
    CommiteMemberDataType,
    CommiteMemberTranslateDataType,
    EventDataType,
    EventGalleryDataType,
    EventTranslateDataType,
    ReportDataType,
    ReportTranslateDataType,
    ReportMediaDataType,
    ReportDocumentDataType,
    MentorDataType,
    MentorTranslateDataType,
    GalleryDataType,
    CommentDataType,
    CommentTranslateDataType,
    PartnerDataType,
    MessageDataType,

    MetaDataType,
    RootLayoutDataType,
    HomeLayoutDataType,
    EventLayoutDataType,
    AboutLayoutDataType,
    MentorLayoutDataType,
}

