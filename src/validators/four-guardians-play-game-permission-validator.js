import { PlayGamePermissionValidator } from "sc-game-base/src/core/validators";

export default class FourGuardiansPlayGamePermissionValidator extends PlayGamePermissionValidator {
    isHavePlayingPermission(userSession) {
        const { jackpot } = this.gameData.gameConfigs.slotsConfig;
        return (!jackpot.enabled || !userSession.disableJackpotGames) && super.isHavePlayingPermission(userSession);
    }
}
