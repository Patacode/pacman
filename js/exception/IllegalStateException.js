/**
* Thrown when a function or object is invoked/constructed in an inappropriate
* state.
*/
class IllegalStateException extends Error{
	
	/**
	* Constructs a new IllegalStateException with the given message
	*
	* @param message {string} the exception message
	*/
	constructor(message){
		super(message);
		this.name = "IllegalStateException";
	}	
}
