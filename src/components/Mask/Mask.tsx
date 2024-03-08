import css from './WordTransitionIn.module.scss';
import cn from 'classnames';

interface Props {
	show: boolean;
	children: JSX.Element | JSX.Element[];
}

export default ({ show, children }: Props) => {
	return (
		<div className={cn(css.container, !show && css.hide)}>{children}</div>
	);
};
