import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App';
import config from './config/config';

document.getElementById('one_moment').style.display = 'none';
const root = createRoot(document.getElementById('root'));
root.render(
	<>
		<Helmet>
			<title>Jonathan Culiner - Web Developer & Interactive Designer</title>
			<meta charset='UTF-8' />
			<link rel='canonical' href={`${config.homeUrl}/`} />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<meta
				name='description'
				content='hire a freelance senior web developer and interactive designer - build robust web apps and beautiful websites'></meta>
			<link rel='icon' type='image/png' href='/favicon.png' />
			<link rel='preconnect' href='https://fonts.googleapis.com' />
			<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
			<link rel='preconnect' href='https://rsms.me/inter' crossorigin />
			<link
				rel='preload'
				as='style'
				href='https://fonts.googleapis.com/css2?family=Antonio:wght@600&display=swap'
			/>
			<link
				rel='stylesheet'
				href='https://fonts.googleapis.com/css2?family=Antonio:wght@600&display=swap'
			/>
			<link rel='preload' as='style' href='https://rsms.me/inter/inter.css' />
			<link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
			{process.env.NODE_ENV !== 'development' && (
				<script src='analytics.js' type='text/javascript'></script>
			)}
		</Helmet>
		<App />
	</>,
);
