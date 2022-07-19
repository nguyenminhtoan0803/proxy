const axios = require("axios");
const ProxyList = require('../model/ProxyModel');
const ProxyDao = require('../db/ProxyDAO');

class ProxyController {
    /**
     * function sub proxy and port
     * @param proxys
     * @returns array
     */
    subProxyPort = (proxys) => {
        let arr = [];

        let ports = proxys[0].substring(proxys[0].length - 5);
        proxys[0] = proxys[0].replace(ports, "");
        ports = ports.replace(":", "");

        arr[0] = proxys[0];
        arr[1] = ports;
        return arr;
    }

    /**
     * function get data from API server
     * @param API_URI
     */
    proxyDataRepose = async (API_URI) => {
        axios.get(API_URI)
            .then((response) => {
                let jsonData = response.data;//response.data using API
                ProxyList.collection.countDocuments({}, async function (err, result) {//count documents in collection datas in database prox
                    const dao = new ProxyDao();
                    let temp = null;
                    if (result === 0) {//collection empty
                        for (let i = 0; i < jsonData["data"].length; i++) {
                            temp = jsonData["data"][i];
                            await dao.insertDatabase(temp, new ProxyController(), ProxyList);
                        }
                    } else {
                        for (let i = 0; i < jsonData["data"].length; i++) {
                            temp = jsonData["data"][i];
                            let arr = new ProxyController().subProxyPort(temp);
                            let data = ProxyList.findOne({
                                "proxy": arr[0]
                            });
                            if (!data) {
                                await dao.insertDatabase(temp, new ProxyController(), ProxyList);
                            }
                        }
                    }
                })
            }).catch((err) => {
            throw new Error(err);
        })
    }
};
module.exports = ProxyController;