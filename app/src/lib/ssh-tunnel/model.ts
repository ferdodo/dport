export enum State {
	Started,
	Stopped
}

export interface SshTunnelJson {
	label?: string;
	externalPort?: number;
	internalPort?: number;
	internalHost?: string;
	targetHost?: string;
	targetSshPort?: string;
	user?: string;
	state?: State;
}

const defaultSshTunnel: SshTunnelJson = {
	label: "My port forward",
	externalPort: 8080,
	internalPort: 8080,
	internalHost: "localhost",
	targetHost: "192.168.1.1",
	targetSshPort:"22",
	user: "user",
	state: State.Stopped
};

export default class SshTunnel {
	#props: SshTunnelJson;

	constructor(props: SshTunnelJson) {
		this.#props = { ...defaultSshTunnel, ...props };
		Object.freeze(this.#props);
	}

	set(props: SshTunnelJson) {
		return new SshTunnel({ ...this.#props, ...props });
	}

	get label() {
		return this.#props.label;
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

	get state() {
		return this.#props.state;
	}

	get json() : SshTunnelJson {
		return this.#props;
	}

	get isStarted(){
		return this.#props.state === State.Started;
	}

	get isStopped(){
		return this.#props.state === State.Stopped;
	}
}
