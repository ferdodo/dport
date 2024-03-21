import { SshTunnel, State } from "../interfaces/ssh-tunnel";

export function createSshTunnel(): SshTunnel {
	return {
		label: "My port forward",
		externalPort: 8080,
		internalPort: 8080,
		internalHost: "localhost",
		targetHost: "192.168.1.1",
		targetSshPort: "22",
		user: "user",
		state: State.Stopped
	};
}
