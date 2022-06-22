/**
* Represents a Listener object able to listen to events.
*/
class Listener{
	
	/**
	* Constructs a new Listener using the given event target and type.
	*
	* To actually listen to the given event type on the given target, the
	* method listen(function) has to be called.
	*
	* @param eventTarget {object} the object element this Listener will be able to listen to
	* @param eventType {string} the type of event to trigger
	*/
	constructor(eventTarget, eventType){
		if(!eventTarget.nodeType)
			throw new InvalidDataTypeException("The given event target must be a valid node element");
		else if(typeof eventType != "string")
			throw new InvalidDataTypeException("The given event type must be of type string");

		this._eventTarget = eventTarget;
		this._eventType   = eventType;
	}

	/**
	* Gets the event targget linked to this Listener.
	*
	* @return {object} the element on which the event occurs.
	*/
	get eventTarget(){
		return this._eventTarget;
	}

	/**
	* Get the event type linked to this Listener.
	*
	* @return {string} the event type describing the event that occurs on the event target.
	*/
	get eventType(){
		return this._eventType;
	}

	/**
	* Listens to the event described by the eventType of this Listener using the given callback.
	*
	* @param callbackEvent {function} the callback to invoke when listening to the event
	*/
	listen(eventCallback){
		this.eventTarget.addEventListener(this.eventType, eventCallback);
	}
}
