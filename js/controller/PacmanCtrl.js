/**
* Represents the Pacman Controller used to control a Pacman sprite.
*/
class PacmanCtrl{
	
	/**
	* Constructs a new Pacman controller using the given Pacman sprite.
	*
	* @param pacmanSprite {Pacman} the pacman sprite to control
	*/
	constructor(pacmanSprite){
		if(!(pacmanSprite instanceof Pacman))
			throw new InvalidDataTypeException("The given pacman sprite must be castable into a valid Pacman object");

		this._pacman = pacmanSprite;
	}

	/**
	* Calls the askToChangeDirection(Direction) method on the Pacman object of this class using the
	* given direction.
	*
	* @param direction {Direction} the requested direction
	*/
	askToChangeDirection(direction){
		if(!(direction instanceof Direction))
			throw new InvalidDataTypeException("The given direction must be castable into a valid Direction object");

		this._pacman.askToChangeDirection(direction);
	}
}
