import Overlay from './components/Overlay/Overlay';
import Underlay from './components/Underlay/Underlay';
import Bubbles from './components/Bubbles/Bubbles';
import Work from './components/Work/Work';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Preloader from './components/Preloader/Preloader';
import { useState } from 'react';
import { ERoute } from './global';
import { LocationHook, useLocation } from 'wouter';
import assets from './resources/assets';
import css from './App.module.scss';

export default () => {
	const [location] = useLocation<LocationHook>();
	const [loaded, setLoaded] = useState<boolean>(false);

	return (
		<main className={css.container}>
			{!loaded ? (
				<Preloader
					onLoaded={() => setLoaded(true)}
					assets={assets}
					isAssets
				/>
			) : (
				<div className={css.content}>
					<Underlay />
					<span
						style={{
							transition: '1.5s',
							opacity: location === '/' ? 1 : 0.3,
						}}>
						<Bubbles />
					</span>
					<Overlay />
					<About />
					{location === ERoute.Contact && <Contact />}
					{/* {location === ERoute.Work && <Work />} */}
				</div>
			)}
		</main>
	);
};
