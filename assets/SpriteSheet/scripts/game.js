//------------------------------------------------------------------
//
// This function provides the "game" code.
//
//------------------------------------------------------------------
MyGame.main = (function(objects, graphics, input) {
	'use strict';

	var lastTimeStamp = performance.now(),
		myKeyboard = input.Keyboard(),
		creep1 = objects.AnimatedModel( {
			spriteSheet : 'images/creep1-blue.png',
			spriteCount : 6,
			spriteTime : [1000, 200, 100, 1000, 100, 200],	// milliseconds per sprite animation frame
			center : { x : 23, y : 23 },
			rotation : 0,
			orientation : 0,				// Sprite orientation with respect to "forward"
			moveRate : 200 / 1000,			// pixels per millisecond
			rotateRate : 3.14159 / 1000		// Radians per millisecond
		}),
		creep2 = objects.AnimatedModel( {
			spriteSheet : 'images/creep2-red.png',
			spriteCount : 4,
			spriteTime : [200, 1000, 200, 600],	// milliseconds per sprite animation frame
			center : { x : 23, y : 50 + 23 },
			rotation : 0,
			orientation : 0,				// Sprite orientation with respect to "forward"
			moveRate : 200 / 1000,			// pixels per millisecond
			rotateRate : 3.14159 / 1000		// Radians per millisecond
		}),
		creep3 = objects.AnimatedModel( {
			spriteSheet : 'images/creep3-green.png',
			spriteCount : 4,
			spriteTime : [1000, 200, 200, 200],	// milliseconds per sprite animation frame
			center : { x : 23, y : 100 + 23 },
			rotation : 0,
			orientation : 0,				// Sprite orientation with respect to "forward"
			moveRate : 200 / 1000,			// pixels per millisecond
			rotateRate : 3.14159 / 1000		// Radians per millisecond
		}),
		spider = objects.AnimatedMoveModel( {
			spriteSheet : 'images/spider.png',
			spriteCount : 10,
			spriteTime : [200, 200, 200, 200, 200, 200, 200, 200, 200, 200],	// milliseconds per sprite animation frame
			center : { x: 32, y: 150 + 32 },
			rotation : 0,
			orientation : 1.570795 * 3,		// Sprite orientation with respect to "forward"
			moveRate : 50 / 1000,			// pixels per millisecond
			rotateRate : 3.141590 / 2 / 1000	// Radians per millisecond
		});

	//------------------------------------------------------------------
	//
	// Process the registered input handlers here.
	//
	//------------------------------------------------------------------
	function processInput(elapsedTime) {
		myKeyboard.update(elapsedTime);
	}
	
	//------------------------------------------------------------------
	//
	// Update the state of the "model" based upon time.
	//
	//------------------------------------------------------------------
	function update(elapsedTime) {
		creep1.update(elapsedTime);
		creep2.update(elapsedTime);
		creep3.update(elapsedTime);
		spider.update(elapsedTime);
	}

	//------------------------------------------------------------------
	//
	// Render the state of the "model", which is just our texture in this case.
	//
	//------------------------------------------------------------------
	function render() {
		graphics.clear();
		creep1.render();
		creep2.render();
		creep3.render();
		spider.render();
	}

	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {

		var elapsedTime = time - lastTimeStamp;
		lastTimeStamp = time;

		processInput(elapsedTime);
		update(elapsedTime);
		render();

		requestAnimationFrame(gameLoop);
	}

	console.log('game initializing...');

	//
	// Create the keyboard input handler and register the keyboard commands
	myKeyboard.registerCommand(KeyEvent.DOM_VK_W, creep1.moveForward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_S, creep1.moveBackward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_A, creep1.rotateLeft);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_D, creep1.rotateRight);

	myKeyboard.registerCommand(KeyEvent.DOM_VK_I, creep2.moveForward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_K, creep2.moveBackward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_J, creep2.rotateLeft);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_L, creep2.rotateRight);

	myKeyboard.registerCommand(KeyEvent.DOM_VK_UP, spider.moveForward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_DOWN, spider.moveBackward);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT, spider.rotateLeft);
	myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, spider.rotateRight);

	//
	// Get the game loop started
	requestAnimationFrame(gameLoop);
 
}(MyGame.objects, MyGame.graphics, MyGame.input));
