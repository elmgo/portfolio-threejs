import { useState } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import css from './Contact.module.scss';

interface IContactForm {
    name?: string;
    email?: string;
    company?: string;
    message?: string;
}

export default () => {
    const [, setLocation] = useLocation();
    const [closing, setClosing] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [submitting, setSubmitting] = useState<boolean>();
    const [sent, setSent] = useState<boolean>();

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form: IContactForm | null = validateForm(e.target);

        if (!form) {
            return;
        }

        setError('');
        setSubmitting(true);
        setTimeout(async () => {
            await fetch('https://getform.io/f/cc69e947-355d-4105-ad4c-6219be96cf3c', {
                method: 'POST',
                body: createFormData(form),
            });
            setSent(true);
        }, 500);
    }

    function onClose() {
        setClosing(true);
        setTimeout(() => {
            setLocation('/');
        }, 500);
    }

    function validateForm(formElement: HTMLFormElement | any) {
        const data: any = {};
        for (const field of formElement) {
            if (field.name === 'email' && !isValidEmail(field.value)) {
                setError('Please enter a valid email');
                return null;
            } else if (field.getAttribute('data-required') && field.value.trim() === '') {
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

    function createFormData(data: IContactForm) {
        const formData = new FormData();
        Object.entries(data).map(([key, value]) => formData.append(key, value));
        return formData;
    }

    return (
        <div className={`${css.container} ${closing ? css.closingModal : ''}`}>
            <Helmet>
                <link rel='canonical' href='https://www.jonculiner.com/contact/' />
            </Helmet>
            <div className={`${css.modal} ${submitting ? css.submitting : ''}`}>
                <div className={css.x} onClick={onClose}>
                    <img alt='close' src='/images/x.svg' />
                </div>
                <div className={css.inner}>
                    {!submitting && (
                        <form onSubmit={onSubmit}>
                            <div className={css.field}>
                                <div className={css.label}>Name *</div>
                                <input data-required name='name' placeholder='Your Name' />
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
                                <input name='company' placeholder='Company Name' />
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
                                            <img alt='error' src='/images/error.svg' />
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
                                <img alt='loading' src='/images/loading.svg' />
                            ) : (
                                <>
                                    Thank you for reaching out!
                                    <br />
                                    I'll get back to you as soon as I can :)
                                    <button onClick={() => setLocation('/')}>Close</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
