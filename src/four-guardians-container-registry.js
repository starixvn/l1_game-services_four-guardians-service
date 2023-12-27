import awilix from "awilix";
import * as Slot from "sc-slot-game-base";
import FourGuardiansJackpotPublisher from "./event-publishers/four-guardians-jackpot-publisher";
import { FourGuardiansFames, FourGuardiansFreeSpins, FourGuardiansRounds } from "./models";
import FourGuardiansPlayGamePermissionValidator from "./validators/four-guardians-play-game-permission-validator";
import notificationAuthenticationHelpers from "./helpers/notification-authentication-helpers";
import FourGuardiansJackpots from "./models/four-guardians-jackpots";

const { asValue, asClass } = awilix;

export default class FourGuardiansContainerRegistry extends Slot.SlotContainerRegistry {
    registerModels() {
        super.registerModels();
        this.container.register({
            roundsRepository: asValue(FourGuardiansRounds),
            famesRepository: asValue(FourGuardiansFames),
            freeSpinsRepository: asValue(FourGuardiansFreeSpins),
            jackpotsRepository: asValue(FourGuardiansJackpots),
        });
    }

    registerValidators() {
        this.container.register({
            playGamePermissionValidator: asClass(FourGuardiansPlayGamePermissionValidator).singleton(),
        });
    }

    registerApis() {
        super.registerApis();
        this.container.register({
            notificationServiceCommunicator: asValue(notificationAuthenticationHelpers),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            jackpotPublisher: asClass(FourGuardiansJackpotPublisher).singleton(),
        });
    }
}
