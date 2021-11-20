import Vue from 'vue/dist/vue.common.js';
import Vuex from 'vuex';
import sshTunnelConfig from "./ssh-tunnel-config";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		sshTunnelConfig
	}
});