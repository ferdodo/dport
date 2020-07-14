enum State {
	Started,
	Stopped,
}

export default class Redirection {
	#ipcRenderer: any;
	#externalPort: number;
	#internalPort: number;
	#internalHost: string;
	#targetHost: string;
	#targetSshPort: string;
	#user: string;
	#state: State;

	constructor(
		ipcRenderer: any,
		externalPort = 8080,
		internalPort = 8080,
		internalHost = "localhost",
		targetHost = "192.168.1.10",
		targetSshPort = "22",
		user = "user",
		state = State.Stopped
	) {
		this.#externalPort = externalPort;
		this.#internalPort = internalPort;
		this.#internalHost = internalHost;
		this.#targetHost = targetHost;
		this.#targetSshPort = targetSshPort;
		this.#user = user;
		this.#state = state;
		this.#ipcRenderer = ipcRenderer;
	}

	setValue(property: string, value: any) {
		const obj = { [property]: value };

		return new Redirection(
			this.#ipcRenderer,
			obj.externalPort || this.#externalPort,
			obj.internalPort || this.#internalPort,
			obj.internalHost || this.#internalHost,
			obj.targetHost || this.#targetHost,
			obj.targetSshPort || this.#targetSshPort,
			obj.user || this.#user,
			this.#state
		);
	}

	get externalPort() {
		return this.#externalPort;
	}

	get internalPort() {
		return this.#internalPort;
	}

	get internalHost() {
		return this.#internalHost;
	}

	get targetHost() {
		return this.#targetHost;
	}

	get targetSshPort() {
		return this.#targetSshPort;
	}

	get user() {
		return this.#user;
	}

	get isStarted() {
		return this.#state === State.Started;
	}

	setStart() {
		return new Redirection(
			this.#ipcRenderer,
			this.#externalPort,
			this.#internalPort,
			this.#internalHost,
			this.#targetHost,
			this.#targetSshPort,
			this.#user,
			State.Started
		);
	}

	setStop() {
		return new Redirection(
			this.#ipcRenderer,
			this.#externalPort,
			this.#internalPort,
			this.#internalHost,
			this.#targetHost,
			this.#targetSshPort,
			this.#user,
			State.Stopped
		);
	}

	async start() {
		await this.#ipcRenderer.invoke("startRedirection", {
			externalPort: this.#externalPort,
			internalPort: this.#internalPort,
			internalHost: this.#internalHost,
			targetHost: this.#targetHost,
			targetSshPort: this.#targetSshPort,
			user: this.#user,
		});
	}

	async stop() {
		await this.#ipcRenderer.invoke("stopRedirection", {
			externalPort: this.#externalPort,
		});
	}

	toJSON() {
		return {
			externalPort: this.#externalPort,
			internalPort: this.#internalPort,
			internalHost: this.#internalHost,
			targetHost: this.#targetHost,
			targetSshPort: this.#targetSshPort,
			user: this.#user,
		};
	}
}
