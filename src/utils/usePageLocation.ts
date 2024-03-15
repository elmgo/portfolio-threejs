import { useEffect, useRef, useState } from 'react';
import { ERoute } from '../global';
import { useLocation } from 'wouter';

const usePageLoader = (page: ERoute) => {
	const [location] = useLocation();
	const timeout = useRef<any>();
	const [loadPage, setLoadPage] = useState<boolean>();

	useEffect(() => {
		if (location === page) {
			setLoadPage(true);
		} else {
			clearTimeout(timeout.current);
			timeout.current = setTimeout(() => {
				setLoadPage(false);
			}, 1500);
		}

		return () => clearTimeout(timeout.current);
	}, [location]);

	return loadPage;
};

export default usePageLoader;
