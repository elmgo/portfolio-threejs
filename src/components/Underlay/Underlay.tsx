import { useLocation } from 'wouter';
import css from './Underlay.module.scss';

export default () => {
	const [location] = useLocation();

	return (
		<div className={`${css.container} ${css[location.split('/')[1]]}`}>
			<div className={css.text}>
				<div className={css.largeText}>WEB DEVELOPMENT</div>
				<div className={css.smallText}>DESIGN - UI/UX - INTERACTIVITY - ANIMATION</div>
			</div>
		</div>
	);
};
