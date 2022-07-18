module.exports = class ProxyDAO {
  connectionDB = async (mongoose) => {
    mongoose.connect("mongodb://127.0.0.1:27017/query",{
      connectTimeoutMS: 30000
    });
  };
  /**
   * insert data into database
   * @param proxys
   */
  insertDatabase = async (proxys, proxyController, proxyList) => {
     let arr = proxyController.getProxyPort(proxys);
    await proxyList.collection.insertOne(
     new proxyList({
          proxy: arr[0]
        })
      );
  };
};
