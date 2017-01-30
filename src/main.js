import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

// 注册中间件，以便后续使用
Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: 'active'
});

router.map({
	'/goods': {
		component: goods
	}
});

router.map({
	'/ratings': {
		component: ratings
	}
});

router.map({
	'/seller': {
		component: seller
	}
});

router.start(app, '#app');
router.go('/goods');
