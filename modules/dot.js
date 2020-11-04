export class Dot {
	constructor(x, y, pixelSize, red, green, blue) {
		this.x = x;
		this.y = y;

		this.pixelSize = pixelSize;
		this.pixelSizeHalf = this.pixelSize / 2;

		this.max = pixelSize - 3.5;
		this.min = this.pixelSizeHalf;
		this.radius = Math.ceil(Math.random() * this.max + this.min) / 2;

		this.red = red;
		this.green = green;
		this.blue = blue;
		this.saturateVar = Math.random() * 10;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = `rgb(${this.red},${this.green},${this.blue})`;
		ctx.filter = `saturate(${this.saturateVar})`;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
	}
}
