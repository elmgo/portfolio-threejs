import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import App from './App';
import config from './config/config';

const root = createRoot(document.getElementById('root'));
root.render(
	<>
		<Helmet>
			<link rel='canonical' href={`${config.homeUrl}/`} />
			{process.env.NODE_ENV !== 'development' && (
				<script src='analytics.js' type='text/javascript'></script>
			)}
		</Helmet>
		<App />
	</>,
);
