import { mapActions, mapState } from 'vuex';
import template from "./template.html";
import "./style.css";

export default {
	template,
	computed: mapState('sshTunnelConfig', ['config']),

	methods: mapActions('sshTunnelConfig', [
		'add',
		'remove',
		'update',
		'start',
		'stop'
	])
};


