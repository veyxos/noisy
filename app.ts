/**
 * Random function
 * @param max Maximal value
 * @param min Minimal value (defaults to 0)
 * @returns Random float of the given range
 */
function random (max: number, min: number = 0): number {
	return Math.random() * (max - min) + min;
}

class Perlin {
	
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private firstOctave: number[] = [];
	private secondOctave: number[] = [];
	private thirdOctave: number[] = [];
	private fourthOctave: number[] = [];
	private combined: number[] = [];
	private width: number;
	private height: number;

	constructor() {
		this.canvas = document.querySelector('#canvas');
		this.context = this.canvas.getContext('2d');
		this.init();

		window.addEventListener('resize', this.init);
	}

	init(): void {
		this.setDimensions();

		/* Generate first Octave */
		this.firstOctave = this.generateOctave(10, 1);
		console.log(this.firstOctave);

		/* Generate second octave */
		this.secondOctave = this.generateOctave(20, 0.5);

		/* Generate third Octave */
		this.thirdOctave = this.generateOctave(40, 0.25);

		/* Generate fourth Octave */
		this.fourthOctave = this.generateOctave(80, 0.125);

		/* Print perlin 1D */
		this.combined = this.combineOctaves(this.firstOctave, this.secondOctave, this.thirdOctave, this.fourthOctave);
		this.print(this.combined)
		console.log(this.combined);
		
	}

	generateOctave(divisor: number, modifier: number): number[] {
		const steps = this.width / divisor;
		let randArr: number[] = [];
		let octave: number[] = [];
		for (let i = 0; i < steps; i++) {
			randArr.push(random(this.height * (0.5 + 0.5 * modifier), this.height * (0.5 - 0.5 * modifier)));
		}
		console.log("Random values:", randArr);
		for (let i = 0; i < steps; i++) {
			octave.push(randArr[i]);
			if (i < steps) {
				const interpolated = this.interpolate(randArr[i], randArr[i + 1], this.width / steps - 1);
				octave = octave.concat(interpolated);
			}
		}

		return octave;
	}

	combineOctaves(...octaves: Array<number[]>): number[] {
		let res: number[] = [];
		for (let i = 0; i < this.width; i++) {
			res[i] = 0;
			octaves.forEach(octave => {
				res[i] += octave[i];
			});
			res[i] /= octaves.length;
		}
		return res;
	}

	setDimensions(): void {
		this.width = this.canvas.scrollWidth;
		this.height = this.canvas.scrollHeight;
	}

	interpolate(p: number, q: number, n: number): number[] {
		let res: number[] = [];

		const r: number = (q - p) / n;
		for (let i = 0; i < n; i++) {
			res.push(p + r * i);
		}
		return res;
	}

	print(arr: number[]): void {
		this.context.fillStyle = `rgba(255, 255, 255, 1)`;
		arr.forEach((y, x) => {
			this.context.fillRect(x, y, 1, 1);
		})
	}
}

const perlin = new Perlin();