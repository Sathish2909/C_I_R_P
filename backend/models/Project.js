const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  domainId: { type: mongoose.Schema.Types.ObjectId, ref: "Domain", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  level: { type: String, enum: ["easy", "medium", "hard"], required: true },
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    profilePhoto: { type: String, required: true },
  },
  publishedPapers: [
    {
      title: { type: String },
      date: { type: Date },
      fileUrl: { type: String },
    },
  ],
  futureAdvancements: { type: String },
  issuesFaced: { type: String },
  referenceLinks: [{ type: String }],
  relatedImages: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", projectSchema);