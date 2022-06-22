/**
* Represents a sprite direction.
*/
class Direction{

	/**
	* Constructs a new Direction with the given delta column and row.
	*
	* Both arguments must either be of value 1 or -1 describing the up/bottom direction for
	* the column and right/left direction for the row respectively. The value of 0 is also
	* valid and indicates that column and/or row direction are null. For example, the direction
	* (0,1) describes a direction that strictly goes to the west.
	*
	* @param deltaColumn {number} the vertical direction
	* @param deltaRow {number} the horizontal direction
	*/
	constructor(deltaColumn, deltaRow){
		if(typeof deltaColumn != "number" || typeof deltaRow != "number")
			throw new InvalidDataTypeException("The arguments must be of type number");
		else if(deltaColumn < -1 || deltaColumn > 1)
			throw new Error("The given delta column must be >= -1 and <= 1");
		else if(deltaRow < -1 || deltaRow > 1)
			throw new Error("The given delta row must be >= -1 and <= -1");

		this._deltaColumn = deltaColumn;
		this._deltaRow = deltaRow;
	}

	/**
	* Gets the delta column of this Direction.
	*
	* @return {number} the delta column of this Direction.
	*/
	get deltaColumn(){
		return this._deltaColumn;
	}

	/**
	* Gets the delta row of this Direction.
	*
	* @return {number} the delta row of this Direction.
	*/
	get deltaRow(){
		return this._deltaRow;
	}
	
	/**
	* Determines if this Direction is equal to the given object. Two
	* directions are considered to be equal if their deltaColumns and deltaRows
	* are both respectively equal.
	*
	* Note that, if the given object is not castable into a Direction
	* object (according to the instanceof operator), this method will directly return false.
	*
	* @param direction {Direction} the direction compared
	*
	* @return {boolean} true if this Direction is equal to the given object, false otherwise.
	*/
	equals(obj){
		if(obj instanceof Direction){
			return obj.deltaColumn == this.deltaColumn && obj.deltaRow == this.deltaRow;
		}

		return false;
	}

	/**
	* Returns the default string representation of this object which is represented
	* by its delta column and row.
	*
	* @return {string} the default string representation of this object.
	*/
	toString(){
		return `(${this.deltaColumn};${this.deltaRow})`;
	}

	/**
	* Gets an array containing all the constant directions defined by this class.
	*
	* @return {object} an array containing all the constant directions of this class.
	*/
	static get keys(){
		const directions = [];
		let i = 0;

		for(const field in Direction){
			directions[i++] = Direction[field];
		}

		return directions;
	}
}


/* enumerable constant properties for the class */

// East direction
Object.defineProperty(Direction, "EAST", {
	value: new Direction(0, 1),
	enumerable: true
});

// West direction
Object.defineProperty(Direction, "WEST", {
	value: new Direction(0, -1),
	enumerable: true
});

// North direction
Object.defineProperty(Direction, "NORTH", {
	value: new Direction(1, 0),
	enumerable: true
});

// South direction
Object.defineProperty(Direction, "SOUTH", {
	value: new Direction(-1, 0),
	enumerable: true
});
