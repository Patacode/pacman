/**
* Represents a mobile component able to change its position by moving in
* a certain direction. 
*/
class Sprite extends Component{

	/**
	* Used to point on the correct background position object 
	* while animating the sprite.
	*/
	_pointer = 0;
	
	/**
	* Constructs a new Sprite defined at a given position and direction and with the
	* specified id.
	*
	* @param position {Position} the sprite position.
	* @param direction {Direction} the sprite direction.
	* @param id {string} the id of the sprite
	*/	
	constructor(position, direction, id){
		if(!(position instanceof Position))
			throw new InvalidDataTypeException("The given position must be castable into a valid Position object");
		else if(!(direction instanceof Direction))
			throw new InvalidDataTypeException("The given direction must be castable into a valid Direction object");

		super(id);
		this._isDead = false;
		this._isMoving = false;
		this._eatable = false;
		
		// sprite position
		this._position = position;
		this._previousPosition = position;
		this._initialPosition = position;
	
		// sprite direction
		this._direction = direction;
		this._askedToChangeDirection = false;
		this._askedDirection;
		this._initialDirection = direction;
	}

	/**
	* Gets the position of this Sprite.
	*
	* @return {Position} the position of this Sprite.
	*/
	get position(){
		return this._position;
	}

	/**
	* Gets the previous position of this Sprite. If this Sprite
	* has not yet change its direction at least one time, this method will
	* return the same position as the getter position() method.
	*
	* @return {Position} the previous position of this Sprite.
	*/
	get previousPosition(){
		return this._previousPosition;
	}

	/**
	* Gets the direction of this Sprite.
	*
	* @return {Direction} the direction of this sprite.
	*/
	get direction(){
		return this._direction;
	}

	/**
	* Gets the last requested direction asked by this Sprite having used the askToChangeDirection(Direction) method.
	*
	* @return {Direction} the last asked direction of this Sprite.
	*/
	get askedDirection(){
		return this._askedDirection;
	}

	/**
	* Checks if this Sprite has asked to change its direction.
	*
	* @return {boolean} true if this Sprite has asked to change its direction, false otherwise.
	*/
	get askedToChangeDirection(){
		return this._askedToChangeDirection;
	}

	/**
	* Checks if this Sprite is dead.
	*
	* @return {boolean} true if this sprite is dead, false otherwise.
	*/
	get isDead(){
		return this._isDead;
	}

	/**
	* Checks if this sprite is moving. This sprite is considered to be in movement
	* when the move() method has been called at least once, and it is considered to not
	* be in movement whenever the respawn() or the notifyIsBlocked() method has been called.
	*
	* @return {boolean} true if this sprite is moving, false otherwise.
	*/
	get isMoving(){
		return this._isMoving;
	}

	/**
	* Gets the initial direction of this Sprite.
	*
	* @return {Direction} the initial direction of this Sprite.
	*/
	get initialDirection(){
		return this._initialDirection;
	}

	/**
	* Gets the initial position of this Sprite.
	*
	* @return {Position} the initial position of this Sprite.
	*/
	get initialPosition(){
		return this._initialPosition;
	}

	/**
	* Checks if this Sprite is 'eatable' or not. This information is used
	* to determine if this Sprite can be eaten or not.
	*
	* @return {boolean} true if this Sprite is 'eatable' false otherwise.
	*/
	get eatable(){
		return this._eatable;
	}

	/**
	* Declares this Sprite as having been eaten.
	*/
	hasBeenEaten(){
		this._isDead = true;
	}

	/**
	* Revives this Sprite after having been eaten and changes its position, direction,
	* and previous position to their inital value.
	*/
	respawn(){
		this._isDead = false;
		this._isMoving = false;
		this._eatable = false;
		this._position = this._previousPosition = this._initialPosition;
		this._direction = this._initialDirection;
		this._askedToChangeDirection = false;
		this._askedDirection = undefined;
	}

	/**
	* Changes the 'eatable' flag to true.
	*/
	becomeEatable(){
		this._eatable = true;
	}

	/**
	* Changes the 'eatable' flag to false.
	*/
	becomeUneatable(){
		this._eatable = false;
	}

	/**
	* Moves this Sprite using its current direction. This method modify
	* the current position of this Sprite using the nextPosition(Direction).
	*/
	move(){
		this._isMoving = true;
		this._previousPosition = this.position;
		this._position = this.position.nextPosition(this.direction);
	}

	/**
	* Requests for a change of direction. This method modify the
	* value of the 'askedToChangeDirection' field to true and the 
	* 'askedDirection' field to the given direction.
	*
	* @param direction {Direction} the requested direction
	*/
	askToChangeDirection(direction){
		if(!(direction instanceof Direction))
			throw new InvalidDataTypeException("The given direction must be castable into a valid Direction object");

		this._askedToChangeDirection = true;
		this._askedDirection = direction;
	}

	/**
	* Changes the direction of this Sprite. This method modify the current
	* direction of this sprite using the last requested direction.
	*/
	changeDirection(){
		if(!this.askedToChangeDirection)
			throw new IllegalStateException("No direction has been requested");

		this._direction = this.askedDirection;
	}

	/**
	* Notifys that this Sprite is blocked by asking for a new one.
	*/
	notifyIsBlocked(){
		this._isMoving = false;
	}
	
	/**
	* Checks if this Sprite can eat the given other sprite. A sprite can
	* eat one another if they are at the same position or if the previous position
	* of the given sprite is the current position of this Sprite.
	*
	* @param pacman {Sprite} the sprite to check if it can be eaten
	*
	* @return {boolean} true if the given sprite can be eaten, false otherwise.
	*/
	canEat(sprite){
		return sprite instanceof Sprite
			&& sprite.eatable
			&& sprite.position.row == this.position.row 
			&& sprite.position.column == this.position.column
			|| sprite.previousPosition.row == this.position.row
			&& sprite.previousPosition.column == this.position.column;
	}
	
	/**
	* Starts an interval that animates this Sprite when it moves depending 
	* on its direction.
	*/
	_animateSprite(){
		setInterval(() => {
			if(this.isMoving){
				const pos = this._getRightImageOfSprite();
				document.querySelector(`#_${this.id} > div`).style.backgroundPosition = `${pos.xPos}px ${pos.yPos}px`;
			} else{
				const x = CURRENT_SPRITE_IMAGE_POSITIONS[this.id][this._getDirectionName(this.direction)][0].x;
				const y = CURRENT_SPRITE_IMAGE_POSITIONS[this.id][this._getDirectionName(this.direction)][0].y;
				document.querySelector(`#_${this.id} > div`).style.backgroundPosition = `${x}px ${y}px`;
			}
		}, RUN_INTERVAL / 6);
	}

	/**
	* Gets the right image positions to use for this sprite relating to its direction and to the
	* the value of _pointer.
	*
	* @return {object} the XY positions to use to offset to the right image for this Sprite.
	*/
	_getRightImageOfSprite(){
		let pos;
		if(this.direction.equals(Direction.NORTH)){
			pos = this._chooseRightPosition("north");
		} else if(this.direction.equals(Direction.SOUTH)){
			pos = this._chooseRightPosition("south");
		} else if(this.direction.equals(Direction.EAST)){
			pos = this._chooseRightPosition("east");
		} else{
			pos = this._chooseRightPosition("west");
		}
		
		this._pointer = this._adjustPointer();
		return pos;
	}

	/**
	* Returns the XY positions to use for the given sprite ID, sprite direction and pointer value
	* referring to the SPRITE_IMAGE_POSITIONS variable.
	*/
	_chooseRightPosition(spriteDirection){
		let x, y;

		x = CURRENT_SPRITE_IMAGE_POSITIONS[this.id][spriteDirection][this._pointer].x;
		y = CURRENT_SPRITE_IMAGE_POSITIONS[this.id][spriteDirection][this._pointer].y;

		return {xPos: x, yPos: y};
	}

	/**
	* Adjusts the sprite pointer used to point on the proper image position for the sprite animation.
	*
	* @return {number} the next value for the pointer.
	*/
	_adjustPointer(){
		return (this._pointer + 1) % CURRENT_SPRITE_IMAGE_POSITIONS[this.id]["north"].length;
	}

	/**
	* Gets the direction name equals to the given direction if it exists.
	*
	* @param direction {Direction} the direction to translate
	*
	* @return {string} the name of the given direction or undefined if the given the given direction has no name.
	*/
	_getDirectionName(direction){
		for(const dir in Direction){
			if(Direction[dir].equals(direction))
				return dir.toLowerCase();
		}
	}
}
