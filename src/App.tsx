import Overlay from './components/Overlay/Overlay';
import Underlay from './components/Underlay/Underlay';
import Bubbles from './components/Bubbles/Bubbles';
import Work from './components/Work/Work';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Preloader from './components/Preloader/Preloader';
import { useState } from 'react';
import { ERoute } from './global';
import { useLocation } from 'wouter';
import assets from './resources/assets';
import css from './App.module.scss';

export default () => {
	const [location] = useLocation();
	const [loaded, setLoaded] = useState<boolean>(false);

	return (
		<main className={css.container}>
			{!loaded ? (
				<Preloader onLoaded={() => setLoaded(true)} assets={assets} />
			) : (
				<div className={css.content}>
					<Underlay />
					<Bubbles />
					<Overlay />
					{location === ERoute.Work && <Work />}
					{location === ERoute.About && <About />}
					{location === ERoute.Contact && <Contact />}
				</div>
			)}
		</main>
	);
};
