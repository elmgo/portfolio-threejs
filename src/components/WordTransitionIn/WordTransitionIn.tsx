import { useEffect, useLayoutEffect, useState } from 'react';
import css from './WordTransitionIn.module.scss';

interface Props {
	text: string;
	fontFamily: string;
	fontSize: number;
	delaySeconds: number;
	fontWeight?: number;
	letterSpacingPx?: number;
}

export default ({
	text,
	fontFamily,
	fontSize,
	delaySeconds,
	fontWeight = 400,
	letterSpacingPx = 0,
}: Props) => {
	// calculate the width of an individual letter by drawing it to a canvas
	function getLetterWidth(letter: string) {
		const canvas: HTMLCanvasElement = document.createElement('canvas');
		const context: any = canvas.getContext('2d');
		context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
		const renderedLetter: TextMetrics = context.measureText(letter);
		return renderedLetter.width;
	}

	const letterPositions: number[] = Array.from(text).reduce(
		(a: number[], b: string) => [...a, a[a.length - 1] + getLetterWidth(b) + letterSpacingPx],
		[0],
	);

	return (
		<div className={css.container} style={{ height: fontSize }}>
			{Array.from(text).map((letter: string, index: number) => (
				<div
					className={css.letter}
					style={{
						fontSize: `${fontSize}px`,
						fontFamily,
						fontWeight: fontWeight,
						top: `${fontSize}px`,
						lineHeight: `${fontSize - 10}px`,
						left: letterPositions[index],
						animationDelay: `${index * 0.02 + delaySeconds}s`,
					}}>
					{letter}
				</div>
			))}
		</div>
	);
};
