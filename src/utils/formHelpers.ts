import { IContactForm } from '../components/Contact/Contact';

export function validateForm(
	formElement: HTMLFormElement | any,
	setError: (error: string) => any,
) {
	const data: {
		[key: string]: string;
	} = {};

	for (const field of formElement) {
		if (field.name === 'email' && !isValidEmail(field.value)) {
			setError('Please enter a valid email');
			return null;
		} else if (
			field.getAttribute('data-required') &&
			field.value.trim() === ''
		) {
			setError(`Please fill the ${field.name} field`);
			return null;
		} else if (field.name) {
			data[field.name] = field.value;
		}
	}
	return data;
}

function isValidEmail(email: string) {
	const pattern =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return pattern.test(email);
}

export function createFormData(data: IContactForm) {
	const formData = new FormData();
	Object.entries(data).map(([key, value]) => formData.append(key, value));
	return formData;
}
