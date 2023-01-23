import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ERoute } from '../../global';
import css from './Overlay.module.scss';
import config from '../../config/config';
import { callEvent } from '../../utils/events';
import isMobile from 'is-mobile';

export default () => {
	const [location, setLocation] = useLocation();
	const [touched, setTouched] = useState<boolean>(false);
	const { personalDetails } = config;

	useEffect(() => {
		if (isMobile()) {
			document.addEventListener('touchend', documentTouched);
		}
		return () => {
			if (isMobile()) {
				document.removeEventListener('touchend', documentTouched);
			}
		};
	}, []);

	function documentTouched() {
		document.removeEventListener('touchend', documentTouched);
		setTouched(true);
	}

	function renderMenuItem(label: string, route: ERoute) {
		return (
			<div
				className={`${css.menuItem} ${route === location ? css.menuItemActive : ''}`}
				onClick={() => menuItemClicked(route)}>
				<div className={css.label}>{label}</div>
				<div className={css.underlay} />
				<div className={css.selectedUnderlay} />
			</div>
		);
	}

	function menuItemClicked(newRoute: ERoute) {
		if (newRoute === location) {
			return;
		}
		if (location !== '/') {
			callEvent('closeAllModals');
			setTimeout(() => {
				setLocation(newRoute);
			}, 500);
		} else {
			setLocation(newRoute);
		}
	}

	function renderButton(link: string, icon: string, imageAlt: string) {
		return (
			<a className={css.button} target='_blank' href={link}>
				<img alt={imageAlt} src={icon} />
				<div className={css.underlay} />
			</a>
		);
	}

	return (
		<div className={css.container}>
			<div className={css.header}>
				<h1 className={css.title}>JONATHAN CULINER</h1>
				<div className={css.subHeader}>
					<h2>Web developer / Interactive designer</h2>
					Freelancer / Globe trotter
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
				<a className={css.emailLink} href={`mailto:${personalDetails.email}`}>
					{personalDetails.email}
				</a>
				<div className={css.buttons}>
					{renderButton(`mailto:${personalDetails.email}`, '/images/mail.svg', 'email')}
					{renderButton(`tel:${personalDetails.phone}`, '/images/phone.svg', 'phone')}
					{renderButton(personalDetails.linkedin, '/images/linkedin.svg', 'linkedin')}
					{renderButton(personalDetails.cv, '/images/cv.svg', 'cv')}
				</div>
			</div>

			<div className={`${css.handIcon} ${touched ? css.fadeOut : ''}`}>
				<img alt='hand-icon' src='/images/click-hand.png' />
				Tap elements
			</div>

			<div className={css.viewCode}>
				Built using React / Three.JS / Cannon.JS
				<br />
				<a target='_blank' href={config.githubRepoUrl}>
					<img alt='view-code' src='/images/github.svg' />
					view code
				</a>
			</div>
		</div>
	);
};
