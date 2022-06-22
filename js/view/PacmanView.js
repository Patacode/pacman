/**
* Represents the view used by Pacman allowing to interact with him.
*/
class PacmanView{
	
	/**
	* Constructs a new PacmanView using the given Pacman controller.
	* 
	* Note that when invoking this constructor, the object will also listen to
	* the arrow keys pressed by the user.
	*
	* @param pacmanCtrl {PacmanCtrl} the pacman controller
	*/
	constructor(pacmanCtrl){
		if(!(pacmanCtrl instanceof PacmanCtrl))
			throw new InvalidDataTypeException("The given pacman controller must be castable into a valid PacmanCtrl object");

		this._pacmanCtrl = pacmanCtrl;

		const keyListener = new Listener(document, "keydown");
		keyListener.listen(eventObject => {
			eventObject.preventDefault(); // to prevent the page to scroll down/up 
			this._keyInteract(eventObject.key);
		});
	}

	/**
	* Makes a changement of direction request using the Pacman controller used by this PacmanView
	* depending on the given keyLabel. The keyLabel is assumed to be a valid arrow label between
	* 'Arrow[Left-Right-Up-Down]'.
	*
	* Note that this method should not be called directly on this object because it is already
	* called when the object is created.
	*
	* @param keyLabel {string} the key label of the pressed arrow
	*/
	_keyInteract(keyLabel){
		switch(keyLabel){
			case "ArrowLeft": // 37
				this._pacmanCtrl.askToChangeDirection(Direction.WEST);
				break;
			case "ArrowUp": // 38
				this._pacmanCtrl.askToChangeDirection(Direction.NORTH);
				break;
			case "ArrowRight": // 39
				this._pacmanCtrl.askToChangeDirection(Direction.EAST);
				break; // 40
			case "ArrowDown": this._pacmanCtrl.askToChangeDirection(Direction.SOUTH);
		}
	}
}
