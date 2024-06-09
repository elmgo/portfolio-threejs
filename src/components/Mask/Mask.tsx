import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import css from './Mask.module.scss';
import cn from 'classnames';

interface Props {
	show?: boolean;
	hideOnMobile?: boolean;
	hasPlaceholder?: boolean;
	delay?: number;
	delayIn?: number;
	delayOut?: number;
	onClick?: () => any;
	height?: number | string;
	children: JSX.Element | JSX.Element[];
}

export default ({
	show = false,
	hideOnMobile = false,
	hasPlaceholder = false,
	onClick = () => {},
	delay = 0,
	delayIn = 0,
	delayOut = 0,
	height,
	children,
}: Props) => {
	const [contentHeight, setContentHeight] = useState<number | string>();
	const [showText, setShowText] = useState<boolean>();
	const hasContentHeight = contentHeight !== undefined;
	const textRef = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		setContentHeight(
			height || textRef.current?.getBoundingClientRect().height,
		);

		setTimeout(() => {
			setShowText(show);
		}, (delayIn || delay) * 1000);
	}, []);

	useEffect(() => {
		if (hasContentHeight) {
			let newDelay = 0;
			if (show) {
				newDelay = delayIn || delay;
			} else {
				newDelay = delayOut || delay;
			}
			setTimeout(() => {
				setShowText(show);
			}, newDelay * 1000);
		}
	}, [show]);

	function getHeight() {
		if (hasContentHeight) {
			return showText ? contentHeight : 0;
		}
		return 'auto';
	}

	return (
		<div
			style={{
				height: contentHeight,
				opacity: !hasContentHeight ? 0 : 1,
			}}
			onClick={onClick}
			className={css.container}>
			<div
				ref={textRef}
				style={{
					height: getHeight(),
				}}
				className={cn(
					css.text,
					showText && css.open,
					hideOnMobile && css.hide,
				)}>
				{children}
			</div>
			{hasPlaceholder && (
				<span
					style={{
						opacity: 0,
					}}>
					{children}
				</span>
			)}
		</div>
	);
};
