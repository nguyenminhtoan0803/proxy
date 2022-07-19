const express = require('express');
const ProxyController = require('./Controller/ProxyController');
const app = express();

/**
 * API url
 * @type {string}
 * @private
 */
const API_URI = "https://api.proxyscrape.com/v2/account/datacenter_shared/proxy-list?auth=2d9wmzq425oksy7293kr&type=getproxies&country[]=us&protocol=http&format=json&status=all";

app.get('/xda/getproxy', function (req, res) {

    let controller = new ProxyController();
    setTimeout(async function () {
        await controller.proxyDataRepose(API_URI);
    }, 300);

    //set 5 minutes call
    setInterval(async () => {
        await controller.proxyDataRepose(API_URI);
    }, 300000);

    res.end();
}).listen(3000);
