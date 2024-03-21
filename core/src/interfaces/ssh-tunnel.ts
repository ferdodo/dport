export enum State {
	Started,
	Stopped
}

export interface SshTunnel {
	label: string;
	externalPort: number;
	internalPort: number;
	internalHost: string;
	targetHost: string;
	targetSshPort: string;
	user: string;
	state: State;
}
