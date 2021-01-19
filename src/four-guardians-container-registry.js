import awilix from "awilix";
import * as Slot from "sc-slot-game-base";

import { FourGuardiansFames, FourGuardiansFreeSpins, FourGuardiansRounds } from "./models";

const { asValue } = awilix;

export default class FourGuardiansContainerRegistry extends Slot.SlotContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(FourGuardiansRounds),
            famesRepository: asValue(FourGuardiansFames),
            freeSpinsRepository: asValue(FourGuardiansFreeSpins),
        });
    }
}
