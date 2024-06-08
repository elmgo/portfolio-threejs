import { LocationHook, useLocation } from 'wouter';
import css from './About.module.scss';
import config from '../../config/config';
import Mask from '../Mask/Mask';
import { ERoute } from '../../global';
import TransitionContent from '../TransitionContent/TransitionContent';

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
	const [location] = useLocation<LocationHook>();
	const showPage: boolean = location === ERoute.About;

	function renderButton(
		label: string,
		icon: string,
		imageAlt: string,
		targetUrl: string,
	) {
		const prefix = targetUrl.includes('@') ? 'mailto:' : '';
		return (
			<a
				className={css.button}
				href={`${prefix}${targetUrl}`}
				target='_blank'>
				<img alt={imageAlt} src={icon} />
				<span>{label}</span>
			</a>
		);
	}

	function renderContent() {
		return (
			<div className={css.content}>
				<Mask show={showPage} delayIn={0.2} delayOut={0.2}>
					<div className={css.aboutContainer}>
						<div className={css.portraitContainer}>
							<div
								style={{
									backgroundImage: `url(/assets/portrait.jpg)`,
								}}
								className={css.portrait}
							/>
						</div>
						<div className={css.about}>
							Hi, I'm Jon. I'm a full stack web developer and
							interactive designer. After working for various
							companies throughout the years I decided to take my
							work on the road and become a freelancer in 2018.
							Throughout the years I've done work for companies
							such as Google, Warner Brothers, American Express
							and Coca Cola.
							<br />
							<br />I love travelling the world and experiencing
							different cultures. I've previously lived in
							Denmark, Canada, Israel, Argentina, Hungary and
							Spain. I'm currently based in Ho Chi Minh, Vietnam.
						</div>
					</div>
				</Mask>
				<Mask show={showPage} delayIn={0.2} delayOut={0.2}>
					<div className={css.tech}>
						{Object.entries(skills).map(
							([key, value]: [string, string[]]) => (
								<div className={css.row}>
									<div className={css.type}>{key}:</div>
									<div className={css.skills}>
										{value.map((skill: string) => (
											<div
												key={skill}
												className={css.skill}>
												{skill}
											</div>
										))}
									</div>
								</div>
							),
						)}
					</div>
				</Mask>
			</div>
		);
	}

	return (
		<TransitionContent
			show={showPage}
			route={ERoute.About}
			h1='About Me'
			titleLine1='ABOUT'
			titleLine2='JON'
			infoContent={
				<div className={css.info}>
					{renderButton(
						'Email',
						'/assets/mail.svg',
						'email',
						config.personalDetails.email,
					)}
					{renderButton(
						'Resume',
						'/assets/cv.svg',
						'email',
						config.personalDetails.cv,
					)}
					{renderButton(
						'LinkedIn',
						'/assets/linkedin.svg',
						'linkedin',
						config.personalDetails.linkedin,
					)}
				</div>
			}
			content={renderContent()}
		/>
	);
};
