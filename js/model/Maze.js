/**
* Represents a Maze object for the game Pac-man.
*/
class Maze{
	
	/**
	* Constructs a new Maze based on the given maze object describing
	* the internal structure of the maze.
	* 
	* @param rawMaze {object} the maze object
	*/
	constructor(rawMaze){
		if(!this._isValid(rawMaze))
			throw new Error("The given raw maze object is not valid, " 
			+ " it must have a 'table' property set to a valid array value");

		this._wallLayer = new Layer(rawMaze.table.length, rawMaze.table[0].length);
		this._dotLayer = new Layer(rawMaze.table.length, rawMaze.table[0].length);
		this._nbDots = 0;
		
		// init the maze's layers
		for(let i = 0; i < rawMaze.table.length; i++){
			for(let j = 0; j < rawMaze.table[i].length; j++){
				const currentPosition = new Position(i, j);
				switch(rawMaze.table[i][j]){
					case WALL_ID:
						this._wallLayer.setTile(currentPosition, new Wall(currentPosition.toString()));
						break;
					case DOT_ID: 
						this._dotLayer.setTile(currentPosition, new Dot(currentPosition.toString()));
						this._nbDots++;
						break;
					case ENERGIZER_ID: 
						this._dotLayer.setTile(currentPosition, new Dot(currentPosition.toString(), true));
						this._nbDots++;
						break;
					case PACMAN_RESPAWN_ID: 
						this._pacmanRespawn = currentPosition;
						break;
					case GHOST_RESPAWN_ID: 
						this._ghostRespawn = currentPosition;
						break;
					case TRAVERSABLE_WALL_ID: this._wallLayer.setTile(currentPosition, new Wall(currentPosition.toString(), true));
				}
			}
		}
	}

	/**
	* Gets the tile found at the given position from the walls's layer if the position
	* is not out of bounds.
	*
	* @param position {Position} the position at which a tile want be retrieved
	*
	* @throws Error if the given position is out of bounds
	*
	* @return {Tile} the tile found at the given position or 'undefined' if not tile was found.
	*/
	getWallLayerTile(position){
		if(!this._wallLayer.contains(position))
			throw new Error(`The given position ${position} is not valid`);

		return this._wallLayer.getTile(position);
	}

	/**
	* Gets the tile found at the given position from the dots's layer if the position
	* is not out of bounds.
	*
	* @param position {Position} the position at which a tile want be retrieved
	*
	* @throws Error if the given position is out of bounds
	*
	* @return {Tile} the tile found at the given position or 'undefined' if not tile was found.
	*/
	getDotLayerTile(position){
		if(!this._dotLayer.contains(position))
			throw new Error(`The given position ${position} is not valid`);

		return this._dotLayer.getTile(position);
	}

	/**
	* Checks if is possible to walk at the given position. More formally, checks if
	* the given position is inside tha Maze and if there is no wall at this position.
	*
	* @param position {Position} the position to check
	*
	* @return {boolean} true if the position is insde the Maze and if it is possible to walk at the given position, false otherwise.
	*/
	canWalkOn(currentPosition, newPosition){
		return this._wallLayer.contains(newPosition) 
			&& (!this._wallLayer.hasTile(newPosition) 
			|| (this._wallLayer.getTile(newPosition).isTraversable 
			&& new Position(currentPosition.row - 1, currentPosition.column).equals(newPosition)));
	}

	/**
	* Checks if is possible to pick a pac-dot at the given position. More formally, checks if
	* the given position is inside the Maze and if there is a dot at this position.
	*
	* @param position {Position} the position to check
	*
	* @return {boolean} true if the position is inside the Maze and if there is a dot at the given position, false otherwise.
	*/
	canPick(position){
		return this._dotLayer.contains(position) && this._dotLayer.hasTile(position);
	}

	/**
	* Returns the pac-dot or the energizer found at the given position.
	*
	* @param position {Position} to position at which to take the dot
	*
	* @throws Error if the given position cannot be picked according to the canPick(position) method
	*
	* @return {Dot} the dot found at the given position which can either be a pac-dot or an energizer.
	*/
	pick(position){
		if(!this.canPick(position))
			throw new Error("There is no pac-dot to pick at the given position");

		const pickedTile = this._dotLayer.getTile(position);
		this._dotLayer.setTile(position, undefined);
		this._nbDots--;

		return pickedTile;
	}

	/**
	* Checks if this Maze is empty. A maze is considered to be empty if all the dots
	* it contains have been eaten (by Pacman).
	*
	* @return {boolean} true if this Maze is empty, false otherwise.
	*/
	isEmpty(){
		return this._nbDots == 0;
	}

	/**
	* Gets the number of rows of this Maze.
	*
	* @return {number} the number of rows of this Maze.
	*/
	get nbRows(){
		return this._wallLayer.nbRows;
	}

	/**
	* Gets the number of columns of this Maze.
	*
	* @return {number} the number of columns of this Maze.
	*/
	get nbColumns(){
		return this._wallLayer.nbColumns;
	}

	/**
	* Gets the start position of Pacman.
	*
	* @return {Position} the start position of Pacman.
	*/
	get pacmanRespawn(){
		return this._pacmanRespawn;
	}

	/**
	* Gets the start position of a Ghost.
	*
	* @return {Position} the start position a Ghosth.
	*/
	get ghostRespawn(){
		return this._ghostRespawn;
	}

	/**
	* Checks if the given raw maze object is valid. A valid raw maze object has a property
	* of table that has a valid array as value.
	*
	* @return {boolean} true if the given raw maze object is valid, false otherwise.
	*/
	_isValid(rawMaze){
		return typeof rawMaze == "object" && rawMaze.table && Array.isArray(rawMaze.table);
	}
}
