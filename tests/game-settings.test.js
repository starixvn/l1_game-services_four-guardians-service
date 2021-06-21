import AppConfigs from "../src/app-configs";
import GameSettings from "../src/game-settings";

describe("GameSettings", () => {
    it("bet choices should have enough 25 paylines", () => {
        // act
        var betChoices = GameSettings.choices;

        // assert
        expect(betChoices.length).toEqual(25);
    });

    it("freeSpinLiveSeconds should get from approriate config", () => {
        // assert
        expect(GameSettings.freeSpinLiveSeconds).toEqual(AppConfigs.freeSpinLiveSeconds);
    });

    it("freeSpinLiveSeconds should get from approriate config", () => {
        // assert
        expect(GameSettings.bonusLiveSeconds).toEqual(AppConfigs.bonusLiveSeconds);
    });
});
