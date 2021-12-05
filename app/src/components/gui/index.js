import { mapActions, mapState } from 'vuex';
import template from "./template";

export default {
	template,
	computed: mapState('sshTunnelConfig', ['config']),
	methods: mapActions('sshTunnelConfig', ['add', 'remove', 'update', 'start', 'stop'])
};
