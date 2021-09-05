import { default as SshTunnel, State } from "../ssh-tunnel";

export default class SshTunnelConfigModel {
	#sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel>){
		this.#sshTunnels = [...sshTunnels];
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

	* mutation_add(sshTunnel): Iterable<SshTunnel> {
		for (const s of this){
			yield s;
		}

		yield sshTunnel;
	}

	* mutation_update(old, replaced): Iterable<SshTunnel> {
		for (const s of this){
			yield old === s ? replaced : s;
		}
	}

	* mutation_remove(sshTunnel): Iterable<SshTunnel> {
		for (const s of this){
			if (s !== sshTunnel){
				yield s;
			}
		}		
	}

	static get defaultConf(): SshTunnel[] {
		return [
			new SshTunnel(), 
			new SshTunnel().set({ externalPort: 8081 })
		];
	}
}
