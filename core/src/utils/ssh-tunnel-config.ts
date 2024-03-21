import { SshTunnel } from "../interfaces/ssh-tunnel";

export class SshTunnelConfig {
	#sshTunnels: SshTunnel[];

	constructor(sshTunnels: Iterable<SshTunnel> = []) {
		this.#sshTunnels = [...sshTunnels];
	}

	get size() : number {
		return this.#sshTunnels.length;
	}

	[Symbol.iterator] () {
		return this.#sshTunnels[Symbol.iterator]();
	}

	addTunnel(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig([...this.#sshTunnels, Object.freeze(sshTunnel)]);
	}

	updateTunnel(old: SshTunnel, substitute: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this.#sshTunnels.map(s => s === old ? substitute : s));
	}

	removeTunnel(sshTunnel: SshTunnel) : SshTunnelConfig {
		return new SshTunnelConfig(this.#sshTunnels.filter(s => s !== sshTunnel));
	}
}
