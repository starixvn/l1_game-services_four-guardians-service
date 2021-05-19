import mongoose from "mongoose";
import { Models } from "sc-slot-game-base";

const modelName = "FourGuardians_round";
const roundSchema = Models.RoundsSchema;

export default mongoose.model(modelName, roundSchema);
