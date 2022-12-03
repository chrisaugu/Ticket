function Iterator() {
	this.dataStore = [];
	this.pos = 0;


	this.move = function() {
		if (0 == this.dataStore.length) return false;
		else return true;
	}
	this.pos = function() {
		return pos;
	}
}

export default Iterator;