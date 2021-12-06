import { default as SshTunnel, State, SshTunnelJson } from "dport/lib/ssh-tunnel";
import { dbGet, dbSet } from "dport/lib/nosql-db";

export default class SshTunnelConfig {
	_sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel>) {
		this._sshTunnels = [...sshTunnels];
		dbSet("config", this.json);
	}

	get size() : number {
		return this._sshTunnels.length;
	}

	get json() : SshTunnelJson[] {
		return this._sshTunnels
			.map(sshTunnel => sshTunnel.set({ 'state': State.Stopped }))
			.map(sshTunnel => sshTunnel.json);
	}

	* [Symbol.iterator]() {
		for (const s of this._sshTunnels){
			yield s;
		}
	}

	add(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this._sshTunnels.concat(sshTunnel));
	}

	update(old: SshTunnel, substitute: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this._sshTunnels.map(s => s === old ? substitute : s));
	}

	remove(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this._sshTunnels.filter(s => s !== sshTunnel));
	}

	isUnstartable(sshTunnel: SshTunnel) : boolean {
		return this._sshTunnels.some(s => s.json.externalPort == sshTunnel.json.externalPort && s.isStarted);
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
