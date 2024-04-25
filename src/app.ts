import { envs } from "./config";
import { Server } from "./presentation/server";


(() => {
   main(); 
})()

async function main() {
    // await base de datos

    //to-to inicio de server
    new Server({
        port: envs.PORT
    })
        .start
}