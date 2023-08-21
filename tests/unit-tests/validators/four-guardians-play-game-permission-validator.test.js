import { PlayGamePermissionValidator } from "sc-game-base/src/core/validators";
import { SlotGameData } from "sc-slot-game-base";
import FourGuardiansPlayGamePermissionValidator from "../../../src/validators/four-guardians-play-game-permission-validator";

describe("FourGuardiansPlayGamePermissionValidator", () => {
    let fourGuardiansPlayGamePermissionValidator;
    const gameData = new SlotGameData();
    gameData.gameConfigs = {
        slotsConfig: {
            jackpot: {
                enabled: true,
            },
        },
    };
    beforeEach(() => {
        fourGuardiansPlayGamePermissionValidator = new FourGuardiansPlayGamePermissionValidator(null, gameData);
    });

    it("should inherit PlayGamePermissionValidator", () => {
        //assert
        expect(fourGuardiansPlayGamePermissionValidator instanceof PlayGamePermissionValidator);
    });

    describe("isHavePlayingPermission", () => {
        describe("when userSession.disableJackpotGames is true", () => {
            it("should return false", async () => {
                // Arrange
                const userSession = { disableJackpotGames: true };

                // Act
                const actualValue = await fourGuardiansPlayGamePermissionValidator.isHavePlayingPermission(userSession);

                // Assert
                expect(actualValue).toBeFalse();
            });
        });

        describe("when userSession.disableJackpotGames is false", () => {
            describe("when other conditions is not passed", () => {
                it("should return false", async () => {
                    // Arrange
                    const userSession = { disableJackpotGames: false };
                    jest.spyOn(PlayGamePermissionValidator.prototype, "isHavePlayingPermission").mockReturnValueOnce(false);

                    // Act
                    const actualValue = await fourGuardiansPlayGamePermissionValidator.isHavePlayingPermission(userSession);

                    // Assert
                    expect(actualValue).toBeFalse();
                });
            });

            describe("when other conditions is  passed", () => {
                it("should return true", async () => {
                    // Arrange
                    const userSession = { disableJackpotGames: false };
                    jest.spyOn(PlayGamePermissionValidator.prototype, "isHavePlayingPermission").mockReturnValueOnce(true);

                    // Act
                    const actualValue = await fourGuardiansPlayGamePermissionValidator.isHavePlayingPermission(userSession);

                    // Assert
                    expect(actualValue).toBeTrue();
                });
            });
        });
    });
});
