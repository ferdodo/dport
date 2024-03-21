import { test, expect } from "vitest";
import { SshTunnelConfig } from "./ssh-tunnel-config";
import { createSshTunnel } from "./create-ssh-tunnel";

test("Empty config should have size 0", function() {
	const config = new SshTunnelConfig();
	expect(config.size).equal(0);
});

test("SshTunnelConfig shall be updatable", function() {
	const tunnel1 = createSshTunnel();
	const tunnel2 = createSshTunnel();
	const tunnel3 = createSshTunnel();

	const config = new SshTunnelConfig()
		.addTunnel(tunnel1)
		.addTunnel(tunnel2)
		.updateTunnel(tunnel1, tunnel3);

	const iterator = config[Symbol.iterator]();
	const iteratedTunnel1 = iterator.next().value;
	const iteratedTunnel2 = iterator.next().value;
	expect(iteratedTunnel1).toBe(tunnel3);
	expect(iteratedTunnel2).not.toBe(tunnel3);
});

test("SshTunnelConfig.remove() should remove item", function() {
	const tunnel1 = createSshTunnel();
	const tunnel2 = createSshTunnel();

	const config = new SshTunnelConfig()
		.addTunnel(tunnel1)
		.addTunnel(tunnel2)
		.removeTunnel(tunnel1);

	const iterator = config[Symbol.iterator]();
	const iteratedTunnel1 = iterator.next().value;
	const iteratedTunnel2 = iterator.next().value;
	expect(iteratedTunnel1).toBe(tunnel2);
	expect(iteratedTunnel2).toBeUndefined();
});
