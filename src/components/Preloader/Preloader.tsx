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
			let newMedia: HTMLImageElement | XMLHttpRequest;

			if (src.includes('webm')) {
				var video = document.createElement('video');
				console.log(`/projects/videos/${src}`);
				video.setAttribute('preload', 'auto');
				video.setAttribute('src', `/projects/videos/${src}`);

				video.addEventListener('loadeddata', function () {
					setTimeout(() => resolve(), 100);
				});
			} else {
				newMedia = new Image();
				newMedia.src = isAssets ? `/images/${src}` : `/projects/images/${src}`;
				newMedia.onload = () => {
					setTimeout(() => resolve(), 100);
				};
				newMedia.onerror = (err: Event | string) => {
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
				<img alt='loading-spinner' className={css.spinnerBig} src='/images/spinner.svg' />
				<img alt='loading-spinner' className={css.spinnerSmall} src='/images/spinner.svg' />
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
