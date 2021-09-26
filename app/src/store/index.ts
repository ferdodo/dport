import Vue from 'vue';
import Vuex from 'vuex';
import sshTunnelConfig from "./ssh-tunnel-config";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		sshTunnelConfig
	}
});