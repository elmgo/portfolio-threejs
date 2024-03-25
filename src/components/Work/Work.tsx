import TransitionContent from '../TransitionContent/TransitionContent';
import { ERoute } from '../../global';
import { projectImages } from '../../resources/projects';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'wouter';
import { useState } from 'react';
import WorkModal from '../WorkModal/WorkModal';
import Mask from '../Mask/Mask';

export default () => {
	const [location] = useLocation();
	const [assetsLoaded, setAssetsLoaded] = useState<boolean>();
	const showPage: boolean = location === ERoute.Work;

	function renderContent() {
		return (
			<Mask show={showPage}>
				<>
					{!!!assetsLoaded && (
						<Preloader
							numbers
							onLoaded={() => setAssetsLoaded(true)}
							assets={projectImages}
						/>
					)}
				</>
			</Mask>
		);
	}

	return (
		<>
			<TransitionContent
				show={showPage}
				route={ERoute.Work}
				h1='My Work'
				titleLine1='MY'
				titleLine2='WORK'
				infoContent={<></>}
				content={renderContent()}
			/>
			{assetsLoaded && showPage && <WorkModal />}
		</>
	);
};
