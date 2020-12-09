const xsjs = require('@sap/xsjs');
const xsenv = require('@sap/xsenv');
xsenv.loadEnv();

var options = {
	anonymous: false,
	xsApplicationUser: true,
	auditLog: { logToConsole: true },
	redirectUrl: '/srvxs/index.xsjs'
};

try {
	options = Object.assign(options, xsenv.getServices({ uaa: { tag: "xsuaa" } }));
} catch (err) {
	console.log("[WARN]", err.message);
}

try {
	options = Object.assign(options, xsenv.getServices({ hana: { tag: "hana" } }));
} catch (err) {
	console.log("[WARN]", err.message);
}

const port = process.env.PORT || 5002;
xsjs(options).listen(port);
console.info('Listening on http://localhost:' + port);
