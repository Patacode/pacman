// general configuration
const TILE_SIZE = 15; // in px
const RUN_INTERVAL = 300; // in ms
const GHOST_DIRECTION_CHANGE_INTERVAL = 4000; // in ms
const PACMAN_LIFES = 2;
const DOT_SCORE = 10;
const SUPER_DOT_SCORE = 100;
const GHOST_SCORE = 200;
const PACMAN_FEEDER_TIME = 10000; // in ms

// game components and sprites
const PACMAN_ID = 21;
const BLINKY_ID = 22;
const PINKY_ID = 23;
const INKY_ID = 24;
const CLYDE_ID = 25;
const WALL_ID = 1;
const DOT_ID = 2;
const ENERGIZER_ID = 3;
const PACMAN_RESPAWN_ID = 4;
const GHOST_RESPAWN_ID = 5;
const TRAVERSABLE_WALL_ID = 6;
const HEART_ID = 7;

const CURRENT_SPRITE_IMAGE_POSITIONS = {
	21: {
		west: [
			{x: 0, y: 0},
			{x: -20, y: 0},
			{x: -40, y: 0}
		],

		east: [
			{x: 0, y: -20},
			{x: -20, y: -20},
			{x: -40, y: 0}
		],

		north: [
			{x: 0, y: -40},
			{x: -20, y: -40},
			{x: -40, y: 0}
		],

		south: [
			{x: 0, y: -60},
			{x: -20, y: -60},
			{x: -40, y: 0}
		]
	},

	22: {
		west: [
			{x: -80, y: -82},
			{x: -100, y: -82}
		],

		east: [
			{x: -120, y: -82},
			{x: -140, y: -82}
		],

		north: [
			{x: 0, y: -82},
			{x: -20, y: -82}
		],

		south: [
			{x: -40, y: -82},
			{x: -60, y: -82}
		]
	},

	23: {
		west: [
			{x: -80, y: -102},
			{x: -100, y: -102}
		],

		east: [
			{x: -120, y: -102},
			{x: -140, y: -102}
		],

		north: [
			{x: 0, y: -102},
			{x: -20, y: -102}
		],

		south: [
			{x: -40, y: -102},
			{x: -60, y: -102}
		]

	},

	24: {
		west: [
			{x: -80, y: -122},
			{x: -100, y: -122}
		],

		east: [
			{x: -120, y: -122},
			{x: -140, y: -122}
		],

		north: [
			{x: 0, y: -122},
			{x: -20, y: -122}
		],

		south: [
			{x: -40, y: -122},
			{x: -60, y: -122}
		]

	},

	25: {
		west: [
			{x: -80, y: -142},
			{x: -100, y: -142}
		],

		east: [
			{x: -120, y: -142},
			{x: -140, y: -142}
		],

		north: [
			{x: 0, y: -142},
			{x: -20, y: -142}
		],

		south: [
			{x: -40, y: -142},
			{x: -60, y: -142}
		]
	}
};

const SPRITE_IMAGE_POSITIONS = {
	21: {
		west: [
			{x: 0, y: 0},
			{x: -20, y: 0},
			{x: -40, y: 0}
		],

		east: [
			{x: 0, y: -20},
			{x: -20, y: -20},
			{x: -40, y: 0}
		],

		north: [
			{x: 0, y: -40},
			{x: -20, y: -40},
			{x: -40, y: 0}
		],

		south: [
			{x: 0, y: -60},
			{x: -20, y: -60},
			{x: -40, y: 0}
		]
	},

	22: {
		west: [
			{x: -80, y: -82},
			{x: -100, y: -82}
		],

		east: [
			{x: -120, y: -82},
			{x: -140, y: -82}
		],

		north: [
			{x: 0, y: -82},
			{x: -20, y: -82}
		],

		south: [
			{x: -40, y: -82},
			{x: -60, y: -82}
		]
	},

	23: {
		west: [
			{x: -80, y: -102},
			{x: -100, y: -102}
		],

		east: [
			{x: -120, y: -102},
			{x: -140, y: -102}
		],

		north: [
			{x: 0, y: -102},
			{x: -20, y: -102}
		],

		south: [
			{x: -40, y: -102},
			{x: -60, y: -102}
		]

	},

	24: {
		west: [
			{x: -80, y: -122},
			{x: -100, y: -122}
		],

		east: [
			{x: -120, y: -122},
			{x: -140, y: -122}
		],

		north: [
			{x: 0, y: -122},
			{x: -20, y: -122}
		],

		south: [
			{x: -40, y: -122},
			{x: -60, y: -122}
		]

	},

	25: {
		west: [
			{x: -80, y: -142},
			{x: -100, y: -142}
		],

		east: [
			{x: -120, y: -142},
			{x: -140, y: -142}
		],

		north: [
			{x: 0, y: -142},
			{x: -20, y: -142}
		],

		south: [
			{x: -40, y: -142},
			{x: -60, y: -142}
		]
	}
};

const DEAD_GHOST_IMAGE_POSITIONS = {
	21: {
		west: [
			{x: 0, y: 0},
			{x: -20, y: 0},
			{x: -40, y: 0}
		],

		east: [
			{x: 0, y: -20},
			{x: -20, y: -20},
			{x: -40, y: 0}
		],

		north: [
			{x: 0, y: -40},
			{x: -20, y: -40},
			{x: -40, y: 0}
		],

		south: [
			{x: 0, y: -60},
			{x: -20, y: -60},
			{x: -40, y: 0}
		]
	},

	22: {
		west: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		east: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		north: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		south: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		]
	},

	23: {
		west: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		east: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		north: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		south: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		]

	},

	24: {
		west: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		east: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		north: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		south: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		]

	},

	25: {
		west: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		east: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		north: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		],

		south: [
			{x: 0, y: -162},
			{x: -20, y: -162}
		]
	}
};

