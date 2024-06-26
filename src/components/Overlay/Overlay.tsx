import { useEffect, useState } from 'react';
import { LocationHook, useLocation } from 'wouter';
import { ERoute } from '../../global';
import css from './Overlay.module.scss';
import config from '../../config/config';
import isMobile from 'is-mobile';
import cn from 'classnames';
import Mask from '../Mask/Mask';

const lightPages: string[] = ['/about', '/work'];

export default () => {
	const [location, setLocation] = useLocation<LocationHook>();
	const [touched, setTouched] = useState<boolean>(false);
	const { personalDetails } = config;
	const isHome: boolean = location === ERoute.Home;

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
				className={cn(
					css.menuItem,
					route === location && css.menuItemActive,
				)}
				onClick={() => menuItemClicked(route)}>
				<div className={css.label}>{label}</div>
				<div className={css.underlay} />
				<div className={css.selectedUnderlay} />
			</div>
		);
	}

	function menuItemClicked(newRoute: ERoute) {
		setLocation(newRoute);
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
		<div
			className={cn(
				css.container,
				location !== ERoute.Home && css.hide,
				lightPages.includes(location) && css.light,
			)}>
			<div className={css.header}>
				{/* <Mask delay={0.2} show> */}
				<h1 className={css.title}>JONATHAN CULINER</h1>
				{/* </Mask> */}
				<div className={css.subHeader}>
					<Mask delay={0.2} show>
						<h2>Web developer / Interactive designer</h2>
						<>Freelancer / Globe trotter</>
					</Mask>
				</div>
			</div>

			<div className={css.menu}>
				<div className={css.inner}>
					{renderMenuItem('home', ERoute.Home)}
					{renderMenuItem('about', ERoute.About)}
					{renderMenuItem('work', ERoute.Work)}
					{renderMenuItem('contact', ERoute.Contact)}
				</div>
			</div>

			<div className={cn(css.dragCursor, touched && css.fadeIn)}>
				<img alt='mouse-pointer' src='/assets/mouse-pointer.svg' />
				<span className={css.showDesktop}>MOVE MOUSE</span>
				<span className={css.showMobile}>TAP ELEMENTS</span>●
			</div>

			<div className={css.social}>
				<Mask delay={0.2} show hasPlaceholder>
					<b>Get in touch, let's work together!</b>
					<br />
					<a
						className={css.emailLink}
						href={`mailto:${personalDetails.email}`}>
						{personalDetails.email}
					</a>
				</Mask>
				<div className={css.buttons}>
					{/* <Mask delay={0.2} height={50} show={showContent}> */}
					{renderButton(
						`mailto:${personalDetails.email}`,
						'/assets/mail.svg',
						'email',
					)}
					{renderButton(
						`tel:${personalDetails.phone}`,
						'/assets/phone.svg',
						'phone',
					)}
					{renderButton(
						personalDetails.linkedin,
						'/assets/linkedin.svg',
						'linkedin',
					)}
					{renderButton(personalDetails.cv, '/assets/cv.svg', 'cv')}
					{/* </Mask> */}
				</div>
			</div>

			{isHome && (
				<div className={cn(css.handIcon, touched && css.fadeOut)}>
					<img alt='hand-icon' src='/assets/click-hand.png' />
					Tap elements
				</div>
			)}

			<div className={css.viewCode}>
				Built using React
				<br />
				<a target='_blank' href={config.githubRepoUrl}>
					<img alt='view-code' src='/assets/github.svg' />
					view code
				</a>
			</div>
		</div>
	);
};
