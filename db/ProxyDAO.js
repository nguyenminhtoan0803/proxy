const ProxyList = require("../model/ProxyModel");

class ProxyDAO {

    connectionDB = (mongoose) => {//connection database query
        mongoose.connect("mongodb://127.0.0.1:27017/proxy", {});
    };
    /**
     * insert data into database
     * @param proxys
     */
    insertDatabase = async (proxys, proxyController, proxyList) => {
        let arr = proxyController.subProxyPort(proxys);
        await proxyList.collection.insertOne(
            new proxyList({
                proxy: arr[0],
                port: parseInt(arr[1])
            })
        );
    };

    /**
     * get data from collection
     */
    getProxy = async () => {
      return ProxyList.findOne().sort({"lastused": 'asc'}).exec();
    }
}

module.exports = ProxyDAO;