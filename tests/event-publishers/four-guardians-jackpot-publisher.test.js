import FourGuardiansJackpotPublisher from "../../src/event-publishers/four-guardians-jackpot-publisher";
import notificationAuthenticationHelpers from "../../src/helpers/notification-authentication-helpers";
import Chance from "chance";
import { logger } from "sc-common";

const chance = new Chance();

describe("fourGuardiansJackpotPublisher", () => {
    jest.mock("../../src/helpers/notification-authentication-helpers");
    jest.mock("sc-common");

    const winner = {
        name: chance.name_suffix(),
        amount: chance.natural(),
    };

    const gameId = chance.integer({ min: 1, max: 100 }),
        gameName = chance.string(),
        gameData = {},
        notificationServiceCommunicator = notificationAuthenticationHelpers,
        logService = logger,
        appConfigs = {
            notificationApiSettings: {
                url: chance.url(),
                auth: {
                    url: chance.url(),
                    id: "game-services",
                    secret: "gameservices",
                },
                requestTimeout: 10000,
                useAuthenticate: true,
            },
        };

    let publisher;

    beforeEach(() => {
        jest.clearAllMocks();

        publisher = new FourGuardiansJackpotPublisher(gameId, gameName, gameData, logService, appConfigs, notificationServiceCommunicator);
    });

    describe("sendJackpotWinner", () => {
        describe("when throw error", () => {
            it("should call logger.logError", async () => {
                // Arrange
                const error = new Error(chance.string());
                logger.logError = jest.fn();
                notificationAuthenticationHelpers.post = jest.fn().mockImplementation(() => {
                    throw error;
                });

                // Act
                await publisher.sendJackpotWinner(winner);

                // Assert
                expect(logger.logError).toBeCalledWith(error);
            });
        });

        describe("when having no error", () => {
            it("should call mainServerCommunicator.post", async () => {
                // Arrange
                notificationAuthenticationHelpers.post = jest.fn();

                // Act
                await publisher.sendJackpotWinner(winner);

                // Assert
                expect(notificationAuthenticationHelpers.post).toBeCalledWith("jackpotWinner", {
                    gameId: gameId,
                    ...winner,
                });
            });
        });
    });
});
