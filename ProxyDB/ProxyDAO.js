const ProxyList = require("../model/ProxyModel")
module.exports = class ProxyDAO {
    /**
     * insert data into database
     * @param proxys
     */
    insertDatabase = async (proxys, proxyController) => {
        let arr = proxyController.getProxyPort(proxys);
        await ProxyList.collection.insertOne(
            new ProxyList({
                proxy: arr[0],
                port: parseInt(arr[1])
            })
        );
    }
};