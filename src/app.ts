import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { MongoDatabase } from './data/mongodb/mongo-database';


(() => {
   main(); 
})()

async function main() {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })

    //to-to inicio de server
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    })
        .start()
}