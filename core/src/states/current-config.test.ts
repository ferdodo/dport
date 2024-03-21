import { test, expect } from "vitest";
import { SshTunnelConfig } from "../utils/ssh-tunnel-config";
import { SshTunnel } from "../interfaces/ssh-tunnel";
import { createSshTunnel } from "../utils/create-ssh-tunnel";
import { getCurrentConfig, updateCurrentConfig } from "./current-config";
import { StorageInstance } from "../interfaces/storage";

test("getCurrentConfig should load default config when save is empty", function() {
	class StorageMock implements StorageInstance<SshTunnel[]> {
		memory: SshTunnel[] | null = null;

		getItem() {
			return this.memory;
		}

		setItem(tunnels: SshTunnel[]) {
			this.memory = tunnels;
		}
	}

	const storage = new StorageMock();

	const actualConfig: SshTunnelConfig = getCurrentConfig(storage);
	const tunnelIterator: Iterator<SshTunnel> = actualConfig[Symbol.iterator]();
	const tunnel = tunnelIterator.next().value;
	expect(tunnel.externalPort).toEqual(8080);
	const tunnel2 = tunnelIterator.next().value;
	expect(tunnel2.externalPort).toEqual(8081);
})

test("updateCurrentConfig shall update the config", function() {
	class StorageMock implements StorageInstance<SshTunnel[]> {
		memory: SshTunnel[] | null = null;

		getItem() {
			return this.memory;
		}

		setItem(tunnels: SshTunnel[]) {
			this.memory = tunnels;
		}
	}

	const storage = new StorageMock();
	const newTunnel: SshTunnel = { ...createSshTunnel(), externalPort: 7382 };
	const newConfig: SshTunnelConfig = new SshTunnelConfig([newTunnel]);
	updateCurrentConfig(storage, newConfig);
	const actualConfig: SshTunnelConfig = getCurrentConfig(storage);
	const tunnelIterator: Iterator<SshTunnel> = actualConfig[Symbol.iterator]();
	const tunnel = tunnelIterator.next().value;
	expect(tunnel.externalPort).toEqual(7382);
});
