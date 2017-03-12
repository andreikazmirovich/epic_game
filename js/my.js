var pjs = new PointJS("2d", 600, 300,{
	backgroundColor : "white",
	border : "1px solid grey"
});

pjs.system.initFullScreen();
// pjs.system.initFullPage();

var game = pjs.game;
var key = pjs.keyControl.initKeyControl();
var sWidth = screen.width;
var sHeight = screen.height - 100;
var count = 0;

var movSide = "down";

	// var img = pjs.tiles.newImage("img/100_150_12.png");
	// var audio = pjs.audio.newAudio("../music/main2.mp3");
	var img = pjs.tiles.newImage("img/100_150_12(2).png");
	var audio = pjs.audio.newAudio("../music/main4.mp3");
	// var audio = pjs.audio.newAudio("../music/main5.mp3");

	var auraCount = 0;
	var aura_sound = pjs.audio.newAudio("../music/aura_sound.mp3");

var main_pers = game.newAnimationObject({
	animation: img.getAnimation(0, 0, 100, 150, 12),
	w: 100, h: 150,
	x: Math.round(Math.random() * 1500),
	y: Math.round(Math.random() * 700)
});

var aura = game.newImageObject({
	file: "../img/range.png",
	x: Math.round(Math.random() * 1500),
	y: Math.round(Math.random() * 700),
	h: 50,
	w: 50
});


main_pers.moving = function (speed) {
	if(key.isDown("SHIFT")){
		speed *= 2;
		main_pers.setDelay(7);

		if(key.isDown("DOWN") || key.isDown("S")){
			this.y += speed;
			main_pers.drawFrames(0, 2);
			movSide = "down";
		}
		else if(key.isDown("UP") || key.isDown("W")){
			this.y -= speed;
			main_pers.drawFrames(3, 5);
			movSide = "up";
		}
		else if(key.isDown("RIGHT") || key.isDown("D")){
			this.x += speed;
			main_pers.drawFrames(6, 8);
			movSide = "right";
		}
		else if(key.isDown("LEFT") || key.isDown("A")){
			this.x -= speed;
			main_pers.drawFrames(9, 11);
			movSide = "left";
		}
		else{
			switch (movSide) {
				case "down":
					main_pers.drawFrame(1);
					break;
				case "up":
					main_pers.drawFrame(4);
					break;
				case "right":
					main_pers.drawFrame(7);
					break;
				case "left":
					main_pers.drawFrame(10);
					break;
			}
		}
	}
	else {
		main_pers.setDelay(10);

		if(key.isDown("DOWN") || key.isDown("S")){
			this.y += speed;
			main_pers.drawFrames(0, 2);
			movSide = "down";
		}
		else if(key.isDown("UP") || key.isDown("W")){
			this.y -= speed;
			main_pers.drawFrames(3, 5);
			movSide = "up";
		}
		else if(key.isDown("RIGHT") || key.isDown("D")){
			this.x += speed;
			main_pers.drawFrames(6, 8);
			movSide = "right";
		}
		else if(key.isDown("LEFT") || key.isDown("A")){
			this.x -= speed;
			main_pers.drawFrames(9, 11);
			movSide = "left";
		}
		else{
			switch (movSide) {
				case "down":
					main_pers.drawFrame(1);
					break;
				case "up":
					main_pers.drawFrame(4);
					break;
				case "right":
					main_pers.drawFrame(7);
					break;
				case "left":
					main_pers.drawFrame(10);
					break;
			}
		}
	}
	console.log(main_pers.x);
}

game.newLoop("main", function () {
	game.clear();
	audio.play();
	audio.setVolume(0.1);
	aura_sound.setVolume(0.3);
	
	main_pers.moving(2);
	aura.draw();

	pjs.brush.drawText({
	  text : "Your aura's: " + auraCount, 
	  x : 10, y : 10, 
	  color : "white",
	  size: 25
	});

	/*if (main_pers.x > sWidth || main_pers.x < 0 || main_pers.y > sHeight || main_pers.y < 0) {
		main_pers.x = Math.round(Math.random() * 1500);
		main_pers.y = Math.round(Math.random() * 700);
	}*/

	if((main_pers.x < aura.x && main_pers.x + main_pers.w > aura.x + aura.w) && (main_pers.y < aura.y && main_pers.y + main_pers.h > aura.y + aura.h)){
		++count;

		aura_sound.play();
		auraCount++;
		main_pers.x = Math.round(Math.random() * 1500);
		main_pers.y = Math.round(Math.random() * 700);
		aura.x = Math.round(Math.random() * 1500);
		aura.y = Math.round(Math.random() * 700);
	}
});

game.startLoop("main");
