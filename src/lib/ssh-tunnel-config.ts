import { SshTunnel, State, SshTunnelJson } from "dport/lib/ssh-tunnel";
import { dbGet, dbSet } from "dport/lib/nosql-db";

export class SshTunnelConfig {
	#sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel>) {
		this.#sshTunnels = [...sshTunnels];
		dbSet("config", this.json);
	}

	get size() : number {
		return this.#sshTunnels.length;
	}

	get json() : SshTunnelJson[] {
		return this.#sshTunnels
			.map(sshTunnel => sshTunnel.set({ 'state': State.Stopped }))
			.map(sshTunnel => sshTunnel.json);
	}

	* [Symbol.iterator]() {
		for (const s of this.#sshTunnels){
			yield s;
		}
	}

	add(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this.#sshTunnels.concat(sshTunnel));
	}

	update(old: SshTunnel, substitute: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this.#sshTunnels.map(s => s === old ? substitute : s));
	}

	remove(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this.#sshTunnels.filter(s => s !== sshTunnel));
	}

	isUnstartable(sshTunnel: SshTunnel) : boolean {
		return this.#sshTunnels.some(s => s.json.externalPort == sshTunnel.json.externalPort && s.isStarted);
	}

	static load() : SshTunnelConfig {
		const json = dbGet("config");

		const defaultConf = [
			new SshTunnel(),
			new SshTunnel().set({ externalPort: 8081 })
		];

		const sshTunnels = json
			? json.map(props => new SshTunnel(props))
			: defaultConf;

		return new SshTunnelConfig(sshTunnels);
	}
}
