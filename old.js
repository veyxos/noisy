/**
 * Random function
 * @param {number} max Maximal value
 * @param {number} min Minimal value (defaults to 0)
 * @returns {number} Random float
 */
function random (max, min = 0) {
	return Math.random() * (max - min) + min;
}

class Perlin {
	constructor() {
		this.canvas = document.querySelector('#canvas');
		this.context = this.canvas.getContext('2d');
		this.firstOctave = [];
		this.secondOctave = [];
		this.thirdOctave = [];
		this.init();

		window.addEventListener('resize', this.init);
	}

	setDimensions() {
		this.width = this.canvas.scrollWidth;
		this.height = this.canvas.scrollHeight;
		console.log('Width: %d\nHeight: %d', this.width, this.height);
	}

	interpolate(p, q, n) {
		let res = [];
		// Richtungsvektor generieren
		const r = (q - p) / n;
		for (let i = 0; i < n; i++) {
			res.push(p + r * n);
		}
		return res;
	}



	init() {
		this.setDimensions();

		// Erste Oktave erstellen
		let firstRandom = [];
		for (let i = 0; i < this.width / 10; i++) {
			firstRandom.push(random(this.height));
		}
		console.log(firstRandom);
		
		for (let i = 0; i < firstRandom.length; i++) {
			this.firstOctave.push(firstRandom[i])
			if (i < firstRandom.length) {
				const werte = this.interpolate(firstRandom[i], firstRandom[i + 1], this.width / 10 - 1);
				this.firstOctave = this.firstOctave.concat(werte);
			}
		}

		console.log("Erste Oktave:", this.firstOctave);
	}

	print(arr) {
		this.context.fillStyle = `rgba(255, 255, 255, 1)`;
		arr.forEach(pos => {
			this.context.fillRect(pos[0], pos[1], 1, 1);
		});
	}

	
	
}

const perlin = new Perlin();