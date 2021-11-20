import SshTunnelConfigModel from "./model";
import { default as SshTunnel } from "../ssh-tunnel";
import { dbGet, dbSet } from "../nosql-db";

export default class SshTunnelConfig extends SshTunnelConfigModel {
	add(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.mutation_add(sshTunnel));
	}

	update(old: SshTunnel, replaced: SshTunnel){
		return new SshTunnelConfig(this.mutation_update(old, replaced));
	}

	remove(sshTunnel: SshTunnel){
		return new SshTunnelConfig(this.mutation_remove(sshTunnel));
	}

	save(){	
		dbSet("config", this.json);
	}

	isUnstartable(sshTunnel){
		for (const s of this){
			if (s.externalPort == sshTunnel.externalPort && s.isStarted){
				return true;
			}
		}

		return false;
	}

	static load(){
		const json = dbGet("config");

		const sshTunnels = json 
			? json.map(props => new SshTunnel(props)) 
			: this.defaultConf;

		return new SshTunnelConfig(sshTunnels);
	}
}