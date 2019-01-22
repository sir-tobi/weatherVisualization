let scale;
let projectiles = [];
let isMirrored = true;

function setup () {
	createCanvas(windowWidth, windowHeight);
	background(0);
	smooth();
	noStroke();
	scale = loadImage("scale3.png");
}

function draw () {
	background(0);
	if (dataReady) {
		for (let i = 0; i < 3; i++) {
			displayTemperature(i);
			displayGroundWetness(i);
			displayRain(i);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function displayTemperature (index) {
		let tempOnScale = ((myWeather[index].temperature + 10) * 0.01 * scale.width * 2.5);
		let c = scale.get(int(tempOnScale), scale.height / 2);
		fill(c);
		if (isMirrored) {
			rect((2 - index) * (windowWidth/3),  0, (windowWidth/3), (windowHeight/3 * 2));
		} else {
			rect(index * (windowWidth/3),  0, (windowWidth/3), (windowHeight/3 * 2));
		}
  }

  function displayGroundWetness (index) {
		let factor = 0;
		if (myWeather[index].isRaining()) {
			factor = factor + 2.0;
		}
		
		factor = factor + (myWeather[index].rain3h * 2 - 0.1);

		if (!myWeather[index].isCloudy()) {
			factor = factor + 1.0;
		}

		factor = factor - (myWeather[index].windSpeed / 100);

		if (myWeather[index].temperature >= 0) {
			factor = factor - (myWeather[index].temperature / 300);
		} else {
			factor = factor + (myWeather[index].temperature / 300);
		}

		if (isMirrored) {
			if (factor >= 1.0) {
				fill(0, 0, 255);
				rect((2-index) * (windowWidth/3),  windowHeight * (2/3), (windowWidth/3), (windowHeight/3 * 2));
			} else {
				fill(255, 255, 255);
				rect((2-index) * (windowWidth/3),  windowHeight * (2/3), (windowWidth/3), (windowHeight/3 * 2));
			}
		} else {
			if (factor >= 1.0) {
				fill(0, 0, 255);
				rect(index * (windowWidth/3),  windowHeight * (2/3), (windowWidth/3), (windowHeight/3 * 2));
			} else {
				fill(255, 255, 255);
				rect(index * (windowWidth/3),  windowHeight * (2/3), (windowWidth/3), (windowHeight/3 * 2));
			}
		}
  }

  function displayRain (index) {
		if (myWeather[index].isRaining()) {
			if (isMirrored) {
				if (random(0, 1) > 0.9) {
					projectiles.push(new Projectile(int(random(windowWidth * (2-index) / 3, windowWidth * (1 + (2-index)) / 3)), int(random(0, windowHeight)), windowHeight / 6));
				}
	
				projectiles.forEach(function(element) {
					if (element.w > 1) {
						element.display();
					}
				});
				projectiles = projectiles.filter(element => element.w >= 0);
			} else {
				if (random(0, 1) > 0.9) {
					projectiles.push(new Projectile(int(random(windowWidth * (index) / 3, windowWidth * (1 + index) / 3)), int(random(0, windowHeight)), windowHeight / 6));
				}
	
				projectiles.forEach(function(element) {
					if (element.w > 1) {
						element.display();
					}
				});
				projectiles = projectiles.filter(element => element.w >= 0);
			}
		}
  }

  function mirror () {
	  isMirrored = !isMirrored;
  }

  class Projectile {
	  constructor (x, y, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.c = color(random(0, 180));
	  }

	  display () {
			noStroke();
			fill(0, 0, 255); 
			this.w = this.w - 2;
			rect(this.x, 0, this.w, this.w*2);
	}
}