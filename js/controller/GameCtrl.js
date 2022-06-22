/**
* Represents the game controller of this application.
*/
class GameCtrl{
	
	/**
	* Constructs a new Game controller using the needed game views and models.
	*/
	constructor(){
		this._model = new Game(RAW_MAZE);
		this._view  = new GameView(this._model, this);  
		this._pacmanCtrl = new PacmanCtrl(this._model.pacman);
		this._pacmanView = new PacmanView(this._pacmanCtrl);
	}

	/**
	* Runs the game by updating its component at a time interval
	* given by the RUN_INTERVAL constant until
	* the game ends (when Pacman has no more life).
	*/
	run(){
		const interval = 
			setInterval(() => {
				this._model.moveSprites();
				
				if(this._model.pacmanHasBeenEaten()){
					this._model.respawn();
				} else if(this._model.ghostHasBeenEaten()){
					this._model.respawnGhosts();
				}

				this._view.updateFrames();
				this._view.updateLives();
				this._view.updateScores();

				if(this._model.isGameOver()){
					clearInterval(interval);
					this._model.saveScore();
					this._view.displayGameOver();
				} else if(this._model.lvlSucceed()){
					this._view.nextLevel();
				}
			}, RUN_INTERVAL);
	}

	/**
	* Initiates the game by calling the run() method on this instance.
	*/
	startHasBeenRequested(){
		this.run();
	}
}
