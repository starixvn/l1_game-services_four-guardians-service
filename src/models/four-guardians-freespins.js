import mongoose from "mongoose";
import { Models } from "sc-slot-game-base";

const freeSpinSchema = Models.FreeSpinsSchema;
const modelName = "FourGuardians_freespin";

export default mongoose.model(modelName, freeSpinSchema);
