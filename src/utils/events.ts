export const callEvent = (type: string) => {
	document.body.dispatchEvent(new CustomEvent(type, {}));
};

export const addEvent = (type: string, callback: any) => {
	document.body.addEventListener(type, callback);
};
