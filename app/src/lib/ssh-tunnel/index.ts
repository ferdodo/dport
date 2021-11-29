import Command from '../command';

export enum State {
	Started,
	Stopped
};

export interface SshTunnelJson {
	label?: string;
	externalPort?: number;
	internalPort?: number;
	internalHost?: string;
	targetHost?: string;
	targetSshPort?: string;
	user?: string;
	state?: State;
};

export default class SshTunnel {
	#command;
	label: string;
	externalPort: number;
	internalPort: number;
	internalHost: string;
	targetHost: string;
	targetSshPort: string;
	user: string;
	state: State;

	constructor(s: SshTunnelJson = {}) {
		this.label = s.label ?? "My port forward";
		this.externalPort = s.externalPort ?? 8080;
		this.internalPort = s.internalPort ?? 8080;
		this.internalHost = s.internalHost ?? "localhost";
		this.targetHost = s.targetHost ?? "192.168.1.1";
		this.targetSshPort = s.targetSshPort ?? "22";
		this.user = s.user ?? "user";
		this.state = s.state ?? State.Stopped;

		if (this.isStarted){
			this.#command = new Command('ssh', [
				"-p",
				`${this.targetSshPort}`,
				"-L",
				`${this.externalPort}:${this.internalHost}:${this.internalPort}`,
				`${this.user}@${this.targetHost}`,
				"sleep",
				"infinity"
			]);
		}

		Object.freeze(this);
	}

	get json(){
		return {
			label: this.label,
			externalPort: this.externalPort,
			internalPort: this.internalPort,
			internalHost: this.internalHost,
			targetHost: this.targetHost,
			targetSshPort: this.targetSshPort,
			user: this.user,
			state: this.state
		};
	}

	get isStarted(){
		return this.state === State.Started;
	}

	set(props: SshTunnelJson) {
		return new SshTunnel({ ...this.json, ...props });
	}

	async stop() {
		await this.#command.kill();
		return this.set({ state: State.Stopped });
	}

	async waitEnd() {
		await this.#command.waitEnd();
		return this.set({ state: State.Stopped });
	}
}
