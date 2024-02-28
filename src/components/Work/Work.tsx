import { createRef, RefObject, useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import css from './Work.module.scss';
import data, { IMedia, IProject } from '../../resources/projects';
import Scrollbar from 'smooth-scrollbar';
import Preloader from '../Preloader/Preloader';
import { projectImages } from '../../resources/projects';
import config from '../../config/config';

export default () => {
	const [, setLocation] = useLocation();
	const [loaded, setLoaded] = useState<boolean>(false);
	const [closing, setClosing] = useState<boolean>(false);
	const [currentProject, setCurrentProject] = useState<number>(0);
	const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
	const [nextProject, setNextProject] = useState<number>(0);
	const projectsContainerRef: RefObject<any> = useRef();
	const projectsRef: RefObject<any> = useRef(data.map(() => createRef()));
	const anchorsRef: RefObject<any> = useRef(data.map(() => createRef()));
	const scrollbarRef = useRef<any | null>();
	const project: IProject = data[currentProject];

	useEffect(() => {
		return () => {
			if (scrollbarRef.current) {
				scrollbarRef.current.removeListener(onScroll);
			}
		};
	}, []);

	useEffect(() => {
		if (loaded) {
			// add smooth scrollbar instead of using reacts native onScroll
			scrollbarRef.current = Scrollbar.init(projectsContainerRef.current);
			scrollbarRef.current.addListener(onScroll);
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

	function gotoNextProject() {
		scrollbarRef.current.scrollIntoView(anchorsRef.current[currentProject + 1].current, {
			offsetTop: 0,
		});
	}

	function gotoPrevProject() {
		scrollbarRef.current.scrollIntoView(anchorsRef.current[currentProject - 1].current, {
			offsetTop: 0,
		});
	}

	return (
		<div className={`${css.container} ${closing ? css.closingModal : ''}`} onClick={onClose}>
			<Helmet>
				<link rel='canonical' href={`${config.homeUrl}/work/`} />
			</Helmet>
			<img alt='close' className={css.x} onClick={onClose} src='/images/x-white.svg' />
			<div
				className={`${css.modal} ${isTransitioning ? css.infoTransitioning : ''}`}
				onClick={(e) => e.stopPropagation()}>
				{!loaded ? (
					<Preloader onLoaded={() => setLoaded(true)} assets={projectImages} />
				) : (
					<>
						<div className={css.info}>
							<div className={css.logo}>
								<img
									alt='project-logo'
									style={{ height: project.logo_height || 50 }}
									src={project.logo}
								/>
							</div>
							<div className={css.field}>
								<b>Role</b> {project.role}
							</div>
							{project.description && (
								<div className={css.field}>
									<b>About</b>
									{project.description}
								</div>
							)}
							<div className={css.field}>
								<b>Period</b>
								{project.start_year}
								{project.end_year ? ` - ${project.end_year}` : ''}
							</div>
							<div className={css.field}>
								<b>Tech</b>
								{project.skills.map((skill: string) => (
									<div className={css.skill}>{skill}</div>
								))}
							</div>

							<div className={css.controls}>
								<div
									className={`${css.prevProject} ${
										currentProject > 0 ? '' : css.buttonHide
									}`}
									onClick={gotoPrevProject}>
									<img alt='arrow-left' src='/images/arrow-left.svg' />
									Prev project
								</div>

								<div
									className={`${css.nextProject} ${
										currentProject < data.length - 1 ? '' : css.buttonHide
									}`}
									onClick={gotoNextProject}>
									Next project
									<img alt='arrow-right' src='/images/arrow-right.svg' />
								</div>
							</div>
						</div>
						<div ref={projectsContainerRef} className={css.panels}>
							{data.map((project: IProject, index: number) => (
								<div className={css.images} ref={anchorsRef.current[index]}>
									{project.media.map((media: IMedia, imageIndex: number) =>
										media.src.includes('webm') ? (
											<video className={css.video} autoPlay muted loop>
												<source src={`/videos/projects/${media.src}`} />
											</video>
										) : (
											<img
												alt={`project-${index}-${imageIndex}`}
												className={css.image}
												src={`/images/projects/${media.src}`}
											/>
										),
									)}
									{index < data.length - 1 && (
										<div
											ref={projectsRef.current[index]}
											className={css.nextProject}
										/>
									)}
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};
