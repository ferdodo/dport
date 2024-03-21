import Window from "./window.svelte";
import { test, expect } from "vitest";
import { render, screen, within, fireEvent } from "@testing-library/svelte";
import { WindowHandleInstance } from "core";

test("should make window draggable", async function() {
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const windowHandleContext = Math.random().toString(36).substr(2, 5);

	await new Promise(function(resolve, reject) {
		setTimeout(reject, 1000, new Error("Timed out !"));

		class WindowHandle implements WindowHandleInstance {
			static makeDraggable() {
				resolve();
			}

			minimize() {
			}

			close() {
			}
		}

		const context = new Map([[windowHandleContext, WindowHandle]]);
		render(Window, { context, props: { windowHandleContext, dataTestid } });
	})
});

test("should close when clicking close button", async function() {
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const windowHandleContext = Math.random().toString(36).substr(2, 5);
	let closed = false;

	class WindowHandle implements WindowHandleInstance {
		static makeDraggable() {
		}

		minimize() {
		}

		close() {
			closed = true;
		}
	}

	const context = new Map([[windowHandleContext, WindowHandle]]);
	render(Window, { context, props: { windowHandleContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button =  within(component).getByText("close");
	fireEvent.click(button);
	expect(closed).toBeTruthy();
});


test("should minimize when clicking minimize button", async function() {
	const dataTestid = Math.random().toString(36).substr(2, 5);
	const windowHandleContext = Math.random().toString(36).substr(2, 5);
	let minimize = false;

	class WindowHandle implements WindowHandleInstance {
		static makeDraggable() {
		}

		minimize() {
			minimize = true;
		}

		close() {
		}
	}

	const context = new Map([[windowHandleContext, WindowHandle]]);
	render(Window, { context, props: { windowHandleContext, dataTestid } });
	const component = screen.getByTestId(dataTestid);
	const button =  within(component).getByText("minimize");
	fireEvent.click(button);
	expect(minimize).toBeTruthy();
});
