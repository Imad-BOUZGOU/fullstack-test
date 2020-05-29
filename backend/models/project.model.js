const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    company: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    services: { type: String, required: true },

}, {
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
