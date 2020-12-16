import mongoose from "mongoose";
import { middlewares } from "sc-common";
import { SlotGameStartup } from "sc-slot-game-base";

import appConfigs from "./app-configs";

export default class Startup extends SlotGameStartup {
    async configureServices(app) {
        super.configureServices(app);

        await middlewares.database.configureDatabase(mongoose, appConfigs.database);
    }
}
