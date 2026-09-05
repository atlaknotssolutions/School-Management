const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: "FeeInvoice", required: true },
    studentId: { type: String, required: true },
    amount: { type: Number, required: true },
    mode: { type: String, enum: ["Cash", "Card", "UPI", "Net Banking", "Cheque", "Online Gateway"], required: true },
    transactionId: { type: String },
    receiptNo: { type: String, required: true },
    paidOn: { type: Date, default: Date.now },
    collectedBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
