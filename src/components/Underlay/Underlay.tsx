import isMobile from 'is-mobile';
import { useEffect, useRef } from 'react';
import throttle from '../../utils/throttle';
import css from './Underlay.module.scss';

export default () => {
	const mouseOverlayRef = useRef<any>();
	const largeTextRef = useRef<any>();
	const smallTextRef = useRef<any>();
	const smallerTextRef = useRef<any>();

	useEffect(() => {
		if (!isMobile()) {
			document.addEventListener('mousemove', throttle(onMouseMove, 20));
		}
	}, []);

	function onMouseMove(e: MouseEvent) {
		mouseOverlayRef.current.style.top = `${e.clientY}px`;
		mouseOverlayRef.current.style.left = `${e.clientX}px`;

		const offsetX: number = e.clientX / window.innerWidth;
		const offsetY: number = e.clientY / window.innerHeight;
		const offset: number = (offsetX + offsetY) / 2;

		largeTextRef.current.style.transform = `translateX(${offset * (window.innerWidth / 10)}px)`;
		smallTextRef.current.style.transform = `translateX(-${offset * (window.innerWidth / 7)}px)`;
		smallerTextRef.current.style.transform = `translateX(${
			offset * (window.innerWidth / 20)
		}px)`;
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
