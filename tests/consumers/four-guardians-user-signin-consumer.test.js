import { stub } from "jest-micro-auto-stub";
import UserSignInPublisher from "sc-game-base/src/core/event-publishers/user-signin-publisher";
import UserSignInConsumer from "sc-slot-game-base/src/event-consumers/user-signin-consumer";
import FourGuardiansUserSignInConsumer from "../../src/consumers/four-guardians-user-signin-consumer";

describe("FourGuardiansUserSignInConsumer", () => {
    let userSignInPublisher;
    let fourGuardiansUserSignInConsumer;

    beforeEach(() => {
        userSignInPublisher = stub(UserSignInPublisher);
        fourGuardiansUserSignInConsumer = new FourGuardiansUserSignInConsumer({}, {}, userSignInPublisher);
    });

    it("should inherit UserSignInConsumer", () => {
        //assert
        expect(fourGuardiansUserSignInConsumer instanceof UserSignInConsumer);
    });

    describe("consume", () => {
        describe("when disableJackpotGames", () => {
            it("should handleUnauthorizedSignIn", async () => {
                // Arrange
                const socketClient = { disconnect: jest.fn() };
                const payload = { disableJackpotGames: true };
                jest.spyOn(fourGuardiansUserSignInConsumer, "handleUnauthorizedSignIn");

                // Act
                await fourGuardiansUserSignInConsumer.consume(socketClient, payload);

                // Assert
                expect(fourGuardiansUserSignInConsumer.handleUnauthorizedSignIn).toHaveBeenCalled();
            });
        });

        describe("when not disableJackpotGames", () => {
            it("should call super.consume", async () => {
                // Arrange
                const socketClient = { disconnect: jest.fn() };
                const payload = { disableJackpotGames: false };
                jest.spyOn(UserSignInConsumer.prototype, "consume");

                // Act
                await fourGuardiansUserSignInConsumer.consume(socketClient, payload);

                // Assert
                expect(UserSignInConsumer.prototype.consume).toHaveBeenCalled();
            });
        });
    });
});
