import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment-reworked";
import { Models } from "sc-slot-game-base";

const freeSpinSchema = Models.FreeSpinsSchema;
const modelName = "FourGuardians_freespin";

freeSpinSchema.plugin(autoIncrement.MongooseAutoIncrementID.plugin, { modelName, field: "id" });

export default mongoose.model(modelName, freeSpinSchema);
