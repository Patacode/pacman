/**
* Represents a Loader object used to statically and dynamically loads
* content on a HTML page.
*/
class Loader{

	/**
	* The styles object defining the css properties of the 
	* element's container.
	*/
	static _stylesObject = {
		width: TILE_SIZE,
		height: TILE_SIZE
	}

	/**
	* Loads the metadata of this application (author name, id, group and professor).
	*/
	static load_metadata(){
		document.getElementById("author").textContent = AUTHOR;
		document.getElementById("id").textContent = ID;
		document.getElementById("group").textContent = GROUP;
		document.getElementById("professor").textContent = PROFESSOR;
	}
	
	/**
	* Loads the maze attached to the given maze object, as table:{mazeArray} (where mazeArray is a two-dimensional array)
	* in the node element of id 'maze'.  
	*
	* @param maze {Maze} the Maze to load
	*/
	static load_maze(maze){
		const mazeHeight = TILE_SIZE * maze.nbRows;
		const mazeWidth = TILE_SIZE * maze.nbColumns;
		const mazeElement = new Creator(document.getElementById("maze")).addStyles({width: mazeWidth, height: mazeHeight}).element;

		let leftOffset = 0;
		let topOffset = 0;
		for(let i = 0; i < maze.nbRows; i++){
			for(let j = 0; j < maze.nbColumns; j++){
				const dot  = maze.getDotLayerTile(new Position(i, j)); 
				const wall = maze.getWallLayerTile(new Position(i, j));
				let component;

				Loader._stylesObject.left = leftOffset;
				Loader._stylesObject.top = topOffset;
				if(dot){
					component = Creator.createComponent(dot.isEnergizer ? ENERGIZER_ID : DOT_ID, Loader._stylesObject);
					component.setAttribute("id", dot.id);
					mazeElement.appendChild(component);
				} else if(wall){
					component = Creator.createComponent(wall.isTraversable ? TRAVERSABLE_WALL_ID : WALL_ID, Loader._stylesObject);
					component.setAttribute("id", wall.id);
					mazeElement.appendChild(component);
				}
				
				leftOffset = (leftOffset + TILE_SIZE) % mazeWidth;
			}

			topOffset += TILE_SIZE;
		}
	}

	/**
	* Loads the given sprites into the maze of id 'maze'.
	*
	* @param arguments {object}[0..n] the sprites to load
	*/
	static load_sprites(){
		Array.from(arguments).forEach(sprite => Loader._load_sprite(sprite));
	}
	
	/**
	* Loads the pacman lives into the element of id 'pacmanLives'.
	*
	* @param pacman {Pacman} the pacman for which the number of lifes want to be load
	*/
	static load_pacmanLives(pacman){
		const livesElement = document.getElementById("pacmanLives");

		Loader._stylesObject.top = -(TILE_SIZE + 5);
		Loader._stylesObject.width += 5;
		Loader._stylesObject.height += 5;

		for(let i = 1; i <= pacman.nbLives; i++){
			Loader._stylesObject.left = -i * (TILE_SIZE + 5);
			
			const lifeComponent = Creator.createComponent(HEART_ID, Loader._stylesObject);
			lifeComponent.removeAttribute("id");
			livesElement.appendChild(lifeComponent);
		}

		Loader._stylesObject.width -= 5;
		Loader._stylesObject.height -= 5;
	}

	/**
	* Loads the given high score into the element of id 'high-score'.
	*
	* @param highScore {number} the high score to load
	*/
	static load_highScore(highScore){
		const scoreElement = document.getElementsByClassName("high-score");
		Array.from(scoreElement).forEach(element => element.textContent = highScore);
	}

	/**
	* Loads the game over dimmer. This method has to be called when the game
	* is over.
	*/
	static load_gameOver(){
		const dimmerElement = document.getElementById("dimmer-gameOver");
		dimmerElement.setAttribute("style", "display: block;");
	}

	/**
	* Refreshes the maze by removing all its child nodes (and other related nodes) and reloading 
	* it using the load_maze(Maze) method.
	*
	* @param maze {Maze} the maze to refresh
	*/
	static refresh_maze(maze){
		const mazeElement = document.getElementById("maze");
		const components = document.querySelectorAll("#maze > div");	

		// remove all the components inside the maze
		for(let i = 0; i < components.length; i++){
			mazeElement.removeChild(components[i]);
		}

		Loader.load_maze(maze);
	}

	/**
	* Refreshes the pacman lives according to the remaining number of lives of the given Pacman.
	*
	* @param pacman {Pacman} the pacman for which the number of lifes want to be refreshed
	*/
	static refresh_pacmanLives(pacman){
		const lifes = document.querySelectorAll("#pacmanLives > div");
		for(let i = pacman.nbLives; i < lifes.length; i++){
			lifes[i].childNodes[0].setAttribute("class", "empty-heart");
		}
	}

	/**
	* Refreshes the given sprites by updating their position.
	*
	* @param arguments {object}[0..n] the sprites to refresh
	*/
	static refresh_sprites(feederFlag, sprites){
		if(feederFlag){
			sprites.forEach(sprite => {
				if(sprite.eatable)
					Loader._adjustGhostImagePosition(sprite);
				else
					Loader._backToOriginalGhostImagePosition(sprite);
			});
		} else{
			sprites.forEach(sprite => Loader._backToOriginalGhostImagePosition(sprite));
		}

		sprites.forEach(sprite => Loader._refresh_sprite(sprite));
	}


	/**
	* Refreshes the dots present in the maze of id 'maze' relating to the
	* position of the given Pacman sprite.
	*
	* @param pacmanSprite {Pacman} the Pacman sprite
	*/
	static refresh_dots(removedDot){
		if(removedDot){
			const mazeElement = document.getElementById("maze");
			const dotElement = document.getElementById(removedDot.id);

			if(dotElement)
				mazeElement.removeChild(dotElement);
		}
	}
	
	/**
	* Refreshes the game score using the given score.
	*
	* @param score {number} the score of the current game
	*/
	static refresh_score(score){
		const scoreElement = document.getElementsByClassName("current-score");
		Array.from(scoreElement).forEach(element => element.textContent = score);
	}

	/**
	* Refreshes the high score using the given value.
	*
	* @param highScore {number} the high score to refresh
	*/
	static refresh_highScore(highScore){
		const highScoreElement = document.getElementsByClassName("high-score");
		Array.from(highScoreElement).forEach(element => element.textContent = highScore);
	}
	
	/**
	* Loads the given sprite into the maze of id 'maze'.
	*
	* @param sprite {Sprite} the sprite to load
	*/
	static _load_sprite(sprite){
		Loader._stylesObject.left = sprite.position.column * TILE_SIZE;
		Loader._stylesObject.top = sprite.position.row * TILE_SIZE;

		const mazeElement = document.getElementById("maze");
		const spriteComponent = Creator.createComponent(Number(sprite.id), Loader._stylesObject);	
		mazeElement.appendChild(spriteComponent);
	}
	
	/**
	* Refreshes the position of the given sprite.
	*/
	static _refresh_sprite(sprite){
		const spriteElement = document.getElementById("_" + sprite.id);
		Loader._stylesObject.left = sprite.position.column * TILE_SIZE;
		Loader._stylesObject.top = sprite.position.row * TILE_SIZE;

		new Creator(spriteElement).addStyles(Loader._stylesObject);
	}

	/**
	* Adjusts the image position of the given ghost to point on the dead ghost image.
	*/
	static _adjustGhostImagePosition(ghost){
		if(ghost instanceof Ghost){
			for(const direction in SPRITE_IMAGE_POSITIONS[ghost.id]){
				CURRENT_SPRITE_IMAGE_POSITIONS[ghost.id][direction] = DEAD_GHOST_IMAGE_POSITIONS[ghost.id][direction];
			}
		}
	}
	
	/**
	* Adjusts the image position of the given ghost to return to its initial image position.
	*/
	static _backToOriginalGhostImagePosition(ghost){
		for(const direction in SPRITE_IMAGE_POSITIONS[ghost.id]){
			CURRENT_SPRITE_IMAGE_POSITIONS[ghost.id][direction] = SPRITE_IMAGE_POSITIONS[ghost.id][direction];
		}
	}
}
