import mongoose from "mongoose";
import { Models } from "sc-slot-game-base";

const hallOfFames = mongoose.model("FourGuardians_halloffame", Models.HallOfFamesSchema);

export { hallOfFames as FourGuardiansHallOfFames };
