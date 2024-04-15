import { LocaleType } from "../general/type";

type MetaRequestDataType = {
    lang: LocaleType,
    page: number,
    parent?: "events" | "report",
    slug?: string,
}
type MessageRequestDataType = {
    fullname: string,
    phone: string,
    email: string,
    subject: string,
    text: string
}

export type {
    MetaRequestDataType,
    MessageRequestDataType,
}