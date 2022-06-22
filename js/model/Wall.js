/**
* Represents a Wall component that extends Tile.
*/
class Wall extends Tile{

	/**
	* Constructs a Wall component with the given id.
	*
	* @param id {string} the component id
	*/	
	constructor(id, isTraversable){
		super(id);
		this._isTraversable = isTraversable ? true : false;
	}

	/**
	* Checks if this Wall is traversable.
	*
	* @return {boolean} true if this Wall traversable, false otherwise.
	*/
	get isTraversable(){
		return this._isTraversable;
	}
}
