/**
* Represents a Dot component that extends Tile.
*/
class Dot extends Tile{

	/**
	* Constructs a Dot component with the given id.
	*
	* @param id {string} the component id
	*/	
	constructor(id, isEnergizer){
		super(id);
		this._isEnergizer = isEnergizer ? true : false; 
	}

	/**
	* Checks if this Dot is an energizer or not.
	*
	* @return {boolean} true if this Dot is an energizer, false otherwise.
	*/
	get isEnergizer(){
		return this._isEnergizer;
	}
}

