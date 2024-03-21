<script lang="ts">
	import { getContext } from 'svelte';
	import { onMount } from "svelte";
	import type { WindowHandleClass } from "core";

	export let windowHandleContext = 'config-window-handle';
	export let dataTestid = undefined;

	const WindowHandle = getContext(windowHandleContext) as WindowHandleClass;
	const windowHandle = new WindowHandle();

	let handle;

	onMount(function() {
		WindowHandle.makeDraggable(handle);
	});
</script>

<style>
	.dport-window-container {
		background-color: gray;
		height: 100%;
	}
</style>

<div class="dport-window-container" data-testid={dataTestid}>
	<cookies-panel>
		<cookies-button bind:this={handle} style="width: 10rem;"></cookies-button>
		<cookies-button on:click={ () => windowHandle.minimize() }> minimize </cookies-button>
		<cookies-button on:click={ () => windowHandle.close() }> close </cookies-button>
	</cookies-panel>

	<cookies-panel panel-title="SSH tunneling">
		<slot></slot>
	</cookies-panel>
</div>
