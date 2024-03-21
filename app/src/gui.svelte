<script lang="ts">
	import {
		State,
		isSshTunnelUnstartable,
		createSshTunnel,
		currentConfig$,
		getCurrentConfig,
		updateCurrentConfig
	} from "core";

	import type {
		StorageInstance,
		SshTunnel
	} from "core";

	import { getContext } from 'svelte';

	export let storageContext = 'config-storage';
	export let dataTestid = undefined;

	const storage = getContext(storageContext) as StorageInstance<SshTunnel[]>;
	let config = getCurrentConfig(storage);
	currentConfig$.subscribe(value => config = value);

	function mapInputValue(handler) {
		return function(event) {
			const target = event.target as HTMLInputElement;
			handler(target.value);
		};
	}
</script>

<div
	data-testid={dataTestid}
	style="display: grid; grid-template-columns: repeat(7, minmax(3.6rem, 9.7rem)) repeat(2, minmax(5rem, 5.4rem));">
	<div style="grid-area: 1 / 1 / 2 / 10;">
		<cookies-p>
			Enabled lines will execute the following command: &emsp;
			<code style="white-space: nowrap; font-size: 0.7rem;">
				ssh&nbsp;-p&nbsp;&#60;server_ssh_port&#62;&nbsp;-L&nbsp;&#60;local_port&#62;:&#60;remote_address&#62;:&#60;remote_port&#62;&nbsp;&#60;user&#62;@&#60;server&#62;
			</code>
		</cookies-p>

		<cookies-p> See ssh documentation for more informations. </cookies-p>
	</div>

	<cookies-p style="grid-area: 2 / 1 / 3 / 2;"> label </cookies-p>
	<cookies-p style="grid-area: 2 / 2 / 3 / 3;"> local_port </cookies-p>
	<cookies-p style="grid-area: 2 / 3 / 3 / 4;"> remote_address </cookies-p>
	<cookies-p style="grid-area: 2 / 4 / 3 / 5;"> remote_port </cookies-p>
	<cookies-p style="grid-area: 2 / 5 / 3 / 6;"> user </cookies-p>
	<cookies-p style="grid-area: 2 / 6 / 3 / 7;"> server </cookies-p>
	<cookies-p style="grid-area: 2 / 7 / 3 / 8;"> server_ssh_port </cookies-p>

	{#each config as s, i}
		<input
			style="grid-area: {3+i}/1/{4+i}/2;"
			disabled={s.state === State.Started || null}
			value={s.label}
			on:change={ mapInputValue(label => updateCurrentConfig(storage, config.updateTunnel(s, {...s, label })))  }
		/>

		<input
			style="grid-area: {3+i}/2/{4+i}/3;"
			disabled={s.state === State.Started || null}
			value={s.externalPort}
			on:change={ mapInputValue(externalPort => updateCurrentConfig(storage, config.updateTunnel(s, {...s, externalPort })))  }
		/>

		<input
			style="grid-area: {3+i}/3/{4+i}/4;"
			disabled={s.state === State.Started || null}
			value={s.internalHost}
			on:change={ mapInputValue(internalHost => updateCurrentConfig(storage, config.updateTunnel(s, {...s, internalHost })))  }
		/>

		<input
			style="grid-area: {3+i}/4/{4+i}/5;"
			disabled={s.state === State.Started || null}
			value={s.internalPort}
			on:change={ mapInputValue(internalPort => updateCurrentConfig(storage, config.updateTunnel(s, {...s, internalPort })))  }
		/>

		<input
			style="grid-area: {3+i}/5/{4+i}/6;"
			disabled={s.state === State.Started || null}
			value={s.user}
			on:change={ mapInputValue(user => updateCurrentConfig(storage, config.updateTunnel(s, {...s, user })))  }
		/>

		<input
			style="grid-area: {3+i}/6/{4+i}/7;"
			disabled={s.state === State.Started || null}
			value={s.targetHost}
			on:change={ mapInputValue(targetHost => updateCurrentConfig(storage, config.updateTunnel(s, {...s, targetHost })))  }
		/>

		<input
			style="grid-area: {3+i}/7/{4+i}/8;"
			disabled={s.state === State.Started || null}
			value={s.targetSshPort}
			on:change={ mapInputValue(targetSshPort => updateCurrentConfig(storage, config.updateTunnel(s, {...s, targetSshPort })))  }
		/>

		{#if s.state === State.Started}
			<button
				style="grid-area: {3+i}/8/{4+i}/9;"
				on:click={() => updateCurrentConfig(storage, config.updateTunnel(s, {...s, state: State.Stopped}))}>
				disable
			</button>
		{:else}
			<button
				style="grid-area: {3+i}/8/{4+i}/9;"
				disabled={isSshTunnelUnstartable(s, config) || null}
				on:click={() => updateCurrentConfig(storage, config.updateTunnel(s, {...s, state: State.Started}))}>
				enable
			</button>
		{/if}
		<button
			style="grid-area: {3+i}/9/{4+i}/10;"
			disabled={s.state === State.Started || null}
			on:click={() => updateCurrentConfig(storage, config.removeTunnel(s))}>
			remove
		</button>
	{/each}

	<button
		style="grid-area: {3+config.size}/9/{4+config.size}/10;"
		on:click={() => updateCurrentConfig(storage, config.addTunnel(createSshTunnel()))}>
		add
	</button>
</div>
