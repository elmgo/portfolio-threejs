import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ERoute } from '../../global';
import css from './Overlay.module.scss';

const details = {
    email: 'jon@jonculiner.com',
    linkedin: 'https://www.linkedin.com/in/jonathan-culiner/',
    phone: '+36-707-345-474',
    cv: '/resume.pdf',
};

export default () => {
    const [, setLocation] = useLocation();
    const [touched, setTouched] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('touchend', documentTouched);
        return () => document.removeEventListener('touchend', documentTouched);
    }, []);

    function documentTouched() {
        document.removeEventListener('touchend', documentTouched);
        setTouched(true);
    }

    function renderMenuItem(label: string, route: ERoute) {
        return (
            <div className={css.menuItem} onClick={() => setLocation(route)}>
                <div className={css.label}>{label}</div>
                <div className={css.underlay} />
            </div>
        );
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <h1 className={css.title}>JONATHAN CULINER</h1>
                <div className={css.subHeader}>
                    <h2>Web developer / Interactive designer</h2>
                    Freelancer / Globe trotter
                    <b>—</b>
                </div>
            </div>

            <div className={css.menu}>
                <div className={css.inner}>
                    {renderMenuItem('about', ERoute.About)}
                    {renderMenuItem('work', ERoute.Work)}
                    {renderMenuItem('contact', ERoute.Contact)}
                </div>
            </div>

            <div className={`${css.dragCursor} ${touched ? css.fadeIn : ''}`}>
                <img alt='mouse-pointer' src='/images/mouse-pointer.svg' />
                <span className={css.showDesktop}>MOVE MOUSE</span>
                <span className={css.showMobile}>TAP ELEMENTS</span>●
            </div>

            <div className={css.social}>
                <b>Get in touch, let's work together!</b>
                <a className={css.emailLink} href='mailto:jon@jonculiner.com'>
                    jon@jonculiner.com
                </a>
                <div className={css.buttons}>
                    <a className={css.button} target='_blank' href={`mailto:${details.email}`}>
                        <img alt='email' src='/images/mail.svg' />
                    </a>
                    <a className={css.button} target='_blank' href={details.linkedin}>
                        <img alt='linkedin' src='/images/linkedin.svg' />
                    </a>
                    <a className={css.button} href={`tel:${details.phone}`}>
                        <img alt='phone' src='/images/phone.svg' />
                    </a>
                    <a className={css.button} target='_blank' href={`${details.cv}`}>
                        <img alt='phone' src='/images/cv.svg' />
                    </a>
                </div>
            </div>

            <div className={`${css.handIcon} ${touched ? css.fadeOut : ''}`}>
                <img alt='hand-icon' src='/images/click-hand.png' />
                Tap elements
            </div>

            <div className={css.viewCode}>
                Built using React / Three.JS / Cannon.JS
                <br />
                <a target='_blank' href='https://github.com/elmgo/portfolio2'>
                    <img alt='github' src='/images/github.svg' />
                    view code
                </a>
            </div>
        </div>
    );
};
