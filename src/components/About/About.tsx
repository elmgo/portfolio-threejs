import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import WordTransitionIn from '../WordTransitionIn/WordTransitionIn';
import css from './About.module.scss';
import config from '../../config/config';
import isMobile from 'is-mobile';
import cn from 'classnames';
import { addEvent } from '../../utils/events';

const skills = {
	frontend: [
		'JavaScript / TypeScript',
		'HTML5',
		'CSS / SASS / Tailwind',
		'React',
		'Vue',
		'Next.js',
		'Three.js',
	],
	backend: [
		'Node',
		'Express',
		'AWS',
		'Wordpress',
		'Statamic',
		'DynamoDB',
		'MySQL',
		'Redis',
		'ElasticSearch',
	],
	design: ['Figma', 'Photoshop', 'Invision'],
};

export default () => {
	const [, setLocation] = useLocation();
	const [closing, setClosing] = useState<boolean>(false);

	useEffect(() => {
		addEvent('closeAllModals', onClose);
	}, []);

	function onClose() {
		setClosing(true);
		setTimeout(() => {
			setLocation('/');
		}, 500);
	}

	return (
		<div className={cn(css.container, closing && css.closingModal)} onClick={onClose}>
			<Helmet>
				<link rel='canonical' href={`${config.homeUrl}/about/`} />
			</Helmet>
			<h1>About Me</h1>
			<div className={css.modal} onClick={(e) => e.stopPropagation()}>
				<div className={css.x} onClick={onClose}>
					<img alt='close' src={isMobile() ? '/assets/x-white.svg' : '/assets/x.svg'} />
				</div>
				<div className={css.portraitContainer}>
					<div
						style={{ backgroundImage: `url(/assets/portrait.jpg)` }}
						className={css.portrait}
					/>
				</div>
				<div className={css.content}>
					<WordTransitionIn
						delaySeconds={1}
						text='ABOUT ME'
						fontFamily='Antonio'
						fontWeight={100}
						letterSpacingPx={-2}
						fontSize={isMobile() ? 40 : 50}
					/>
					<div className={css.about}>
						I'm a full stack web developer and interactive designer. After working for
						various companies throughout the years I decided to take my work on the road
						and become a freelancer in 2018. Throughout the years I've done work for
						companies such as Google, Warner Brothers, American Express and Coca Cola.
						<br />
						<br />I love travelling the world and experiencing different cultures. I've
						previously lived in Denmark, Canada, Israel, Vietnam, Hungary and Spain. I'm
						currently based in Buenos Aires, Argentina.
					</div>

					<div className={css.tech}>
						{Object.entries(skills).map(([key, value]: [string, string[]]) => (
							<div className={css.row}>
								<div className={css.type}>{key}:</div>
								<div className={css.skills}>
									{value.map((skill: string) => (
										<div key={skill} className={css.skill}>
											{skill}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
