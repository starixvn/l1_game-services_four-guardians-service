import { Models } from "sc-slot-game-base";

const freeSpins = mongoose.model("FourGuardians_freespin", Models.FreeSpinsSchema);

export { freeSpins as FourGuardiansFreeSpins };
