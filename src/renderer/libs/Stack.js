class Stack {
	constructor() {
		this.dataStore = [];
		this.top = 0;
		// this.push = push;
		// this.pop = pop;
		// this.peek = peek;
		// this.clear = clear;
		// this.length = length;
	}

	push(element) {
		this.dataStore[this.top++] = element;
	}

	pop() {
		return this.dataStore[--this.top];
	}

	peek() {
		return this.dataStore[this.top-1];
	}

	clear() {
		this.top = 0;
	}

	length() {
		return this.top;
	}
}

// export default Stack;

let stack = new Stack();
stack.push("hello")
console.log(stack.length())