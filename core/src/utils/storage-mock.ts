import { StorageInstance } from "../interfaces/storage";
import { SshTunnel } from "../interfaces/ssh-tunnel";

export class StorageMock implements StorageInstance<SshTunnel[]> {
	memory: SshTunnel[] | null = null;

	getItem() {
		return this.memory;
	}

	setItem(tunnels: SshTunnel[]) {
		this.memory = tunnels;
	}
}
