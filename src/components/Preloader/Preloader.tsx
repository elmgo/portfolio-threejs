import { useEffect, useState } from 'react';
import css from './Preloader.module.scss';

export default ({
	onLoaded,
	assets,
	isAssets,
}: {
	onLoaded: () => void;
	assets: string[];
	isAssets?: boolean;
}) => {
	const [imagesLoaded, setImagesLoaded] = useState<number>(0);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		preload();
	}, []);

	async function preload() {
		for (let i: number = 0; i < assets.length; i++) {
			await preloadImage(assets[i]);
			setImagesLoaded(i);
		}
		setLoaded(true);
		setTimeout(onLoaded, 500);
	}

	function preloadImage(src: string) {
		return new Promise<void>((resolve, reject) => {
			const isDev: boolean = process.env.NODE_ENV === 'development';

			if (src.includes('webm')) {
				const videoEl: HTMLVideoElement = document.createElement('video');
				console.log(`/projects/videos/${src}`);
				videoEl.setAttribute('preload', 'auto');
				videoEl.setAttribute('src', `/projects/videos/${src}`);
				videoEl.addEventListener('loadeddata', function () {
					setTimeout(() => resolve(), isDev ? 100 : 0);
				});
			} else {
				const imageEl: HTMLImageElement = new Image();
				imageEl.src = isAssets ? `/assets/${src}` : `/projects/images/${src}`;
				imageEl.onload = () => {
					setTimeout(() => resolve(), isDev ? 100 : 0);
				};
				imageEl.onerror = (err: Event | string) => {
					reject(err);
				};
			}
		});
	}

	function getBarWidth() {
		const increment: number = 100 / (assets.length - 1);
		return Math.round(imagesLoaded * increment);
	}

	return (
		<div className={`${css.container} ${loaded && css.loaded}`}>
			<div className={css.spinner}>
				<img alt='loading-spinner' className={css.spinnerBig} src='/assets/spinner.svg' />
				<img alt='loading-spinner' className={css.spinnerSmall} src='/assets/spinner.svg' />
			</div>
			<div className={css.progress}>
				<div className={css.bar}>
					<div className={css.barInner} style={{ width: `${getBarWidth()}%` }}></div>
				</div>
				loading assets
				<div className={css.assetsLoaded}>
					{imagesLoaded} / {assets.length}
				</div>
			</div>
		</div>
	);
};
