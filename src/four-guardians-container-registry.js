import awilix from "awilix";
import * as Slot from "sc-slot-game-base";
import { FourGuardiansFames, FourGuardiansFreeSpins, FourGuardiansRounds } from "./models";
import FourGuardiansPlayGamePermissionValidator from "./validators/four-guardians-play-game-permission-validator";
import FourGuardiansUserSignInConsumer from "./consumers/four-guardians-user-signin-consumer";

const { asValue, asClass } = awilix;

export default class FourGuardiansContainerRegistry extends Slot.SlotContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(FourGuardiansRounds),
            famesRepository: asValue(FourGuardiansFames),
            freeSpinsRepository: asValue(FourGuardiansFreeSpins),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            userSignInConsumer: asClass(FourGuardiansUserSignInConsumer).singleton(),
        });
    }

    registerValidators() {
        this.container.register({
            playGamePermissionValidator: asClass(FourGuardiansPlayGamePermissionValidator).singleton(),
        });
    }
}
