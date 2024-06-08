import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { LocationHook, useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import css from './WorkModal.module.scss';
import data, { IMedia, IProject } from '../../resources/projects';
import Scrollbar from 'smooth-scrollbar';
import Preloader from '../Preloader/Preloader';
import { projectImages } from '../../resources/projects';
import config from '../../config/config';
import cn from 'classnames';

export default () => {
	const [, setLocation] = useLocation<LocationHook>();
	const [loaded, setLoaded] = useState<boolean>(false);
	const [closing, setClosing] = useState<boolean>(false);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [currentProject, setCurrentProject] = useState<number>(0);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
	const [nextProject, setNextProject] = useState<number>(0);
	const scrollbarRef = useRef<Scrollbar>();
	const projectsContainerRef: RefObject<HTMLDivElement> = useRef(null);
	const projectsRef: RefObject<any> = useRef(data.map(() => createRef()));
	const anchorsRef: RefObject<any> = useRef(data.map(() => createRef()));

	useEffect(() => {
		return () => {
			if (scrollbarRef.current) {
				scrollbarRef.current.removeListener(onScroll);
			}
		};
	}, []);

	useEffect(() => {
		if (loaded && projectsContainerRef.current) {
			// add smooth scrollbar instead of using reacts native onScroll
			// scrollbarRef.current = Scrollbar.init(projectsContainerRef.current);
			// scrollbarRef.current.addListener(onScroll);
		}
	}, [loaded]);

	function onClose() {
		setClosing(true);
		setTimeout(() => {
			setLocation('/');
		}, 500);
	}

	function onScroll(e: any) {
		for (let i: number = projectsRef.current.length - 1; i >= 0; i--) {
			if (e.offset.y > projectsRef.current[i].current?.offsetTop) {
				setNextProject(i + 1);
				return;
			}
		}
		setNextProject(0);
	}

	useEffect(() => {
		if (nextProject !== undefined) {
			setIsTransitioning(true);
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentProject(nextProject);
			}, 400);
		}
	}, [nextProject]);

	function onMediaLoaded() {
		setLoaded(true);
		setTimeout(() => {
			setShowOverlay(true);
			setTimeout(() => setShowOverlay(false), 2000);
		}, 1000);
	}

	function gotoNextProject() {
		scrollbarRef.current?.scrollIntoView(
			anchorsRef.current[currentProject + 1].current,
			{
				offsetTop: 0,
			},
		);
	}

	function gotoPrevProject() {
		scrollbarRef.current?.scrollIntoView(
			anchorsRef.current[currentProject - 1].current,
			{
				offsetTop: 0,
			},
		);
	}

	return (
		<div
			className={cn(css.container, closing && css.closingModal)}
			onClick={onClose}>
			<Helmet>
				<link rel='canonical' href={`${config.homeUrl}/work/`} />
			</Helmet>
			<h1>My Work</h1>
			<img
				alt='close'
				className={css.x}
				onClick={onClose}
				src='/assets/x-white.svg'
			/>
			<div
				className={cn(
					css.modal,
					isTransitioning && css.infoTransitioning,
				)}
				onClick={(e) => e.stopPropagation()}>
				{!loaded ? (
					<Preloader
						onLoaded={() => onMediaLoaded()}
						assets={projectImages}
					/>
				) : (
					<>
						<div
							className={cn(
								css.overlay,
								!showOverlay && css.hideOverlay,
							)}>
							<div className={css.prompt}>
								Scroll down to browse projects
								<img
									alt='arrow-down'
									src='/assets/arrow-right.svg'
								/>
							</div>
						</div>

						<div
							ref={projectsContainerRef}
							className={css.projects}>
							{data.map((project: IProject, index: number) => (
								<>
									<div
										className={cn(
											css.project,
											index % 2 === 1 && css.alt,
										)}
										ref={anchorsRef.current[index]}>
										<div className={css.info}>
											<div className={css.logo}>
												{project.title}
												{/* <img
													alt='project-logo'
													style={{
														height:
															project.logo_height ||
															50,
													}}
													src={project.logo}
												/> */}
											</div>
											<div className={css.field}>
												<b>Role</b> {project.role}
											</div>
											<div className={css.field}>
												<b>Tech</b>
												{project.skills.map(
													(skill: string) => (
														<div
															className={
																css.skill
															}>
															{skill}
														</div>
													),
												)}
											</div>
											{project.description && (
												<div className={css.field}>
													<b>About</b>
													{project.description}
												</div>
											)}
											<div className={css.field}>
												<b>YEAR(S)</b>
												{project.start_year}
												{project.end_year
													? ` - ${project.end_year}`
													: ''}
											</div>
										</div>
										<div className={css.media}>
											{project.media.map(
												(
													media: IMedia,
													imageIndex: number,
												) =>
													media.src.includes(
														'webm',
													) ? (
														<video
															className={
																css.video
															}
															autoPlay
															muted
															loop>
															<source
																src={`/projects/videos/${media.src}`}
															/>
														</video>
													) : (
														<img
															alt={`project-${index}-${imageIndex}`}
															className={
																css.image
															}
															src={`/projects/images/${media.src}`}
														/>
													),
											)}
										</div>
									</div>
									{index < data.length - 1 && (
										<div
											ref={projectsRef.current[index]}
											className={css.nextProject}
										/>
									)}
								</>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
