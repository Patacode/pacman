/**
* Thrown when the attempted data type of a function is not the one received.
*/
class InvalidDataTypeException extends Error{
	
	/**
	* Constructs a new InvalidDataTypeException with the given message.
	*
	* @param message {string} the exception message.
	*/
	constructor(message){
		super(message);
		this.name = "InvalidDataTypeException";
	}
}
