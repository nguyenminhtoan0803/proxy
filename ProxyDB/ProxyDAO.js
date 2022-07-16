const ProxyList = require("../model/ProxyModel");
const ProxyController = require("../controller/ProxyController");
const mongoose = require("mongoose");

class ProxyDAO {
    async connectionMongo() {
        mongoose.connect('mongodb://127.0.0.1:27017/proxy',
            {
                keepAliveInitialDelay: 300000
            });

        const connectDB = mongoose.connection;

        connectDB.on('error', console.error.bind(console, 'connection error:'));

        connectDB.once('open', function () {
            console.log("Connection Successful!");
        });

        return connectDB;
    }

    /**
     * insert data into database
     * @param proxys
     */
    async insertDatabase(proxys) {
        let arr = ProxyController.getProxyPort(proxys);
        await ProxyList.collection.insertOne(
            new ProxyList({
                proxy: arr[0],
                port: parseInt(arr[1])
            })
        );
    }
}

module.exports = new ProxyDAO();