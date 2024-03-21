import { test, expect } from "vitest";
import { SshTunnelConfig } from "./ssh-tunnel-config";
import { createSshTunnel } from "./create-ssh-tunnel";
import { State } from "../interfaces/ssh-tunnel";
import { isSshTunnelUnstartable } from "./is-ssh-tunnel-unstartable";

test("SshTunnelConfig shall indicate when tunnel is unstartable", function() {
	const tunnel1 = createSshTunnel();
	const tunnel2 = createSshTunnel();
	tunnel2.state = State.Started;

	const config = new SshTunnelConfig()
		.addTunnel(tunnel1)
		.addTunnel(tunnel2);

	const isUnstartable = isSshTunnelUnstartable(tunnel1, config);
	expect(isUnstartable).toBeTruthy();
});

test("SshTunnelConfig shall indicate when tunnel is startable", function() {
	const tunnel1 = createSshTunnel();
	const tunnel2 = createSshTunnel();

	const config = new SshTunnelConfig()
		.addTunnel(tunnel1)
		.addTunnel(tunnel2);

	const isUnstartable = isSshTunnelUnstartable(tunnel1, config);
	expect(isUnstartable).toBeFalsy();
});

test("SshTunnelConfig shall indicate when tunnel is startable through duplicate ports", function() {
	const tunnel1 = createSshTunnel();
	const tunnel2 = createSshTunnel();
	tunnel2.externalPort = 12345;
	tunnel2.state = State.Started;

	const config = new SshTunnelConfig()
		.addTunnel(tunnel1)
		.addTunnel(tunnel2);

	const isUnstartable = isSshTunnelUnstartable(tunnel1, config);
	expect(isUnstartable).toBeFalsy();
});
