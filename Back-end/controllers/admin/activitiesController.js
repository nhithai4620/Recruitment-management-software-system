const { Activities } = require("../../models/activity");

const activitiesController = {
  addActivity: async (req, res) => {
    try {
      var activity = req.body;
      Activities.findOne({ title: activity.title }, async (err, data) => {
        if (!data) {
          const assigneesId = [];
          const attendeesId = [];

          activity?.assignees.forEach((element) => {
            assigneesId.push(element._id);
          });

          activity?.attendees.forEach((element) => {
            attendeesId.push(element._id);
          });

          console.log(activity);

          const newActivity = await new Activities({
            title: activity.title,
            type: activity.type,
            timeStart: activity?.timeStart,
            timeEnd: activity?.timeEnd,
            location: activity?.location,
            assignees: assigneesId,
            attendees: attendeesId,
            meetingType: activity?.meetingType,
            link: activity?.link,
            tag: activity?.tag,
            description: activity?.description,
          });

          const saveActivity = await newActivity.save();
          res.status(200).json(saveActivity);
        } else {
          res.status(500).json({
            status: "error",
            error: err,
            message: "Activity title already exists, try other title",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error,
        message: "Add activity failed ! please try again",
      });
    }
  },
  listActivity: async (req, res) => {
    try {
      Activities.find((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(data);
        }
      }).populate("assignees attendees");
    } catch (error) {
      res.status(200).json({
        status: "error",
        error: error,
        message: "List activity failed ! please try again",
      });
    }
  },

  getActivity: async (req, res) => {
    try {
      const activityId = req.params.id;
      Activities.findById({ _id: activityId }, (err, data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(500).json(err);
        }
      }).populate("assignees attendees");
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Get activity failed, please try again!",
      });
    }
  },
  deleteActivity: async (req, res) => {
    try {
      const activityId = req.params.id;
      Activities.findByIdAndDelete({ _id: activityId }, (err, data) => {
        if (data) {
          res.status(200).json({ message: "success" });
        } else {
          res.status(500).json(err);
        }
      });
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Get activity failed, please try again!",
      });
    }
  },
  updateActivity: async (req, res) => {
    try {
      const activityId = req.params.id;
      let activity = req.body;

      const date = new Date();
      activity = { ...activity, updated_at: date };

      const updateActivity = await Activities.findByIdAndUpdate(
        { _id: activityId },
        activity,
        { new: true }
      );

      res.status(200).json(updateActivity);
    } catch (error) {
      res.status(500).json({
        error: err,
        message: "Update activity failed, please try again!",
      });
    }
  },
};

module.exports = activitiesController;
