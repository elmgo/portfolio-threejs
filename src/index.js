import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
    <>
        <Helmet>
            <title>Jonathan Culiner - Web Developer & Interactive Designer</title>
            <meta charset='UTF-8' />
            <link rel='canonical' href='https://www.jonculiner.com/' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <meta
                name='description'
                content='hire a freelance senior web developer and interactive designer - build robust web apps and beautiful websites'></meta>
            <link rel='icon' type='image/png' href='/favicon.png'></link>
            <script src='analytics.js' type='text/javascript'></script>
        </Helmet>
        <App />
    </>,
);
