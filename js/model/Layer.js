/**
* Represents a set of tiles on which different procedures can be applied.
*/
class Layer{
	
	/**
	* Constructs a new Layer represented as a two-dimensional matrix, with the
	* given number of rows and columns.
	*
	* @param nbRows {number} the number of rows
	* @param nbColumns {number} the number of columns
	*/
	constructor(nbRows, nbColumns){
		if(typeof nbRows != "number" || typeof nbColumns != "number")
			throw new InvalidDataTypeException("The given number of rows and columns must be of type number");

		this._layer = Array(nbRows).fill().map(() => Array(nbColumns).fill()); // fill with undefined values by default
		this._nbRows = nbRows;
		this._nbColumns = nbColumns;
	}

	/**
	* Gets the number of rows of this Layer.
	*
	* @return {number} the number of rows of this Layer.
	*/
	get nbRows(){
		return this._nbRows;
	}

	/**
	* Gets the number of columns of this Layer.
	*
	* @return {number} the number of columns of this Layer.
	*/
	get nbColumns(){
		return this._nbColumns;
	}

	/**
	* Checks if the given position is inside this Layer.
	*
	* @param position {Position} the position to check
	*
	* @return {boolean} true if the given position is inside this Layer, false otherwise.
	*/
	contains(position){
		return position instanceof Position 
			&& position.row >= 0 
			&& position.column >= 0 
			&& position.row < this._layer.length 
			&& position.column < this._layer[0].length;
	}

	/**
	* Sets the given tile at the given position in this Layer if the position is not
	* out of bounds.
	*
	* @param position {Position} the position where to set the tile
	* @param tile {Tile} the tile to set
	*
	* @throws Error if the given position is out of bounds
	*/
	setTile(position, tile){
		if(tile && !(tile instanceof Tile))
			throw new InvalidDataTypeException("The given tile must be null, undefined or castable into a valid Tile object");
		else if(!this.contains(position))
			throw new Error(`The given position ${position} is not valid`);

		this._layer[position.row][position.column] = tile;
	}

	/**
	* Gets the tile found at the given position is the position is not out of bounds.
	*
	* @param position {Position} the position at which a tile want to be retrieved
	*
	* @throws Error if the given position is out of bounds
	*
	* @return {Tile} the tile found at the given position or 'undefined' if there were no tile found.
	*/
	getTile(position){
		if(!this.contains(position))
			throw new Error(`The given position ${position} is not valid`);

		return this._layer[position.row][position.column];	
	}

	/**
	* Checks if there is a Tile at the given position.
	*
	* @param position {Position} the position to check
	*
	* @throws Error if the given position is out of bounds
	*
	* @return {boolean} true if a tile was found at the given position, false otherwise.
	*/
	hasTile(position){
		if(!this.contains(position))
			throw new Error(`The given position ${position} is not valid`);

		return this._layer[position.row][position.column] != undefined;
	}
}
