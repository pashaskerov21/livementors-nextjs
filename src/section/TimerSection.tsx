'use client'
import React, { useEffect, useState } from 'react'
import { LocaleType } from '../types/general/type'
import { SettingDataType } from '../types/data/type'
import moment from 'moment'
import Link from 'next/link'

type SectionProps = {
    activeLocale: LocaleType,
    dictionary: { [key: string]: string },
    settings: SettingDataType
}

const TimerSection: React.FC<SectionProps> = ({ activeLocale, dictionary, settings }) => {
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
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="content">
                            <div className="title">{dictionary['join_conference']}</div>
                            <div className="subtitle">we save lives</div>
                        </div>
                    </div>
                    <div className="col-6">
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
                        <Link href={`/${activeLocale}/contact`} className='register-button d-none d-lg-flex'>{dictionary['qeydiyyatdan_kec']}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(TimerSection)
