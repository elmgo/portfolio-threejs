import isMobile from 'is-mobile';
import { useEffect, useRef } from 'react';
import throttle from '../../utils/throttle';
import css from './Underlay.module.scss';

export default () => {
	const mouseOverlayRef = useRef<HTMLDivElement>(null);
	const largeTextRef = useRef<HTMLDivElement>(null);
	const smallTextRef = useRef<HTMLDivElement>(null);
	const smallerTextRef = useRef<HTMLDivElement>(null);

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
			!mouseOverlayRef.current
		) {
			return;
		}

		// I apply the positioning directly to the refs instead of using state
		// for performance reasons

		const offsetX: number = e.clientX / window.innerWidth;
		const offsetY: number = e.clientY / window.innerHeight;
		const offset: number = (offsetX + offsetY) / 2;

		largeTextRef.current.style.transform = `translateX(${offset * (window.innerWidth / 10)}px)`;
		smallTextRef.current.style.transform = `translateX(-${offset * (window.innerWidth / 7)}px)`;
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
				style={{ backgroundImage: 'url(/images/bg-texture.jpg)' }}
			/>
			<div className={css.mouseOverlay} ref={mouseOverlayRef} />
			<div className={css.text}>
				<div className={css.largeText} ref={largeTextRef}>
					WEB DEVELOPMENT
				</div>
				<div className={css.smallText} ref={smallTextRef}>
					DESIGN - UI/UX - INTERACTIVITY - ANIMATION
				</div>
				<div className={css.smallestText} ref={smallerTextRef}>
					NEXTJS - REACT - VUE - SCSS - TAILWIND - NODE - EXPRESS - WORDPRESS - AWS -
					MYSQL - DYNAMODB
				</div>
			</div>
		</div>
	);
};
