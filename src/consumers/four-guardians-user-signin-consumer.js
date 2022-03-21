import UserSignInConsumer from "sc-slot-game-base/src/event-consumers/user-signin-consumer";

export default class FourGuardiansUserSignInConsumer extends UserSignInConsumer {
    async consume(socketClient, payload) {
        if (payload && payload.disableJackpotGames) {
            this.handleUnauthorizedSignIn(socketClient);
            return false;
        }

        return super.consume(socketClient, payload);
    }
}
