import Gui from "./gui.svelte";
import { test, expect } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/svelte";
import { StorageMock, updateCurrentConfig, getCurrentConfig, State } from "core";

test("should update tunnel label", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const label = Math.random().toString(36).substr(2, 5);
	const newLabel = Math.random().toString(36).substr(2, 5);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			label
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(label);
    fireEvent.change(input, { target: { value: newLabel } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(updatedTunnel.label).toEqual(newLabel);
});

test("should update tunnel external port", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const externalPort = Math.floor(10000 + Math.random() * 9999);
	const newExternalPort = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			externalPort
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(externalPort);
    fireEvent.change(input, { target: { value: newExternalPort } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.externalPort)).toEqual(newExternalPort);
});

test("should update tunnel internal port", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const internalPort = Math.floor(10000 + Math.random() * 9999);
	const newInternalPort = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			internalPort
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(internalPort);
    fireEvent.change(input, { target: { value: newInternalPort } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.internalPort)).toEqual(newInternalPort);
});

test("should update tunnel internal host", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const internalHost = Math.floor(10000 + Math.random() * 9999);
	const newInternalHost = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			internalHost
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(internalHost);
    fireEvent.change(input, { target: { value: newInternalHost } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.internalHost)).toEqual(newInternalHost);
});

test("should update tunnel target host", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const targetHost = Math.floor(10000 + Math.random() * 9999);
	const newTargetHost = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			targetHost
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(targetHost);
    fireEvent.change(input, { target: { value: newTargetHost } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.targetHost)).toEqual(newTargetHost);
});

test("should update tunnel targetSshPort", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const targetSshPort = Math.floor(10000 + Math.random() * 9999);
	const newTargetSshPort = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			targetSshPort
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(targetSshPort);
    fireEvent.change(input, { target: { value: newTargetSshPort } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.targetSshPort)).toEqual(newTargetSshPort);
});

test("should update tunnel user", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const user = Math.floor(10000 + Math.random() * 9999);
	const newUser = Math.floor(10000 + Math.random() * 9999);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			user
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(user);
    fireEvent.change(input, { target: { value: newUser } });
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(Number(updatedTunnel.user)).toEqual(newUser);
});

test("should stop tunnel when clicking disable button", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const [tunnel, tunnel2] = [...config];

	updateCurrentConfig(
		storage,
		config
			.updateTunnel(tunnel, {
				...tunnel,
				state: State.Started
			})
			.removeTunnel(tunnel2)
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button = within(component).getByText("disable");
    fireEvent.click(button);
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(updatedTunnel.state).toEqual(State.Stopped);
});

test("should start tunnel when clicking enable button", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const [, tunnel2] = [...config];

	updateCurrentConfig(
		storage,
		config
			.removeTunnel(tunnel2)
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button = within(component).getByText("enable");
    fireEvent.click(button);
    const updatedConfig = getCurrentConfig(storage);
    const updatedTunnel = updatedConfig[Symbol.iterator]().next().value;
    expect(updatedTunnel.state).toEqual(State.Started);
});

test("should tunnel when clicking on remove button", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const [, tunnel2] = [...config];

	updateCurrentConfig(
		storage,
		config
			.removeTunnel(tunnel2)
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button = within(component).getByText("remove");
    fireEvent.click(button);
    const updatedConfig = getCurrentConfig(storage);
    expect(updatedConfig.size).toEqual(0);
});

test("should add tunnel when clicking on add button", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button = within(component).getByText("add");
    fireEvent.click(button);
    const updatedConfig = getCurrentConfig(storage);
    expect(updatedConfig.size).toEqual(3);
});

test("should subscribe to current configuration", function() {
	const storage = new StorageMock();
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const storageContext = Math.random().toString(36).substr(2, 5);
	const context = new Map([[storageContext, storage]]);
	const config = getCurrentConfig(storage);
	const tunnel = config[Symbol.iterator]().next().value;
	const label = Math.random().toString(36).substr(2, 5);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			label
		})
	);

	render(Gui, { context, props: { storageContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const input = within(component).getByDisplayValue(label);
	expect(input).toBeTruthy();
	const newLabel = Math.random().toString(36).substr(2, 5);

	updateCurrentConfig(
		storage,
		config.updateTunnel(tunnel, {
			...tunnel,
			newLabel
		})
	);

	const inputWithNewLabel = within(component).findByDisplayValue(newLabel);
	expect(inputWithNewLabel).toBeTruthy();
});
