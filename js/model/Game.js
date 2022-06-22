/**
* Represents the game model of the application made up with 
* a maze and sprites moving into it.
*/
class Game{
	
	/**
	* Constructs a new Game initialized from the given raw maze object.
	*
	* @param rawMaze {object} the raw maze object
	*/
	constructor(rawMaze){

		// scores
		const highScore = localStorage.getItem("highScore");
		this._score = 0;
		this._highScore = !highScore ? 0 : Number(highScore);
		this._ghostMultiplier = 1;
		
		// feed
		this._feederFlag = false;
		this._feederFlagCounter = 0;
		this._feederFlagTimer = 0;

		// game components and sprites
		this._removedDot = null;
		this._maze = new Maze(rawMaze);
		this._pacman = new Pacman(this.maze.pacmanRespawn, Direction.WEST);
		this._blinkyGhost = new Ghost(this.maze.ghostRespawn, BLINKY_ID);
		this._pinkyGhost = new Ghost(this.maze.ghostRespawn, PINKY_ID);
		this._inkyGhost = new Ghost(this.maze.ghostRespawn, INKY_ID);
		this._clydeGhost = new Ghost(this.maze.ghostRespawn, CLYDE_ID);
		
		this._sprites = [this.pacman, this.blinky, this.pinky, this.inky, this.clyde];
		this._ghosts = [this.blinky, this.pinky, this.inky, this.clyde]; 
	}

	/**
	* Gets the Maze object attached to this Game.
	*
	* @return {Maze} the maze attached to this Game.
	*/
	get maze(){
		return this._maze;
	}

	/**
	* Gets the Pacman object attached to this Game.
	*
	* @return {Pacman} the pacman attached to this Game.
	*/
	get pacman(){
		return this._pacman;
	}

	/**
	* Gets the blinky Ghost attached to this Game.
	*
	* @return {Ghost} the blinky Ghost attached to this Game.
	*/
	get blinky(){
		return this._blinkyGhost;
	}

	/**
	* Gets the pinky Ghost attached to this Game.
	*
	* @return {Ghost} the pinky Ghost attached to this Game.
	*/
	get pinky(){
		return this._pinkyGhost;
	}

	/**
	* Gets the inky Ghost attached to this Game.
	*
	* @return {Ghost} the inky Ghost attached to this Game.
	*/
	get inky(){
		return this._inkyGhost;
	}

	/**
	* Gets the clyde Ghost attached to this Game.
	*
	* @return {Ghost} the clyde Ghost attached to this Game.
	*/
	get clyde(){
		return this._clydeGhost;
	}
	
	/**
	* Get the current score of this Game.
	*
	* @return {number} the score of this Game.
	*/
	get score(){
		return this._score;
	}

	/**
	* Gets the highest score obtained by playing to the game.
	*
	* @return {number} the highest score obtained.
	*/
	get highScore(){
		return this._highScore
	}

	/**
	* Gets the last dot eaten by Pacman during this Game.
	*
	* @return {Dot} the last removed dot.
	*/
	get removedDot(){
		return this._removedDot;
	}

	/**
	* Gets the value of the feeder flag attached to this Game. This flag is used to determine
	* if pacman can eat the ghosts and will be set to true only if he eats an energizer.
	*
	* @return {boolean} true if pacman can eat the ghosts, false otherwise.
	*/
	get feederFlag(){
		return this._feederFlag;
	}

	/**
	* Moves the sprites attached to this game by changing their position when the
	* user press an arrow key (for Pacman) or automatically (for the ghosts). 
	*/
	moveSprites(){
		// move the sprites
		this._sprites.forEach(sprite => this._moveSprite(sprite));

		// checks if pacman can eat a dot
		if(this.maze.canPick(this.pacman.position)){
			const pickedTile = this.maze.pick(this.pacman.position);
			this._removedDot = pickedTile;
			this._score += pickedTile.isEnergizer ? SUPER_DOT_SCORE : DOT_SCORE;
			if(pickedTile.isEnergizer){
				this._feederFlag = true; // pacman can eat
				this._ghosts.forEach(ghost => ghost.becomeEatable()); // ghosts become eatable
				this._feederFlagCounter = 0; 
				this._feederFlagTimer = 0;
				this._ghostMultiplier = 1;
			}
		}

		// checks if the ghosts can eat pacman or if pacman can eat the ghost (depending on the feeder flag)
		if(!this.feederFlag){
			if(this._canEatPacman()){
				this.pacman.hasBeenEaten();
			}
		} else{
			if(this._feederFlagCounter < this._ghosts.length && this._feederFlagTimer <= Math.round(PACMAN_FEEDER_TIME / RUN_INTERVAL)){
				if(this._canEatPacman()){
					this.pacman.hasBeenEaten();
					this._feederFlag = false;
				}

				const eatenGhosts = this._getEatenGhosts();
				eatenGhosts.forEach(i => {
					this._ghosts[i].hasBeenEaten();
					this._score += GHOST_SCORE * this._ghostMultiplier;
					this._ghostMultiplier *= 2;
					this._feederFlagCounter++;
				});
				this._feederFlagTimer++;
			} else{
				this._feederFlag = false;
				this._ghosts.forEach(ghost => ghost.becomeUneatable());
			}
		}
	}

	/**
	* Checks if this Game is over. A game is considered to be over if the number of
	* lifes of pacman has reached 0.
	*
	* @return {boolean} true if this Game is over, false otherwise.
	*/
	isGameOver(){
		return this.pacman.nbLives == 0;
	}
	
	/**
	* Checks if Pacman has been eaten. Pacman is considered as having been eaten
	* if its getter isDead returns true.
	*
	* @return {boolean} true if Pacman has been eaten (by a ghost), false otherwise.
	*/
	pacmanHasBeenEaten(){
		return this.pacman.isDead;
	}

	/**
	* Checks if at least one ghost has been eaten.
	*
	* @return {boolean} true if at least one ghost has been eaten.
	*/
	ghostHasBeenEaten(){
		for(let i = 0; i < this._ghosts.length; i++){
			if(this._ghosts[i].isDead){
				return true;
			}
		}

		return false;
	}

	/**
	* Respawns all the dead ghosts.
	*/
	respawnGhosts(){
		this._ghosts.forEach(ghost => {
			if(ghost.isDead){
				ghost.respawn();
			}
		});
	}

	/**
	* Respawns every sprite of the game at their initial position using the
	* respawn() method on each one of them.
	*/
	respawn(){
		this._sprites.forEach(sprite => sprite.respawn());
	}

	/**
	* Saves the current score as high score if it is higher than it. The score
	* will also be saved into the local storage of the web browser.
	*/
	saveScore(){
		if(this.score > this.highScore){
			localStorage.setItem("highScore", this.score);
			this._highScore = this.score;
		}
	}

	/**
	* Checks if the current level has been succeed. A level is passed when the
	* Pacman has eaten all the dots present in the maze.
	*
	* @return {boolean} true if the current level has been succeed, false otherwise.
	*/
	lvlSucceed(){
		return this.maze.isEmpty();
	}

	/**
	* Pass to the next level using the constant RAW_MAZE object. 
	* All the game components are reinitialized (maze and sprites).
	*/
	nextLevel(){
		if(!this.lvlSucceed())
			throw new IllegalStateException("The current level is not yet finished");

		this._removedDot = null;
		this._maze = new Maze(RAW_MAZE);
		this.respawn();
	}


	/**
	* Moves a sprite. If he asked to change its direction and the new direction can be taken, then
	* the sprite will use this new direction. In the case where it is not possible to take the new 
	* direction, the sprite keep its current direction if it still possible, or will not move if it is not.
	*	
	* Moreover, in the case of a ghost sprite, when the up above constraints cannot be applied, the sprite
	* will asked to change its direction in a non-blocked direction.
	*
	* @param sprite {Sprite} the sprite to move
	*/
	_moveSprite(sprite){
		const newPositionSameDirection = sprite.position.nextPosition(sprite.direction);		

		if(sprite.askedToChangeDirection){
			const askedDirection = sprite.askedDirection;
			const newPositionNextDirection = sprite.position.nextPosition(askedDirection);

			if(this.maze.canWalkOn(sprite.position, newPositionNextDirection)){
				sprite.changeDirection();
				sprite.move();
			} else if(this.maze.canWalkOn(sprite.position, newPositionSameDirection)){
				sprite.move();
			} else{ // for the ghosts
				const blockedDirections = this._getBlockedDirections(sprite);
				sprite.notifyIsBlocked(blockedDirections);
			}
		} else{ // initial move
			if(this.maze.canWalkOn(sprite.position, newPositionSameDirection)){
				sprite.move();
			} else{ // for the ghosts
				const blockedDirections = this._getBlockedDirections(sprite);
				sprite.notifyIsBlocked(blockedDirections);
			}
		}
	}

	/**
	* Checks if at least one ghost can eat Pacman. They have to be 'uneatable' to eat Pacman.
	*
	* @return {boolean} true if one of the ghosts can eat Pacman, false otherwise.
	*/
	_canEatPacman(){
		for(const ghost of this._ghosts){
			if(!ghost.eatable && ghost.canEat(this.pacman))
				return true;
		}

		return false;
	}

	/**
	* Checks if Pacman can eat a ghost.
	*
	* @return {boolean} true if Pacman can eat at least one ghost, false otherwise.
	*/
	_canEatGhost(){
		for(const ghost of this._ghosts){
			if(this.pacman.canEat(ghost))
				return true;
		}

		return false;
	}

	/**
	* Gets the eaten ghosts as an array containing their related indexes to be used with
	* the _ghosts array. The array will be empty if no ghosts have been eaten.
	*
	* @return {object} an array containing the indexes of all the eaten ghosts.
	*/
	_getEatenGhosts(){
		const eatenGhosts = [];
		for(let i = 0, j = 0; i < this._ghosts.length; i++){
			if(this.pacman.canEat(this._ghosts[i]))
				eatenGhosts[j++] = i;
		}

		return eatenGhosts;
	}

	/**
	* Gets an array containing all the directions the given sprite cannot take.
	*
	* @param sprite {Sprite} the sprite to check
	*
	* @return {object} an array containing all the directions the given sprite cannot take.
	*/
	_getBlockedDirections(sprite){
		const directions = Direction.keys;
		const blockedDirections = [];

		for(let i = 0, j = 0; i < Direction.keys.length; i++){
			const newPosition = sprite.position.nextPosition(directions[i]);
			if(!this.maze.canWalkOn(sprite.position, newPosition))
				blockedDirections[j++] = directions[i];
		}
		
		return blockedDirections;
	}
}
