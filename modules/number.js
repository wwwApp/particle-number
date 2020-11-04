const COLORS = [
	{
		bg: '#617972',
		num: '#EE5C37',
	},
	{
		bg: '#F2627D',
		num: '#9EAC48',
	},
	{
		bg: '#EAB353',
		num: '#2CADAF',
	},
];

export class Number {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');

		// this.canvas.style.position = 'absolute';
		// this.canvas.style.left = '0';
		// this.canvas.style.top = '0';
		// document.body.appendChild(this.canvas);
	}

	setNumber(num, stageWidth, stageHeight) {
		this.canvas.width = stageWidth;
		this.canvas.height = stageHeight;

		const stageWidthHalf = stageWidth / 2;
		const stageHeightHalf = stageHeight / 2;

		const bgCircleRadius = 300;
		const color = COLORS[Math.ceil(Math.random() * COLORS.length - 1)];

		// circle bg
		this.ctx.beginPath();
		this.ctx.fillStyle = color.bg;
		this.ctx.arc(
			stageWidthHalf,
			stageHeightHalf,
			bgCircleRadius,
			0,
			Math.PI * 2,
			false
		);
		this.ctx.fill();
		this.ctx.closePath();

		// num
		const myNum = num.toString();
		const fontName = 'Hind';
		let fontSize = 500;

		this.ctx.beginPath();
		this.ctx.font = `${fontSize}px ${fontName}`;
		this.ctx.textBaseline = `middle`;
		let fontPos = this.ctx.measureText(myNum);

		if (fontPos.width > bgCircleRadius * 2) {
			const ratio = (bgCircleRadius * 2) / fontPos.width;
			fontSize *= ratio - 0.1;
			this.ctx.font = `${fontSize}px ${fontName}`;
			fontPos = this.ctx.measureText(myNum);
		}

		this.ctx.fillStyle = color.num;
		this.ctx.fillText(
			myNum,
			(stageWidth - fontPos.width) / 2,
			fontPos.actualBoundingBoxAscent +
				fontPos.actualBoundingBoxDescent +
				(stageHeight - fontSize) / 2
		);

		// trying with only specific section with text image
		// const numData = this.ctx.getImageData(
		// 	stageWidthHalf - bgCircleRadius,
		// 	stageHeightHalf - bgCircleRadius,
		// 	bgCircleRadius * 2,
		// 	bgCircleRadius * 2
		// ).data;

		const numData = this.ctx.getImageData(0, 0, stageWidth, stageHeight)
			.data;

		return {
			width: bgCircleRadius * 2,
			height: bgCircleRadius * 2,
			originX: stageWidthHalf - bgCircleRadius,
			originY: stageHeightHalf - bgCircleRadius,
			data: numData,
		};
	}
}
