import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment-reworked";

const modelName = "FourGuardians_phien";

const Schema = new mongoose.Schema({
    result: { type: Array },
    settlementResult: { type: Number },
    time: { type: Date },
    uid: { type: String, required: true },
    name: { type: String, required: true },

    bet: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    paylines: { type: Array },
    thanhtoan: { type: Boolean, default: false },
    betwin: { type: Number, default: 0 },
    bonusChests: { type: Object },
    odds: { type: Object },

    memberId: { type: Number },
    siteId: { type: String },
});

Schema.plugin(autoIncrement.MongooseAutoIncrementID.plugin, { modelName, field: "id" });

const rounds = mongoose.model(modelName, Schema);

export { rounds as FourGuardiansRounds };
