const axios = require("axios");
const ProxyList = require("../model/ProxyModel");
const ProxyDao = require("../ProxyDB/ProxyDAO")

class ProxyController {
    /**
     * function sub proxy and port
     * @param proxys
     * @returns array
     */
    async getProxyPort(proxys) {
        let arr = [];
        let ports = proxys[0].substring(proxys[0].length - 5);
        proxys[0] = proxys[0].replace(ports, "");
        ports = ports.replace(":", "");
        arr[0] = proxys[0];
        arr[1] = ports;
        return arr;
    }

//set first request
    /**
     * function get data from API server
     * @param API_URI
     */
    async proxyDataRepose(API_URI) {
        axios.get(API_URI)
            .then((response) => {
                let jsonData = response.data;//response.data using API
                ProxyList.countDocuments({},async function (err, result) {//count documents in collection datas in database prox
                    if (result === 0) {
                        for (let i = 0; i < jsonData["data"].length; i++) {
                            let proxys = jsonData["data"][i];
                            await ProxyDao.insertDatabase(proxys);//insert data in collection datas
                        }
                    } else {
                        for (let i = 0; i < jsonData["data"].length; i++) {
                            let proxys = jsonData["data"][i];
                            let arr = getProxyPort(proxys);
                            let data = await ProxyList.findOne({
                                "proxy": arr[0]
                            });
                            if (!data) {
                                await ProxyDao.insertDatabase(proxys);
                            }
                        }
                    }
                })
            }).catch((err) => {
            console.error(err);
        })
    }
}

module.exports = new ProxyController();