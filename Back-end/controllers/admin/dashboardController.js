const { JobRequisition } = require("../../models/jobRequisition");
const { Note } = require("../../models/note");
const { Candidates } = require("../../models/candidates");
const { User } = require("../../models/user");
const { Activities } = require("../../models/activity");

const dashboardController = {
  getData: async (req, res) => {
    try {
      let data = {};
      const candidates = await Candidates.find().count();
      data = { ...data, candidates: candidates };
      const jobs = await JobRequisition.find().count();
      data = { ...data, jobs: jobs };
      const recruiters = await User.find().count();
      data = { ...data, recruiters: recruiters };
      const activities = await Activities.find().count();
      data = { ...data, activities: activities };
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = dashboardController;
