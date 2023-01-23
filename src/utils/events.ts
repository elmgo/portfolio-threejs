export const callEvent = (type: string, detail?: any) => {
	document.body.dispatchEvent(
		new CustomEvent(type, {
			detail: detail || {},
		}),
	);
};

export const addEvent = (type: any, callback: any) => {
	document.body.addEventListener(type, callback);
};
