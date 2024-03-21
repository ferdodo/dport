import { Observable, Subject } from "rxjs";
import { SshTunnel } from "../interfaces/ssh-tunnel";
import { StorageInstance } from "../interfaces/storage";
import { SshTunnelConfig } from "../utils/ssh-tunnel-config";
import { createSshTunnel } from "../utils/create-ssh-tunnel";

const _currentConfig$: Subject<SshTunnelConfig> = new Subject();

export function getCurrentConfig(storage: StorageInstance<SshTunnel[]>): SshTunnelConfig {
	const fromMemory: SshTunnel[] | null = storage.getItem();

	if (fromMemory) {
		const configFromMemory = new SshTunnelConfig(fromMemory);
		_currentConfig$.next(configFromMemory);
		return configFromMemory;
	}

	const defaultConfig = new SshTunnelConfig()
		.addTunnel(createSshTunnel())
		.addTunnel({ ...createSshTunnel(), externalPort: 8081 });

	_currentConfig$.next(defaultConfig);

	return defaultConfig;
}

export function updateCurrentConfig(
	storage: StorageInstance<SshTunnel[]>,
	config: SshTunnelConfig
): void {
	const serialized: SshTunnel[] = [...config];
	storage.setItem(serialized);
	_currentConfig$.next(config);
}

export const currentConfig$: Observable<SshTunnelConfig> = _currentConfig$.asObservable();
