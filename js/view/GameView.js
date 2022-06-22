/**
* Represents the game view of the application which allows to interact with
* the application itself by loading the needed content. 
*/
class GameView{

	/**
	* Constructs a new GameView based on the given Game object.
	* 
	* Note that when calling this constructor, the component of the games as well as its metadata 
	* are alse loaded statically. To update the moving elements of the game, the method
	* updateFrames() have to be called. 
	*
	* @param game {Game} the game object to load
	* @param gameCtrl {GameCtrl} the game controller to use
	*/	
	constructor(game, gameCtrl){
		if(!(game instanceof Game))
			throw new InvalidDataTypeException("The given game must be castable into a valid Game object");
		else if(!(gameCtrl instanceof GameCtrl))
			throw new InvalidDataTypeException("The given game controller must be castable into a valid GameCtrl object");

		this.startGame();

		this._game = game;
		this._gameCtrl = gameCtrl;

		Loader.load_maze(this._game.maze);		
		Loader.load_metadata();
		Loader.load_sprites(this._game.pacman, this._game.blinky, this._game.pinky, this._game.inky, this._game.clyde);
		Loader.load_pacmanLives(this._game.pacman);
		Loader.load_highScore(this._game.highScore);
	}

	/**
	* Starts a new game using the Game controller wrapped in this object. The game is initiated when
	* the user click on the start button.
	*/
	startGame(){
		// click listener for start btn
		const startButtonElement = document.getElementById("start-btn");
		const clickEvent = new Listener(startButtonElement, "click");
		
		clickEvent.listen(eventObject => {
			const dimmerElement = document.getElementById("dimmer-start");
			dimmerElement.setAttribute("style", "display: none;");
			this._gameCtrl.startHasBeenRequested();
		});
	}

	/**
	* Updates the moving elements of the frame used by this GameView.
	*/
	updateFrames(){
		Loader.refresh_sprites(this._game.feederFlag, [this._game.pacman, this._game.blinky, this._game.pinky, this._game.inky, this._game.clyde]);
		Loader.refresh_dots(this._game.removedDot);
	}
	
	/**
	* Updates the number of lives of Pacman.
	*/
	updateLives(){
		Loader.refresh_pacmanLives(this._game.pacman);
	}

	/**
	* Update the scores. The high score is also updated when the current score become >= to it.
	*/
	updateScores(){
		Loader.refresh_score(this._game.score);
		if(this._game.score >= this._game.highScore)
			Loader.refresh_highScore(this._game.score);
	}

	/**
	* Displays the highest score ever obtained while playing to the game.
	*/
	displayGameOver(){
		Loader.load_gameOver();
		
		// click listener for retry btn
		const retryButtonElement = document.getElementById("retry-btn");
		const clickEvent = new Listener(retryButtonElement, "click");

		clickEvent.listen(evenObject => {
			window.location.reload();
		});
	}

	/**
	* Pass to the next level by calling the nextLevel() method on the Game instance wrapped by this object and
	* refreshes the entire maze and sprites and the other needed components.
	*/
	nextLevel(){
		if(!this._game.lvlSucceed())
			throw new Error("The current level hasn't yet been succeed");

		this._game.nextLevel();
		Loader.refresh_maze(this._game.maze);
		Loader.load_sprites(this._game.pacman, this._game.blinky, this._game.pinky, this._game.inky, this._game.clyde);
	}

}
