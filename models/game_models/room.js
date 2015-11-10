var uuid = require('node-uuid');
var RoomState = require('./roomstate.js');
var GameState = require('./gamestate.js');

var Room = function Room() {
	this.roomId = uuid.v4();
	this.players = [];
	this.roomState = RoomState.EMPTY;
	this.gameState = GameState.IN_GAME_LOBBY;
	
	// if player is provided, push them to the room and change room state
	if(arguments.length > 0) {
		console.log(arguments);
		for(var i in arguments) {
			this.players.push(arguments[i]);
		}

		this.updateRoomState();
	}
}

Room.prototype = {
	getRoomId: function() {
		return this.roomId;
	},

	getSinglePlayer: function(id) {
		for(var i in this.players) {
			if(this.players[i].id == id) {
				return this.players[i];
			}
		}
	},

	getPlayers: function() {
		return this.players;
	},

	getAllPlayersReady: function() {
		var numReady = 0;
		for(var i in this.players) {
			if(this.players[i].ready) {
				numReady += 1;
			}
		}

		console.log('Number of players ready: ' + numReady);
		return numReady == 2; // just make sure that two players are ready for now, because it's only a two player game
	},

	togglePlayerReady: function(id) {
		for(var i in this.players) {
			if(this.players[i].id == id) {
				this.players[i].ready = !this.players[i].ready;
				console.log(this.players[i]);
			}
		}
	},

	getRoomState: function() {
		return this.roomState;
	},

	getGameState: function() {
		return this.gameState;
	},

	addPlayer: function(player) {
		if(this.roomState != RoomState.FULL) {
			this.players.push(player);

			this.updateRoomState();
		}
	},

	removePlayer: function(id) {
		for(var i in this.players) {
			if(this.players[i].id == id) {
				this.players.splice(i);
			}
		}

		this.updateRoomState();
		return true;
	},

	startGame: function() {
		this.gameState = GameState.GAME_IN_PROGRESS;
	},

	updateRoomState: function() {
		console.log('Old room state: ' + this.roomState);

		if(this.players.length == 0) {
			this.roomState = RoomState.EMPTY;
		}
		else if(this.players.length == 1) {
			this.roomState = RoomState.AVAILABLE;
		}
		else if(this.players.length == 2) {
			this.roomState = RoomState.FULL;
		}

		console.log('New room state: ' + this.roomState);
	},

	updateGameState: function(newGameState) {
		this.gameState = newGameState;
	}
}

module.exports = Room;