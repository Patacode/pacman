/**
* Represents an immutable game component.
*/
class Component{
	
	/**
	* Constructs a new Component with the given id. The given id is
	* automatically converted into string using the toString() method.
	*
	* @param id {any} the component id
	*/	
	constructor(id){
		this._id = id.toString();
	}

	/**
	* Gets the id of this component.
	*
	* @return {string} the id of this component.
	*/
	get id(){
		return this._id;
	}

	/**
	* Returns the default string representation of this object which is represented
	* by its unique id.
	*
	* @return {string} the default string representation of this object.
	*/
	toString(){
		return this.constructor.name + ":" + this.id;
	}
}
