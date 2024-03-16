import { useState } from 'react';
import { useLocation } from 'wouter';
import css from './Contact.module.scss';
import config from '../../config/config';
import { ERoute } from '../../global';
import TransitionContent from '../TransitionContent/TransitionContent';
import { createFormData, validateForm } from '../../utils/formHelpers';
import cn from 'classnames';
export interface IContactForm {
	name?: string;
	email?: string;
	company?: string;
	message?: string;
}

export default () => {
	const [location] = useLocation();
	const [error, setError] = useState<string>();
	const [submitting, setSubmitting] = useState<boolean>();
	const [sent, setSent] = useState<boolean>();
	const showPage: boolean = location === ERoute.Contact;

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		const form: IContactForm | null = validateForm(e.target, setError);

		if (!form) {
			return;
		}

		setError('');
		setSubmitting(true);
		setTimeout(async () => {
			await fetch(config.contactFormUrl, {
				method: 'POST',
				body: createFormData(form),
			});
			setSent(true);
		}, 500);
	}

	return (
		<TransitionContent
			show={showPage}
			route={ERoute.Contact}
			noWrap
			titleLine1='GET IN'
			titleLine2='TOUCH'
			h1='Contact Me'
			infoContent={
				<div className={css.text}>
					I'm always open to hearing about new projects. Please don't
					hesitate to get in touch if you have something in mind :)
				</div>
			}
			content={
				<div className={cn(css.content, !showPage && css.fieldsOut)}>
					{!submitting && (
						<form onSubmit={onSubmit}>
							<div className={css.field}>
								<div className={css.label}>Name *</div>
								<input
									data-required
									name='name'
									placeholder='Your Name'
								/>
							</div>
							<div className={css.field}>
								<div className={css.label}>Email *</div>
								<input
									data-required
									name='email'
									placeholder='your.name@company.com'
								/>
							</div>
							<div className={css.field}>
								<div className={css.label}>Company</div>
								<input
									name='company'
									placeholder='Company Name'
								/>
							</div>
							<div className={css.field}>
								<div className={css.label}>Message *</div>
								<textarea
									data-required
									name='message'
									placeholder='Your thoughts...'
								/>
							</div>
							<div className={css.footer}>
								<div className={css.error}>
									{error && (
										<>
											<img
												alt='error'
												src='/assets/error.svg'
											/>
											{error}
										</>
									)}
								</div>
								<button type='submit'>Send</button>
							</div>
						</form>
					)}
					{submitting && (
						<div className={css.thankYou}>
							{!sent ? (
								<img alt='loading' src='/assets/loading.svg' />
							) : (
								<>
									Thank you for reaching out!
									<br />
									I'll get back to you as soon as I can :)
								</>
							)}
						</div>
					)}
				</div>
			}
		/>
	);
};
