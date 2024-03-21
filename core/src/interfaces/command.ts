
export interface CommandClass {
	new(command: string, args: string[]): CommandInstance;
}

export interface CommandInstance {
	kill(): Promise<void>;
	waitEnd(): Promise<void>;
}
