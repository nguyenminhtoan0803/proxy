const ProxyList = require('../model/ProxyModel');

class ProxyDAO {
    /**
     * connection db proxy
     * @param mongoose
     */
    connectionDB = (mongoose) => {//connection database query
        mongoose.connect("mongodb://Admin:1234@127.0.0.1:27017/proxy?authMechanism=DEFAULT&authSource=admin", {});
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
     * get data from collection sort lastused asc
     */
    getProxy = async () => {
      return ProxyList.findOne().sort({"lastused": 'asc'}).exec();
    }
}

module.exports = ProxyDAO;