import { Crons, SlotGameApp, SlotGameData, SlotGameDefinition } from "sc-slot-game-base";

import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { FourGuardiansFames, FourGuardiansFreeSpins, FourGuardiansRounds } from "./models";
import Startup from "./startup";

const run = async () => {
    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings, FourGuardiansRounds, FourGuardiansFreeSpins, FourGuardiansFames);

    const bot = new Crons.SlotGameBot({ definition, gameData });
    const gameCron = new Crons.SlotGameCron(definition, gameData, bot);
    const betQueue = new Crons.SlotProcessBetQueue(definition, gameData);
    const startup = new Startup(appConfigs, definition, gameData, gameCron, betQueue);
    const app = new SlotGameApp(appConfigs, definition, gameData, startup);

    await app.run();
};

run();
