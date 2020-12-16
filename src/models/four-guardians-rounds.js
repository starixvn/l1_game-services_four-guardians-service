import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment-reworked";
import { Models } from "sc-slot-game-base";

const modelName = "FourGuardians_phien";
const roundSchema = Models.RoundsSchema;

roundSchema.plugin(autoIncrement.MongooseAutoIncrementID.plugin, { modelName, field: "id" });

export default mongoose.model(modelName, roundSchema);
