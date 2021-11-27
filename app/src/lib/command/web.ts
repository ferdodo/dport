import { CommandClass, CommandInstance } from "./index";

const Command: CommandClass = class implements CommandInstance {
	constructor(command: string, args: string[]){
	}

	kill() {
	}

	waitEnd() {
		return new Promise(()=>{});
	}
}

export default Command;
