import { test, expect } from "vitest";
import { createSshTunnel } from "./create-ssh-tunnel";

test("Label should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.label).toBeTruthy();
});

test("Internal host should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.internalHost).toBeTruthy();
});

test("Target host should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.targetHost).toBeTruthy();
});

test("User should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.targetHost).toBeTruthy();
});

test("Target ssh port should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.targetSshPort).toBeTruthy();
});

test("User should be truthy", function() {
	const tunnel = createSshTunnel();
	expect(tunnel.user).toBeTruthy();
});
