import css from './TransitionContent.module.scss';
import Mask from '../Mask/Mask';
import { Helmet } from 'react-helmet';
import config from '../../config/config';
import usePageLoader from '../../utils/usePageLocation';
import { ERoute } from '../../global';
import cn from 'classnames';
interface Props {
	show: boolean;
	noWrap?: boolean;
	h1: string;
	route: ERoute;
	titleLine1: string;
	titleLine2: string;
	content: JSX.Element | JSX.Element[];
	infoContent: JSX.Element | JSX.Element[];
}

export default ({
	show,
	h1,
	route,
	noWrap,
	titleLine1,
	titleLine2,
	content,
	infoContent,
}: Props) => {
	const pageLoaded = usePageLoader(show);

	if (!pageLoaded) {
		return null;
	}

	return (
		<div className={css.container}>
			<Helmet>
				<link rel='canonical' href={`${config.homeUrl}${route}/`} />
			</Helmet>
			<h1>{h1}</h1>
			<div className={css.title}>
				<div className={css.text}>
					<Mask show={show} delayIn={0.2} delayOut={0.2}>
						<div className={cn(noWrap && css.noWrap)}>
							{titleLine1}
						</div>
					</Mask>
					<Mask show={show} delayIn={0.2} delayOut={0.2}>
						<div className={cn(noWrap && css.noWrap)}>
							{titleLine2}
						</div>
					</Mask>
				</div>
				<div className={css.info}>
					<Mask show={show} delayIn={0.2} delayOut={0.2}>
						{infoContent}
					</Mask>
				</div>
			</div>

			<div className={css.body}>{content}</div>
		</div>
	);
};
