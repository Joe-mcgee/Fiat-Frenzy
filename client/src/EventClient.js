import EventEmitter from "events";
import React from "react";
export default class EventClient {
	constructor() {
		this.eventEmitter = new EventEmitter();
	}

	on(event, listener) {
		this.eventEmitter.on(event, listener)
	}
	emit(event, payload, error = false) {
		this.eventEmitter.emit(event, payload, error)
	}
	getEventEmitter() {
		return this.eventEmitter;
	}
}
