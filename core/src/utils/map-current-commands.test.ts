import { test, expect } from "vitest";
import { mapCurrentCommands } from "./map-current-commands";
import { currentConfig$, updateCurrentConfig } from "../states/current-config";
import { CommandInstance } from "../interfaces/command";
import { SshTunnelConfig } from "./ssh-tunnel-config";
import { createSshTunnel } from "./create-ssh-tunnel";
import { State } from "../interfaces/ssh-tunnel";
import { StorageMock } from "./storage-mock";

test("should pilot commands based on current configuration", function() {
	let commands;
	const externalPort = ~~(Math.random() * 50000);

	currentConfig$.pipe(
		mapCurrentCommands(
			class implements CommandInstance {
				async kill() {
					await Promise.resolve();
				}

				async waitEnd() {
					await new Promise(r => setTimeout(r, 1000000000));
				}
			}
		)
	)
		.subscribe(value => commands = value);

	const startedTunnel = {
		...createSshTunnel(),
		externalPort,
		state: State.Started
	};

	const config = new SshTunnelConfig()
		.addTunnel(startedTunnel);

	const storage = new	StorageMock();
	updateCurrentConfig(storage, config);

	if (commands === undefined) {
		throw new Error("Command is undefined !");
	}

	expect(commands[externalPort]).toBeTruthy();

	const stoppedTunnel = {
		...startedTunnel,
		state: State.Stopped
	};

	updateCurrentConfig(
		storage,
		config.updateTunnel(startedTunnel, stoppedTunnel)
	);

	expect(commands[externalPort]).toBeFalsy();
});

test("should not restart an updated command", function() {
	let commands;
	const externalPort = ~~(Math.random() * 50000);

	currentConfig$.pipe(
		mapCurrentCommands(
			class implements CommandInstance {
				async kill() {
					await Promise.resolve();
				}

				async waitEnd() {
					await new Promise(r => setTimeout(r, 1000000000));
				}
			}
		)
	)
		.subscribe(value => commands = value);

	const startedTunnel = {
		...createSshTunnel(),
		externalPort,
		user: "a",
		state: State.Started
	};

	const config = new SshTunnelConfig()
		.addTunnel(startedTunnel);

	const storage = new	StorageMock();
	updateCurrentConfig(storage, config);

	if (commands === undefined) {
		throw new Error("Command is undefined !");
	}

	const command = commands[externalPort];
	expect(command).toBeTruthy();

	const stoppedTunnel = {
		...startedTunnel,
		user: "b"
	};

	updateCurrentConfig(
		storage,
		config.updateTunnel(startedTunnel, stoppedTunnel)
	);

	const otherCommand = commands[externalPort];
	expect(otherCommand).toBe(command);
});
