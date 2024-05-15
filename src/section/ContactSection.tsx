'use client'
import React from 'react'
import { LocaleType } from '../types/general/type'
import { ContactLayoutDataType } from '../types/data/type'
import { MessageRequestDataType } from '../types/request/type'
import * as Yup from 'yup'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Site from '../class/Site'
import Swal from 'sweetalert2'
import { FaEnvelope, FaLocationDot, FaPhone } from 'react-icons/fa6'
import { SocialMedia } from '../components'


type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    dataState: ContactLayoutDataType,
}

const ContactSection: React.FC<SectionProps> = ({ activeLocale, dataState, dictionary }) => {
    const site = new Site();
    const initialValues: MessageRequestDataType = {
        fullname: '',
        email: '',
        phone: '',
        subject: '',
        text: '',
    };
    const validationSchema = Yup.object({
        fullname: Yup.string().required(),
        // email: Yup.string().email().required(),
        phone: Yup.string().required(),
        // subject: Yup.string().required(),
        // text: Yup.string().required(),
    });
    const onSubmit = async (values: MessageRequestDataType, actions: FormikHelpers<MessageRequestDataType>) => {
        try {
            const data = {
                fullname: values.fullname,
                phone: values.phone,
                email: '',
                subject: '',
                text: '',
            }
            const response = await site.message_store(data);
            if (response === 'message_success') {
                Swal.fire({
                    icon: "success",
                    title: dictionary["congratulations"],
                    text: dictionary["message_success"],
                }).then((result) => {
                    if (result.isConfirmed) {
                        actions.resetForm();
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className="contact-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {
                                formik => (
                                    <Form className='contact-form'>
                                        <h3 className="title">{dictionary['application_form']}</h3>
                                        <div className="form-floating">
                                            <Field type="text" name="fullname" className={`form-control ${formik.errors['fullname'] && formik.touched['fullname'] ? 'is-invalid' : ''}`} id="fullname" placeholder={`${dictionary['fullname']} *`} />
                                            <label htmlFor="fullname">{dictionary['fullname']} *</label>
                                        </div>
                                        <div className="form-floating">
                                            <Field type="text" name="phone" className={`form-control ${formik.errors['phone'] && formik.touched['phone'] ? 'is-invalid' : ''}`} id="contact_number" placeholder={`${dictionary['contact_number']} *`} />
                                            <label htmlFor="contact_number">{dictionary['contact_number']} *</label>
                                        </div>
                                        {/* <div className="form-floating">
                                            <Field type="email" name="email" className={`form-control ${formik.errors['email'] && formik.touched['email'] ? 'is-invalid' : ''}`} id="email_address" placeholder={`${dictionary['email_address']} *`} />
                                            <label htmlFor="email_address">{dictionary['email_address']} *</label>
                                        </div>
                                        <div className="form-floating">
                                            <Field type="text" name="subject" className={`form-control ${formik.errors['subject'] && formik.touched['subject'] ? 'is-invalid' : ''}`} id="subject" placeholder={`${dictionary['subject']} *`} />
                                            <label htmlFor="subject">{dictionary['subject']} *</label>
                                        </div>
                                        <div className="form-floating">
                                            <Field as="textarea" name="text" className={`form-control ${formik.errors['text'] && formik.touched['text'] ? 'is-invalid' : ''}`} id='note' placeholder={`${dictionary['note']} *`}></Field>
                                            <label htmlFor="note">{dictionary['note']} *</label>
                                        </div> */}
                                        <button type='submit' className="submit-button">{dictionary['send']}</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="contact-info-wrapper">
                            <div className="contact-item">
                                <div className="icon"><FaPhone /></div>
                                <div className="value">{dictionary['tel']}: {dataState.settings.phone}</div>
                            </div>
                            <div className="contact-item">
                                <div className="icon"><FaEnvelope /></div>
                                <div className="value">{dataState.settings.email}</div>
                            </div>
                            <div className="contact-item">
                                <div className="icon"><FaLocationDot /></div>
                                <div className="value">{site.getSettingTranslate(1, "address_text", activeLocale, dataState.setting_translates)}</div>
                                <SocialMedia settings={dataState.settings} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(ContactSection)
