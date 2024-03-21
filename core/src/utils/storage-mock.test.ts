import { StorageMock } from "./storage-mock";
import { test, expect } from "vitest";
import { createSshTunnel } from "./create-ssh-tunnel";

test("it should set and get from virtuel storage", function() {
	const storage = new StorageMock();
	const value = [createSshTunnel()];
	storage.setItem(value);
	const fromMemory = storage.getItem();

	if (fromMemory === null) {
		throw new Error("From memory is null !");
	}

	expect(value.length).toEqual(fromMemory.length);
});
