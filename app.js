import { Number } from './modules/number.js';
import { Dot } from './modules/dot.js';

class App {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

		WebFont.load({
			google: {
				families: ['Hind:700'],
			},
			fontactive: () => {
				this.pixelSize = 15;
				this.dots = [];
				this.number = new Number();

				window.addEventListener(
					'resize',
					this.resize.bind(this),
					false
				);
				this.resize();

				// requestAnimationFrame(this.animate.bind(this));
			},
		});
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * this.pixelRatio;
		this.canvas.height = this.stageHeight * this.pixelRatio;
		this.ctx.scale(this.pixelRatio, this.pixelRatio);

		this.drawDots();
	}

	drawDots() {
		const randNum = Math.ceil(Math.random() * 10);
		const numData = this.number.setNumber(
			randNum,
			this.stageWidth,
			this.stageHeight
		);

		this.dots = [];

		this.columns = Math.ceil(this.stageWidth / this.pixelSize);
		this.rows = Math.ceil(this.stageHeight / this.pixelSize);

		for (let i = 0; i < this.rows; i++) {
			const y = i * this.pixelSize;
			const pixelY = Math.max(Math.min(y, this.stageHeight), 0);

			for (let j = 0; j < this.columns; j++) {
				const x = j * this.pixelSize;
				const pixelX = Math.max(Math.min(x, this.stageWidth), 0);

				const pixelIndex = (pixelX + pixelY * this.stageWidth) * 4;
				const red = numData.data[pixelIndex + 0];
				const green = numData.data[pixelIndex + 1];
				const blue = numData.data[pixelIndex + 2];

				if (red + green + blue != 0) {
					const dot = new Dot(x, y, this.pixelSize, red, green, blue);
					dot.draw(this.ctx);

					this.dots.push(dot);
				}
			}
		}
	}

	// animate(t) {
	// 	requestAnimationFrame(this.animate.bind(this));

	// 	this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
	// }
}

window.onload = () => {
	new App();
};
