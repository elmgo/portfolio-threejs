import isMobile from 'is-mobile';
import { useEffect, useRef } from 'react';
import throttle from '../../utils/throttle';
import css from './Underlay.module.scss';

export default () => {
	const mouseOverlayRef = useRef<any>();

	useEffect(() => {
		if (!isMobile()) {
			document.addEventListener('mousemove', throttle(onMouseMove, 20));
		}
	}, []);

	function onMouseMove(e: MouseEvent) {
		mouseOverlayRef.current.style.top = `${e.clientY}px`;
		mouseOverlayRef.current.style.left = `${e.clientX}px`;
	}

	return (
		<div className={css.container}>
			<div className={css.mouseOverlay} ref={mouseOverlayRef} />
			<div className={css.text}>
				<div className={css.largeText}>WEB DEVELOPMENT</div>
				<div className={css.smallText}>DESIGN - UI/UX - INTERACTIVITY - ANIMATION</div>
			</div>
		</div>
	);
};
