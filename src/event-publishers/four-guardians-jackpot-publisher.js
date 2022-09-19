import { JackpotPublisher } from "sc-slot-game-base/src/event-publishers";

export default class FourGuardiansJackpotPublisher extends JackpotPublisher {
    /**
     * @param {Number} gameId
     * @param {String} gameName
     * @param {SlotGameData} gameData
     * @param {Object} notificationServiceCommunicator
     * @param {logger} logService
     * @param {Object} appConfigs
     */

    constructor(gameId, gameName, gameData, logService, appConfigs, notificationServiceCommunicator) {
        super(gameId, gameName, gameData, logService, appConfigs);
        this.notificationServiceCommunicator = notificationServiceCommunicator;
    }

    async sendJackpotWinner(winner) {
        try {
            const params = {
                gameId: this.gameId,
                ...winner,
            };

            await this.notificationServiceCommunicator.post("jackpotWinner", params);
        } catch (error) {
            this.logService.logError(error);
        }
    }
}
