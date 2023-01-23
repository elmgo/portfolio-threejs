import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import WordTransitionIn from '../WordTransitionIn/WordTransitionIn';
import css from './About.module.scss';
import config from '../../config/config';
import isMobile from 'is-mobile';
import { addEvent } from '../../utils/events';

const skills = {
	frontend: [
		'JavaScript / TypeScript',
		'HTML5',
		'CSS / SASS',
		'React',
		'Vue',
		'Next.js',
		'Three.js',
	],
	backend: [
		'Node',
		'Express',
		'AWS',
		'Serverless',
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
		<div className={`${css.container} ${closing ? css.closingModal : ''}`} onClick={onClose}>
			<Helmet>
				<link rel='canonical' href={`${config.homeUrl}/about/`} />
			</Helmet>
			<div className={css.modal} onClick={(e) => e.stopPropagation()}>
				<div className={css.x} onClick={onClose}>
					<img alt='close' src={isMobile() ? '/images/x-white.svg' : '/images/x.svg'} />
				</div>
				<div className={css.portraitContainer}>
					<div
						style={{ backgroundImage: `url(/images/portrait.jpg)` }}
						className={css.portrait}
					/>
				</div>
				<div className={css.content}>
					<WordTransitionIn
						delaySeconds={1}
						text="HEY, I'M JON!"
						fontFamily='Antonio'
						fontWeight={100}
						letterSpacingPx={-2}
						fontSize={isMobile() ? 40 : 50}
					/>
					<div className={css.about}>
						I'm a full stack web developer and interactive designer with 15 years of
						experience in the field. After working for various companies throughout the
						years I decided to take my work on the road and become a freelancer in 2018.
						Since then I've helped clients from around the globe build and expand their
						businesses. I'm always looking for new challenges that might come my way.
						<br />
						<br />I love travelling the world and experiencing different cultures. I've
						previously lived in Israel, Denmark, Canada and Vietnam. I'm currently based
						in Budapest, Hungary.
					</div>

					<div className={css.tech}>
						{Object.entries(skills).map(([key, value]: [string, string[]]) => (
							<div className={css.row}>
								<div className={css.type}>{key}:</div>
								<div className={css.skills}>
									{value.map((skill: string, skillIndex: number) => (
										<div
											key={skill}
											className={css.skill}
											style={{
												animationDelay: `${1.45 + skillIndex * 0.05}s`,
											}}>
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
