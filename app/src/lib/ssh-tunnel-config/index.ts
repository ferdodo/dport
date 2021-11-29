import { default as SshTunnel, State  } from "../ssh-tunnel";
import { dbGet, dbSet } from "../nosql-db";

export default class SshTunnelConfig {
	#sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel>){
		this.#sshTunnels = [...sshTunnels];
		dbSet("config", this.json);
		Object.freeze(this);
	}

	get size(){
		return this.#sshTunnels.length;
	}

	get json(){
		return this.#sshTunnels
			.map(sshTunnel => sshTunnel.set({ 'state': State.Stopped }))
			.map(sshTunnel => sshTunnel.json);
	}

	* [Symbol.iterator]() {
		for (const s of this.#sshTunnels){
			yield s;
		}
	}

	add(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.#sshTunnels.concat(sshTunnel));
	}

	update(old: SshTunnel, substitute: SshTunnel){
		return new SshTunnelConfig(this.#sshTunnels.map(s => s === old ? substitute : s));
	}

	remove(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.#sshTunnels.filter(s => s !== sshTunnel));
	}

	isUnstartable(sshTunnel){
		this.#sshTunnels.some(s => s.externalPort == sshTunnel.externalPort && s.isStarted);
	}

	static load(){
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
