import Overlay from './components/Overlay/Overlay';
import Bubbles from './components/Bubbles/Bubbles';
import Work from './components/Work/Work';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Preloader from './components/Preloader/Preloader';
import { useState } from 'react';
import css from './App.module.scss';
import { ERoute } from './global';
import { useLocation } from 'wouter';

export default () => {
    const [location] = useLocation();
    const [loaded, setLoaded] = useState<boolean>(false);

    return !loaded ? (
        <Preloader onLoaded={() => setLoaded(true)} />
    ) : (
        <div className={css.container}>
            <Bubbles />
            <Overlay />
            {location === ERoute.Work && <Work />}
            {location === ERoute.About && <About />}
            {location === ERoute.Contact && <Contact />}
        </div>
    );
};
