/**
* Represents a ghost sprite able to eat Pacman.
*/
class Ghost extends Sprite{
	
	/**
	* Constructs a new Ghost sprite initialized at the given position and with the
	* given id.
	*	
	* @param position {Position} the start position
	* @param id {string} the id of the sprite
	*/
	constructor(position, id){
		super(position, Direction.NORTH, id); // begin always to the north
		this._choiceNewDirection();
		this._animateSprite();
	}

	/**
	* Notifys that this Ghost is blocked (typically, by a wall) by asking to change its direction. The new direction
	* taken by this Ghost will be deduced from the given array of directions (which contains all the blocked directions
	* this ghost cannot take) as one of the possible other directions.
	*
	* @param blockedDirections {object} the array containg the directions this Ghost cannot take
	*/
	notifyIsBlocked(blockedDirections){
		super.notifyIsBlocked();
		const directions = Direction.keys.filter(currentValue => !this._contains(blockedDirections, currentValue));
		const randomIndex = this._genRandomNumber(directions.length);

		this.askToChangeDirection(directions[randomIndex]);
	}

	/**
	* Starts a timing event at continuous interval (given by the constant GHOST_DIRECTION_CHANGE_INTERVAL defines
	* in the GameConfig class) during which this Ghost randomly change its direction. 
	*/
	_choiceNewDirection(){
		setInterval(() => {
			if(!this._inSpawn()){
				const directions = Direction.keys;
				const randomIndex = this._genRandomNumber(directions.length);
				this.askToChangeDirection(directions[randomIndex]);
			}
		}, GHOST_DIRECTION_CHANGE_INTERVAL);
	}

	/**
	* Generates a random number between the given bounds.
	*
	* @param startInclusive {number} the inclusive start
	* @param endExclusive {number} the exclusive end
	*
	* @return {number} a random number inlcuded between the interval formed by the given 
	* start (inclusive) and the given end (exclusive).
	*/
	_genRandomNumber(startInclusive, endExclusive){
		if(!endExclusive)
			return Math.floor(Math.random() * startInclusive);
	
		return Math.floor(Math.random() * (endExclusive - startInclusive) + startInclusive);
	}

	/**
	* Checks if the given array contains the given value using the equals(object) method.
	*
	* @param array {object} the array to process
	* @param value {object} the value to check for existency
	* 
	* @return {boolean} true if the given array contains the given value, false otherwise.
	*/
	_contains(array, value){
		for(const elem of array){
			if(elem.equals(value))
				return true;
		}

		return false;
	}

	/**
	* Checks if this Ghost is in its spawn.
	*
	* @return {boolean} true if the current position of this Ghost is in the spawn, false otherwise.
	*/
	_inSpawn(){
		const topLeft = this._getSpawnTopLeftPosition();
		const bottomRight = this._getSpawnBottomRightPosition();

		return this.position.row >= topLeft.row 
			&& this.position.row <= bottomRight.row 
			&& this.position.column >= topLeft.column 
			&& this.position.column <= bottomRight.column;
	}

	/**
	* Gets the top left position of the ghost spawn.
	*
	* @return {Position} the top left position of the ghost spawn.
	*/
	_getSpawnTopLeftPosition(){
		let row, column;

		for(column = this.initialPosition.column - 1; column > -1 && RAW_MAZE.table[this.initialPosition.row][column] != 1; column--);
		for(row = this.initialPosition.row - 1; row > -1 && RAW_MAZE.table[row][this.initialPosition.column] != 6; row--);
		return new Position(row, column + 1);
	}

	/**
	* Gets the bottom right position of the ghost spawn.
	*
	* @return {Position} the bottom right position of the ghost spawn.
	*/
	_getSpawnBottomRightPosition(){
		let row = 0, column = 0;

		for(column = this.initialPosition.column + 1; column < RAW_MAZE.table[0].length && RAW_MAZE.table[this.initialPosition.row][column] != 1; column++);	
		for(row = this.initialPosition.row + 1; row < RAW_MAZE.table.length && RAW_MAZE.table[row][this.initialPosition.column] != 1; row++);
		return new Position(row - 1, column - 1);
	}
}
