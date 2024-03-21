import { test, expect } from "vitest";
import { createCommand } from "./create-command";
import { CommandInstance } from "../interfaces/command";
import { createSshTunnel } from "./create-ssh-tunnel";
import { State } from "../interfaces/ssh-tunnel";

test("should create ssh commands with proper arguments", function() {
	const s = {
		...createSshTunnel(),
		state: State.Started
	};

	const commands = {};

	let commandName;
	let args;

	const command = createCommand(
		class implements CommandInstance {
			constructor(a: string, b: string[]) {
				commandName = a;
				args = b;
			}

			async kill() {
				await Promise.resolve();
			}

			async waitEnd() {
				await new Promise(r => setTimeout(r, 1000000000));
			}
		},
		commands,
		s
	);

	if (args === undefined) {
		throw new Error("Args is undefined !")
	}

	expect(command).toBeTruthy();
	expect(commandName).toEqual("ssh");
	expect(args[0]).toEqual("-p");
	expect(args[1]).toEqual(s.targetSshPort);
	expect(args[2]).toEqual("-L");
	expect(args[3]).toEqual(`${s.externalPort}:${s.internalHost}:${s.internalPort}`);
	expect(args[4]).toEqual(`${s.user}@${s.targetHost}`);
	expect(args[5]).toEqual("sleep");
	expect(args[6]).toEqual("infinity");
});


test("should return undefined when command is stopped", function() {
	const s = createSshTunnel();
	const commands = {};

	const command = createCommand(
		class implements CommandInstance {
			async kill() {
				await Promise.resolve();
			}

			async waitEnd() {
				await new Promise(r => setTimeout(r, 1000000000));
			}
		},
		commands,
		s
	);


	expect(command).toBeUndefined();
});
