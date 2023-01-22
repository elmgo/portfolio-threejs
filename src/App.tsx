import Overlay from './components/Overlay/Overlay';
import Underlay from './components/Underlay/Underlay';
import Bubbles from './components/Bubbles/Bubbles';
import Work from './components/Work/Work';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Preloader from './components/Preloader/Preloader';
import { useState } from 'react';
import css from './App.module.scss';
import { ERoute } from './global';
import { useLocation } from 'wouter';
import assets from './resources/assets';

export default () => {
	const [location] = useLocation();
	const [loaded, setLoaded] = useState<boolean>(false);

	return (
		<div className={css.container}>
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
		</div>
	);
};
