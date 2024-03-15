import { useEffect, useRef, useState } from 'react';

const usePageLoader = (show: boolean) => {
	const timeout = useRef<any>();
	const [loadPage, setLoadPage] = useState<boolean>();

	useEffect(() => {
		if (show) {
			setLoadPage(true);
		} else if (show === false) {
			clearTimeout(timeout.current);
			timeout.current = setTimeout(() => {
				setLoadPage(false);
			}, 1500);
		}

		return () => clearTimeout(timeout.current);
	}, [show]);

	return loadPage;
};

export default usePageLoader;
