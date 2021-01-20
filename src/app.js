import { Core } from "sc-game-base";
import { SlotGameData, SlotGameDefinition } from "sc-slot-game-base";

import appConfigs from "./app-configs";
import FourGuardiansContainerRegistry from "./four-guardians-container-registry";
import gameSettings from "./game-settings";

const run = async () => {
    const gameData = new SlotGameData(gameSettings.durations.wholeRound);
    const definition = new SlotGameDefinition(gameSettings);
    const container = new FourGuardiansContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(container);

    await app.run();
};

run();
