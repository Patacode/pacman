/**
* Represents an immutable 2D Position.
*/
class Position{
	
	/**
	* Constructs a 2D Position with the given row and column.
	*
	* @param row {number} the row index
	* @param column {number} the column index
	*/
	constructor(row, column){
		this._row = row;
		this._column = column;
	}

	/**
	* Gets the row index of this Position.
	*
	* @return {number} the row index of this Position.
	*/
	get row(){
		return this._row;
	}

	/**
	* Gets the column index of this Position.
	*
	* @return {number} the column index of this Position.
	*/
	get column(){
		return this._column
	}

	/**
	* Returns the next position of this Position using the given direction.
	*
	* @param direction {Direction} the direction to take
	*
	* @return {Position} a new Position pointing to the given direction.
	*/
	nextPosition(direction){
		let row, column;
		row = this.row - direction.deltaColumn;
		column = this.column + direction.deltaRow;

		row = row < 0 ? RAW_MAZE.table.length - 1 : row >= RAW_MAZE.table.length ? 0 : row;
		column = column < 0 ? RAW_MAZE.table[0].length - 1 : column >= RAW_MAZE.table[0].length ? 0 : column; 	

		return new Position(row, column);
	}

	/**
	* Checks if this Position is equal to the given position. Two positions are equal if their
	* rows and columns are both respectively equal.
	*
	* @param position {Position} the position to compare
	*
	* @return {boolean} true if this Position is equal to the given position, false otherwise.
	*/
	equals(position){
		return position.row == this.row && position.column == this.column;
	}

	/**
	* Returns the default string representation of this object which is represented
	* by its column and row position.
	*
	* @return {string} the default string representation of this object.
	*/
	toString(){
		return `(${this.row};${this.column})`;
	}
}
