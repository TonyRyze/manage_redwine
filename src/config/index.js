const debug = process.env.NODE_ENV !== 'production';
const baseUrl = debug ? 'http://localhost:3001/' : 'http://www.buymywine.cn/';

const conf = {
	debug: debug,
	baseUrl: baseUrl,
	api: {
		uploadactives: baseUrl + 'uploadactives',
		postfile: baseUrl + 'postfile',
		uploadwines: baseUrl + 'uploadwines',
		postbanner: baseUrl + 'postbanner',
		getactives: baseUrl + 'getactives',
		editactives: baseUrl + 'editactives',
		deleteactives: baseUrl + 'deleteactives',
		getbanner: baseUrl + 'getbanner',
		deletebanner: baseUrl + 'deletebanner',
		getwines: baseUrl + 'getwines',
		editwines: baseUrl + 'editwines',
		deletewines: baseUrl + 'deletewines',
		login: baseUrl + 'login'
	}
}

export default conf;