import { default as SshTunnel, State } from "../ssh-tunnel";
import { dbGet, dbSet } from "../nosql-db";

export default class SshTunnelConfig {
	#sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel>){
		this.#sshTunnels = [...sshTunnels];
	}

	add(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.mutation_add(sshTunnel));
	}

	update(old: SshTunnel, replaced: SshTunnel){
		return new SshTunnelConfig(this.mutation_update(old, replaced));
	}

	remove(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.mutation_remove(sshTunnel));
	}

	get size(){
		return this.#sshTunnels.length;
	}

	save(){
		const json = this.#sshTunnels
			.map(sshTunnel => sshTunnel.set({ 'state': State.Stopped }))
			.map(sshTunnel => sshTunnel.json);

		dbSet("config", json);
	}

	static load(){
		const config = dbGet("config") || [];
		const sshTunnels = config.map(props => new SshTunnel(props));
		return new SshTunnelConfig(sshTunnels);
	}

	* [Symbol.iterator]() {
		for (const s of this.#sshTunnels){
			yield s;
		}
	}

	private * mutation_add(sshTunnel): Iterable<SshTunnel> {
		for (const s of this){
			yield s;
		}

		yield sshTunnel;
	}

	private * mutation_update(old, replaced): Iterable<SshTunnel> {
		for (const s of this){
			yield old === s ? replaced : s;
		}
	}

	private * mutation_remove(sshTunnel): Iterable<SshTunnel> {
		for (const s of this){
			if (s !== sshTunnel){
				yield s;
			}
		}		
	}
}