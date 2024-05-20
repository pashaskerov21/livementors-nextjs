'use client'
import React, { useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { AboutDataType, SettingDataType } from '../types/data/type'
import moment from 'moment'
import Link from 'next/link'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    settings: SettingDataType,
    about: AboutDataType,
}

const TimerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, settings, about }) => {
    const [timerState, setTimerState] = useState<{
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number,
    }>({
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
    });

    useEffect(() => {
        if (settings.timer_date) {
            const endDate = moment(settings.timer_date);

            const x = setInterval(() => {
                let now = moment();
                let difference = endDate.diff(now);
                let duration = moment.duration(difference);

                let months = duration.months();
                let days = duration.days();
                let hours = duration.hours();
                let minutes = duration.minutes();
                let seconds = duration.seconds();

                setTimerState({
                    month: months,
                    day: days,
                    hour: hours,
                    minute: minutes,
                    second: seconds,
                });

                if (difference < 0) {
                    clearInterval(x);
                    setTimerState({
                        month: 0,
                        day: 0,
                        hour: 0,
                        minute: 0,
                        second: 0,
                    });
                }

            }, 1000);

            return () => clearInterval(x);
        }
    }, [settings.timer_date]);
    return (
        <section className="timer-section">
            <div className="timer-inner">
                <div className="left">
                    <div className="content">
                        <div className="title">{dictionary['join_conference']}</div>
                        <div className="subtitle">we save lives</div>
                    </div>
                </div>
                <div className="right">
                    <div className="timer">
                        <div className="date-item">
                            <div className="item-value">{timerState.month}</div>
                            <div className="item-label">{dictionary['month']}</div>
                        </div>
                        <div className="date-item">
                            <div className="item-value">{timerState.day}</div>
                            <div className="item-label">{dictionary['day']}</div>
                        </div>
                        <div className="date-item">
                            <div className="item-value">{timerState.hour}</div>
                            <div className="item-label">{dictionary['hour']}</div>
                        </div>
                    </div>
                    <div className="d-none d-lg-flex justify-content-end align-items-center gap-3 me-5">
                        {about.register_link && <Link href={about.register_link} className='primary-button'>{dictionary['qeydiyyat']}</Link>}
                        {about.details_link && <Link href={about.details_link} className='primary-button'>{dictionary['daha_etrafli']}</Link>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(TimerSection)
