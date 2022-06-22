/**
* Represents the main sprite of this application: Pacman.
*/
class Pacman extends Sprite{

	/**
	* Constructs a new Pacman sprite at the given position and initalized with the
	* given direction.
	*	
	* @param position {Position} the start position
	* @param direction {Direction} the initial direction
	*/
	constructor(position, direction){
		super(position, direction, PACMAN_ID);
		this._nbLives = PACMAN_LIFES;
		this._animateSprite();
		this._eatable = true;
	}

	/**
	* Gets the number of remaining lifes of this Pacman.
	*
	* @return {number} the number of remaining lifes of this Pacman.
	*/
	get nbLives(){
		return this._nbLives;
	}
	
	/**
	* Declares this Pacman as having been eaten and decrement its number
	* of lifes by one.
	*/
	hasBeenEaten(){
		super.hasBeenEaten();
		this._nbLives--;
	}

	/**
	* Revives this Sprite after having been eaten and changes its position, direction,
	* and previous position to their inital value.
	*/
	respawn(){
		super.respawn();
		this._eatable = true;
	}
}
