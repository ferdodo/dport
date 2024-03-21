import { CommandClass, CommandInstance } from "../interfaces/command";
import { SshTunnel, State } from "../interfaces/ssh-tunnel";

export function createCommand(
	commandClass: CommandClass,
	commands: Record<string, CommandInstance>,
	sshTunnel: SshTunnel
): CommandInstance | undefined {
	if (sshTunnel.state === State.Started && !commands[sshTunnel.externalPort]) {
		return new commandClass('ssh', [
			"-p",
			`${sshTunnel.targetSshPort}`,
			"-L",
			`${sshTunnel.externalPort}:${sshTunnel.internalHost}:${sshTunnel.internalPort}`,
			`${sshTunnel.user}@${sshTunnel.targetHost}`,
			"sleep",
			"infinity"
		]);
	}
}
