import { CommandClass, CommandInstance } from "../interfaces/command";
import { SshTunnelConfig } from "./ssh-tunnel-config";
import { createCommand } from "./create-command";
import { Observable, OperatorFunction, share, map } from "rxjs";
import { State } from "../interfaces/ssh-tunnel";

export function mapCurrentCommands(
	commandClass: CommandClass
): OperatorFunction<SshTunnelConfig, Record<string, CommandInstance>> {
	const commands: Record<string, CommandInstance> = {};

	return function(source: Observable<SshTunnelConfig>) {
		return source.pipe(
			map(function(config: SshTunnelConfig) {
				for (const tunnel of config) {
					const command: CommandInstance | undefined = createCommand(
						commandClass,
						commands,
						tunnel
					);

					if (command) {
						commands[tunnel.externalPort] = command;
					}

					if (tunnel.state === State.Stopped && commands[tunnel.externalPort]) {
						commands[tunnel.externalPort].kill()
							.catch(console.error);

						delete commands[tunnel.externalPort];
					}
				}

				return {...commands};
			}),
			share()
		);
	}
}
