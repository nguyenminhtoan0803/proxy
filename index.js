const express = require('express');
const ProxyController = require('./Controller/ProxyController');
const ProxyDao = require('./db/ProxyDao');

const app = express();

/**
 * API url
 * @type {string}
 * @private
 */
const API_URI = "https://api.proxyscrape.com/v2/account/datacenter_shared/proxy-list?auth=2d9wmzq425oksy7293kr&type=getproxies&country[]=us&protocol=http&format=json&status=all";

let controller = new ProxyController();
setTimeout(async function () {
    await controller.proxyDataRepose(API_URI);
}, 300);

//set 5 minutes call
setInterval(async () => {
    await controller.proxyDataRepose(API_URI);
}, 300000);

app.get('/xda/getproxy', async function (req, res) {
    let dao = new ProxyDao();
    //get proxy data form collection proxy
    let proxyData = await dao.getProxy();

    let returndata = {
        success: false
    }

    if (returndata) {
        returndata.success = true;
        returndata.data = {
            proxy: proxyData["_doc"]["proxy"],
            port: proxyData["_doc"]["port"],
            type: proxyData["_doc"]["type"]
        };
    }

    //set value lastused current time
    proxyData.lastused = new Date().getTime();
    proxyData.save();

    //return response
    res.json(returndata);
    res.end();

}).listen(3000);
