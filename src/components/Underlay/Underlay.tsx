import isMobile from 'is-mobile';
import { RefObject, createRef, useEffect, useRef, useState } from 'react';
import throttle from '../../utils/throttle';
import css from './Underlay.module.scss';
import { useLocation } from 'wouter';
import { ERoute } from '../../global';
import cn from 'classnames';
import Mask from '../Mask/Mask';

const pages = [
	{
		location: ERoute.Home,
		color: '#ffffff',
	},
	{
		location: ERoute.About,
		color: '#472D30',
	},
	{
		location: ERoute.Work,
		color: '#3379d5',
	},
	{
		location: ERoute.Contact,
		color: '#ffa48a',
	},
];

export default () => {
	const [location] = useLocation();
	const mouseOverlayRef = useRef<HTMLDivElement>(null);
	const largeTextRef = useRef<HTMLDivElement>(null);
	const smallTextRef = useRef<HTMLDivElement>(null);
	const smallerTextRef = useRef<HTMLDivElement>(null);
	const [gradientVisible, setGradientVisible] = useState<boolean>(false);
	const isHome: boolean = location === ERoute.Home;

	useEffect(() => {
		const mouseMoveFunc = throttle(onMouseMove, 15);

		if (!isMobile()) {
			document.addEventListener('mousemove', mouseMoveFunc);
		}
		return () => {
			document.removeEventListener('mousemove', mouseMoveFunc);
		};
	}, []);

	function onMouseMove(e: MouseEvent) {
		if (
			!largeTextRef.current ||
			!smallTextRef.current ||
			!smallerTextRef.current ||
			!mouseOverlayRef.current ||
			isMobile()
		) {
			return;
		}

		if (!gradientVisible) {
			setGradientVisible(true);
		}

		// I apply the positioning directly to the refs instead of using state
		// for performance reasons

		const offsetX: number = e.clientX / window.innerWidth;
		const offsetY: number = e.clientY / window.innerHeight;
		const offset: number = (offsetX + offsetY) / 2;

		largeTextRef.current.style.transform = `translateX(${
			offset * (window.innerWidth / 10)
		}px)`;
		smallTextRef.current.style.transform = `translateX(-${
			offset * (window.innerWidth / 7)
		}px)`;
		smallerTextRef.current.style.transform = `translateX(${
			offset * (window.innerWidth / 20)
		}px)`;

		mouseOverlayRef.current.style.display = `block`;
		mouseOverlayRef.current.style.top = `${e.clientY}px`;
		mouseOverlayRef.current.style.left = `${e.clientX}px`;
	}

	return (
		<div className={css.container}>
			<div
				className={css.texture}
				style={{ backgroundImage: 'url(/assets/bg-texture.jpg)' }}
			/>
			<Overlay location={location} />
			<div
				className={css.mouseOverlay}
				ref={mouseOverlayRef}
				style={{ opacity: gradientVisible ? 1 : 0 }}
			/>

			<div
				className={css.text}
				style={{ opacity: location === '/' ? 1 : 1 }}>
				<div className={css.textMobile}>
					<Mask
						show={isHome}
						height={'29vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.largeText}>WEB</div>
					</Mask>
					<Mask
						show={isHome}
						height={'36vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.largeText2}>DEV</div>
					</Mask>
					<Mask
						show={isHome}
						height={'20vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.smallText1}>DESIGN ● UI/UX</div>
					</Mask>

					{/* <div className={css.smallText}>
						DESIGN ● UI/UX ● INTERACTIVITY ● ANIMATION
					</div> */}
				</div>

				<div className={css.textDesktop}>
					<Mask
						show={isHome}
						height={'9vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.largeText} ref={largeTextRef}>
							WEB DEVELOPMENT
						</div>
					</Mask>
					<Mask
						show={isHome}
						height={'5vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.smallText} ref={smallTextRef}>
							DESIGN ● UI/UX ● INTERACTIVITY ● ANIMATION
						</div>
					</Mask>
					<Mask
						show={isHome}
						height={'2.5vw'}
						delayIn={0.2}
						delayOut={0.2}>
						<div className={css.smallestText} ref={smallerTextRef}>
							NEXTJS ● REACT ● VUE ● SCSS ● TAILWIND ● NODE ●
							EXPRESS ● WORDPRESS ● AWS ● MYSQL ● DYNAMODB
						</div>
					</Mask>
				</div>
			</div>
		</div>
	);
};

const Overlay = ({ location }: { location: string }) => {
	const overlayRefs: RefObject<any> = useRef(pages.map(() => createRef()));
	const lastLocation = useRef<string>();

	useEffect(() => {
		lastLocation.current = location;
	}, [location]);

	function getZIndex(index: string) {
		if (location === index) {
			return 2;
		} else if (index === lastLocation.current) {
			return 1;
		}
		return 0;
	}

	return (
		<div className={css.overlay}>
			{pages.map((i, index) => (
				<>
					<div
						className={cn(
							css.overlayInner,
							i.location === location
								? css.animationIn
								: css.animationOut,
						)}
						ref={overlayRefs.current[index]}
						key={index}
						style={{
							zIndex: getZIndex(i.location),
							backgroundColor: i.color,
						}}>
						<svg
							className={css.top}
							fill={i.color}
							viewBox='0 0 100 10'
							preserveAspectRatio='none'>
							<path d='M0,10 L100,0 L100,10 Z'></path>
						</svg>
						{/* <svg
							className={css.top}
							fill={i.color}
							viewBox='0 0 2323 869'
							preserveAspectRatio='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M0.000732422 869C0.49992 533 436.499 477.5 1283.5 477.5C2130.5 477.5 2323 0.00012207 2323 0.00012207V869C2323 869 551.5 869 0.000732422 869Z' />
						</svg> */}
					</div>
				</>
			))}
		</div>
	);
};
