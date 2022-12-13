import { useEffect, useState } from 'react';
import assets from '../../resources/assets';
import css from './Preloader.module.scss';

export default ({ onLoaded }: { onLoaded: any }) => {
    const [imagesLoaded, setImagesLoaded] = useState<number>(0);

    useEffect(() => {
        preload();
    }, []);

    async function preload() {
        for (let i: number = 0; i < assets.length; i++) {
            await preloadImage(assets[i]);
            setImagesLoaded(i);
        }
        onLoaded();
    }

    function preloadImage(src: string) {
        return new Promise<void>((resolve, reject) => {
            const newImage: HTMLImageElement = new Image();
            newImage.src = src;
            newImage.onload = () => {
                resolve();
            };
            newImage.onerror = (err) => {
                reject(err);
            };
        });
    }

    function getBarWidth() {
        const increment: number = 100 / (assets.length - 1);
        return Math.round(imagesLoaded * increment);
    }

    return (
        <div className={css.container}>
            <div className={css.spinner}>
                <img alt='loading-spinner' className={css.spinnerBig} src='/spinner.svg' />
                <img alt='loading-spinner' className={css.spinnerSmall} src='/spinner.svg' />
            </div>
            <div className={css.progress}>
                <div className={css.bar} style={{ width: `${getBarWidth()}%` }}></div>
            </div>
            {imagesLoaded} / {assets.length}
        </div>
    );
};
