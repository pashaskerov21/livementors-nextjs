import axios, { AxiosRequestConfig } from "axios";
import { LocaleType } from "../types/general/type";
import { AboutTranslateKeyType, EventTranslateKeyType, MentorTranslateKeyType, MenuTranslateKeyType, ReportTranslateKeyType, SettingTranslateDataKeyType } from "../types/form/type";
import { AboutTextTranslateDataType, AboutTranslateDataType, BannerTranslateDataType, CommentTranslateDataType, CommiteMemberTranslateDataType, CommiteTranslateDataType, EventTranslateDataType, FaqTranslateDataType, MentorTranslateDataType, MenuTranslateDataType, ReportTranslateDataType, SettingTranslateDataType } from "../types/data/type";
import { MessageRequestDataType, MetaRequestDataType } from "../types/request/type";

class Site {
    private apiURL = process.env.API_URL;
    private api = {
        root: `${this.apiURL}/api/site/root`,
        home: `${this.apiURL}/api/site/home`,
        about: `${this.apiURL}/api/site/about`,
        events: `${this.apiURL}/api/site/events`,
        event_inner: `${this.apiURL}/api/site/event_inner`,
        mentors: `${this.apiURL}/api/site/mentors`,
        report: `${this.apiURL}/api/site/report`,
        report_inner: `${this.apiURL}/api/site/report_inner`,
        partners: `${this.apiURL}/api/site/partners`,
        videos: `${this.apiURL}/api/site/videos`,
        contact: `${this.apiURL}/api/site/contact`,
        message_store: `${this.apiURL}/api/site/message_store`,
        sitemap: `${this.apiURL}/api/site/sitemap`,
        meta: `${this.apiURL}/api/site/meta`,
    }
    private axiosConfig: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    public root = async () => {
        try {
            const response = await axios.get(this.api.root, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public home = async () => {
        try {
            // const response = await axios.get(this.api.home, this.axiosConfig)
            // return response.data;
            const homeResponse = await axios.get(this.api.home, this.axiosConfig);
            const mentorsResponse = await this.mentors();

            return {
                ...homeResponse.data,
                mentors: mentorsResponse.mentors
            };
        } catch (error: any) {
            console.log(error)
        }
    }
    public about = async () => {
        try {
            const response = await axios.get(this.api.about, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public events = async () => {
        try {
            const response = await axios.get(this.api.events, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public event_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.event_inner, { data: data }, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public mentors = async () => {
        try {
            const response = await axios.get(this.api.mentors, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public report = async () => {
        try {
            const response = await axios.get(this.api.report, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public report_inner = async (data: { lang: LocaleType, slug: string }) => {
        try {
            const response = await axios.post(this.api.report_inner, { data: data }, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public partners = async () => {
        try {
            const response = await axios.get(this.api.partners, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public videos = async () => {
        try {
            const response = await axios.get(this.api.videos, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public contact = async () => {
        try {
            const response = await axios.get(this.api.contact, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public message_store = async (data: MessageRequestDataType) => {
        try {
            const response = await axios.post(this.api.message_store, { data: data }, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public sitemap = async () => {
        try {
            const response = await axios.get(this.api.sitemap, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public meta = async (data: MetaRequestDataType) => {
        try {
            const response = await axios.post(this.api.meta, { data }, this.axiosConfig)
            return response.data;
        } catch (error: any) {
            console.log(error)
        }
    }
    public getAboutTranslate(id: number, key: AboutTranslateKeyType, activeLocale: LocaleType, translateData: AboutTranslateDataType[]): string {
        const activeTranslateData: AboutTranslateDataType | undefined = translateData.find((data) => data.about_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getAboutTextTranslate(id: number, key: "lang" | "title" | "text", activeLocale: LocaleType, translateData: AboutTextTranslateDataType[]): string {
        const activeTranslateData: AboutTextTranslateDataType | undefined = translateData.find((data) => data.text_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getBannerTranslate(id: number, key: "lang" | "title" | "text", activeLocale: LocaleType, translateData: BannerTranslateDataType[]): string {
        const activeTranslateData: BannerTranslateDataType | undefined = translateData.find((data) => data.banner_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getCommentTranslate(id: number, key: "lang" | "title" | "text", activeLocale: LocaleType, translateData: CommentTranslateDataType[]): string {
        const activeTranslateData: CommentTranslateDataType | undefined = translateData.find((data) => data.comment_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getCommiteTranslate(id: number, key: "lang" | "title" | "text", activeLocale: LocaleType, translateData: CommiteTranslateDataType[]): string {
        const activeTranslateData: CommiteTranslateDataType | undefined = translateData.find((data) => data.commite_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getCommiteMemberTranslate(id: number, key: "lang" | "title" | "sub_title" | "text", activeLocale: LocaleType, translateData: CommiteMemberTranslateDataType[]): string {
        const activeTranslateData: CommiteMemberTranslateDataType | undefined = translateData.find((data) => data.member_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getEventTranslate(id: number, key: EventTranslateKeyType, activeLocale: LocaleType, translateData: EventTranslateDataType[]): string {
        const activeTranslateData: EventTranslateDataType | undefined = translateData.find((data) => data.event_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getFaqTranslate(id: number, key: "lang" | "title" | "text", activeLocale: LocaleType, translateData: FaqTranslateDataType[]): string {
        const activeTranslateData: FaqTranslateDataType | undefined = translateData.find((data) => data.faq_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getMentorTranslate(id: number, key: MentorTranslateKeyType, activeLocale: LocaleType, translateData: MentorTranslateDataType[]): string {
        const activeTranslateData: MentorTranslateDataType | undefined = translateData.find((data) => data.mentor_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getMenuTranslate(id: number, key: MenuTranslateKeyType, activeLocale: LocaleType, translateData: MenuTranslateDataType[]): string {
        const activeTranslateData: MenuTranslateDataType | undefined = translateData.find((data) => data.menu_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getReportTranslate(id: number, key: ReportTranslateKeyType, activeLocale: LocaleType, translateData: ReportTranslateDataType[]): string {
        const activeTranslateData: ReportTranslateDataType | undefined = translateData.find((data) => data.report_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
    public getSettingTranslate(id: number, key: SettingTranslateDataKeyType, activeLocale: LocaleType, translateData: SettingTranslateDataType[]): string {
        const activeTranslateData: SettingTranslateDataType | undefined = translateData.find((data) => data.setting_id === id && data.lang === activeLocale);
        return activeTranslateData ? activeTranslateData[key] ?? '' : '';
    }
}

export default Site;