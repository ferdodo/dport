import Command from 'dport/lib/command';

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
	json: SshTunnelJson;

	constructor(s: SshTunnelJson = {}) {
		this.json = {
			label: s.label ?? "My port forward",
			externalPort: s.externalPort ?? 8080,
			internalPort: s.internalPort ?? 8080,
			internalHost: s.internalHost ?? "localhost",
			targetHost: s.targetHost ?? "192.168.1.1",
			targetSshPort: s.targetSshPort ?? "22",
			user: s.user ?? "user",
			state: s.state ?? State.Stopped
		};

		if (this.isStarted){
			this.#command = new Command('ssh', [
				"-p",
				`${this.json.targetSshPort}`,
				"-L",
				`${this.json.externalPort}:${this.json.internalHost}:${this.json.internalPort}`,
				`${this.json.user}@${this.json.targetHost}`,
				"sleep",
				"infinity"
			]);
		}

		Object.freeze(this);
		Object.freeze(this.json);
	}

	get isStarted(){
		return this.json.state === State.Started;
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
