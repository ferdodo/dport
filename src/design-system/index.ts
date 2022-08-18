export async function registerComponents(designSystem: "win98" | "spectre" | "nes") {
	customElements.define('dport-input',	(await import(`./${ designSystem }/input`)).default);
	customElements.define('dport-button',	(await import(`./${ designSystem }/button`)).default);
	customElements.define('dport-p',		(await import(`./${ designSystem }/p`)).default);
	customElements.define('dport-window',	(await import(`./${ designSystem }/window`)).default);
}
