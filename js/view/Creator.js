/**
* Represents an element's Creator able to create and modify HTML node elements.
*
* All the functions return a reference to the currently used object allowing chained
* invokation.
*/
class Creator{

	/**
	* Constructs a new Creator object initialized with a new HTML node element if the given
	* value is not already a node, or directly with the given value if it does.
	*
	* If the given value is a node, it must be of type 1 (ELEMENT_NODE). 
	*
	* @param element {string, elementNode} the element to create/modify
	*/
	constructor(element){
		switch(element.nodeType){
			case 1:
				this._element = element;
				break;
			case undefined: 
				this._element = document.createElement(element);
				break;
			default: throw new Error("The given element is not valid");
		}
	}

	/**
	* Gets the HTML node element wrapped by this object.
	*
	* @return {object} the HTML node element wrapped by this object.
	*/
	get element(){
		return this._element;
	}

	/**
	* Adds the attributes attached to the given attribute object, as: {attrName}:{attrValue}, to the
	* HTML node element wrapped by this object.
	*
	* @param attributeObject {object} the attributes to add
	*
	* @return {object} this object.
	*/
	addAttributes(attributeObject){
		for(const attr in attributeObject){
			this.element.setAttribute(attr, attributeObject[attr]);
		}

		return this;
	}

	/**
	* Adds the style properties attached to the given styles object, as {propName}:{propValue}, to the
	* HTML node element wrapped by this object.
	*
	* By default, if the type of the corresponding {propValue} is 'number', then this value will use
	* the default size unit of px.
	*
	* @param stylesObject {object} the styles to add
	*
	* @return {object} this object.
	*/
	addStyles(stylesObject){
		let styles = "";
		for(const prop in stylesObject){
			styles += `${prop}:${stylesObject[prop]}`;
			if(typeof stylesObject[prop] === "number")
				styles += "px";
			styles += ";";
		}

		this.element.setAttribute("style", styles);

		return this;
	}

	/**
	* Adds the given classes to HTML node element wrapped by this object. The given classes
	* are passed using the varargs feature.
	*
	* @param arguments {array}[0..n] the classes to add   
	*
	* @return {object} this object.
	*/
	addClasses(){
		for(const classElem of arguments){
			this.element.classList.add(classElem);
		}

		return this;
	}

	/**
	* Swaps the old class with the new class on the HTML node element wrapped by this
	* object.
	*
	* @param oldClass {string} the old class to change
	* @param newClass {string} the new class to add
	*/
	swapClasses(oldClass, newClass){
		this.element.classList.remove(oldClass);
		this.element.classList.add(newClass);
	}

	/**
	* Adds the given children to the HTML node element wrapped by this object. The given
	* classes are passed using the varargs feature.
	*
	* @param arguments {array}[0..n] the children node element to add
	*
	* @return {object} this object.
	*/
	addChildren(){
		for(const child of arguments){
			this.element.appendChild(child);
		}

		return this;
	}

	/**
	* Creates an HTML node element (seen as a game component) based on the given component id (which 
	* defines the type of component to create) and on the given styles object (which defines, among others, the 
	* positioning of the component relating to its origin) as {styleProperty}:{propertyValue}.
	*
	* @param componentId {number} the id of the component to create
	* @param stylesObject {object} the styles of the component (positioning, dimension and others)
	*
	* @return {object} a new HTML node element representing the requested component or 'undefined' if the given component id
	* has no related component.
	*/
	static createComponent(id, stylesObject){
		switch(id){
			case WALL_ID: return Creator._createStaticComponent(["component", "wall"], ["circle-wall"], 20, id, stylesObject);
			case TRAVERSABLE_WALL_ID: return Creator._createStaticComponent(["component"], ["traversable-wall"], 50, id, stylesObject);
			case DOT_ID: return Creator._createStaticComponent(["component"], ["circle-pacDot"], 20, id, stylesObject);
			case ENERGIZER_ID: return Creator._createStaticComponent(["component"], ["circle-energizer"], 60, id, stylesObject)
			case PACMAN_ID: 
			case BLINKY_ID:
			case PINKY_ID:
			case INKY_ID:
			case CLYDE_ID: return Creator._createStaticComponent(["component"], [], 100, id, stylesObject)
			case HEART_ID: return Creator._createStaticComponent(["component"], ["heart"], 70, id, stylesObject);
		}
	}

	/**
	* Creates a static component in a container of size indicates by the stylesObject. The container
	* will have the given containerClasses, the same for the component with the componentClasses. The 
	* component will use the given relative size (seen as a precentage value) that defines its relative size 
	* depending on its container. 
	*
	* In addition, note that the component will automatically be centered in its container and that the container
	* will used the given stylesObject to define its size and positioning, among others.
	*
	* Note that both container and component are created from divs and that an underscore character (_) will systematically be 
	* added in front of the given component id, to prevent ids beginning with a number. 
	*
	* @param containerClasses {object} the array containing the classes for the container
	* @param componentClasses {object} the array containing the classes for the component
	* @param componentRelativeSize {number} the relative size of the component relating to its container (seen as a percentage value)
	* @param componentId {string} the id of the component
	* @param stylesObject {object} the object containing the styles to add to the component's container
	*
	* @return {object} a new HTML node element representing a static component.
	*/
	static _createStaticComponent(containerClasses, componentClasses, componentRelativeSize, componentId, stylesObject){
		const container = new Creator("div");
		const component = new Creator("div");
		const componentSize = Creator._getPercentageOf(stylesObject.width, componentRelativeSize);
		
		componentClasses.forEach(componentClass => component.addClasses(componentClass));
		component.addStyles({
			width: componentSize,
			height: componentSize,
			top: TILE_SIZE / 2 - componentSize / 2,
			left: TILE_SIZE / 2 - componentSize / 2
		});
		
		containerClasses.forEach(containerClass => container.addClasses(containerClass));
		container
			.addChildren(component.element)
			.addStyles(stylesObject)
			.addAttributes({id: "_" + componentId});

		return container.element;
	}

	/**
	* Gets the given percentage of the given value.
	*
	* @param value {number} the value to which a certain percentage want be taken
	* @param percentage {number} the percentage of the given value to get
	*
	* @return {number} the given percentage of the given value.
	*/
	static _getPercentageOf(value, percentage){
		return percentage / 100 * value;
	}
}
