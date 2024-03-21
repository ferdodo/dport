import { SshTunnel, State } from "../interfaces/ssh-tunnel";
import { SshTunnelConfig } from "./ssh-tunnel-config";

export function isSshTunnelUnstartable(
	a: SshTunnel,
	sshTunnelConfig: SshTunnelConfig
): boolean {
	for (const b of sshTunnelConfig) {
		if (
			a.externalPort == b.externalPort
			&& b.state === State.Started
		) {
			return true;
		}
	}

	return false;
}
