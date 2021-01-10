export interface RedirectionJson {
	externalPort: number;
	internalPort: number;
	internalHost: string;
	targetHost: string;
	targetSshPort: string;
	user: string;
}

export default class Redirection {
	#props: RedirectionJson;

	constructor(props: RedirectionJson) {
		this.#props = {
			externalPort: props.externalPort || 8080,
			internalPort: props.internalPort || 8080,
			internalHost: props.internalHost || "localhost",
			targetHost: props.targetHost || "192.168.1.1",
			targetSshPort: props.targetSshPort || "22",
			user: props.user || "user"
		};
	}

	set(props: RedirectionJson) {
		return new Redirection({
			externalPort: props.externalPort || this.#props.externalPort,
			internalPort: props.internalPort || this.#props.internalPort,
			internalHost: props.internalHost || this.#props.internalHost,
			targetHost: props.targetHost || this.#props.targetHost,
			targetSshPort: props.targetSshPort || this.#props.targetSshPort,
			user: props.user || this.#props.user
		});
	}

	get externalPort() {
		return this.#props.externalPort;
	}

	get internalPort() {
		return this.#props.internalPort;
	}

	get internalHost() {
		return this.#props.internalHost;
	}

	get targetHost() {
		return this.#props.targetHost;
	}

	get targetSshPort() {
		return this.#props.targetSshPort;
	}

	get user() {
		return this.#props.user;
	}

	get json(): RedirectionJson {
		return {
			externalPort: this.#props.externalPort,
			internalPort: this.#props.internalPort,
			internalHost: this.#props.internalHost,
			targetHost: this.#props.targetHost,
			targetSshPort: this.#props.targetSshPort,
			user: this.#props.user
		};
	}
}
