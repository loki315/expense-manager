const catchAsync = require("../utils/catchAsync");

exports.getAll = (Model) => {
  return catchAsync(async (req, res, next) => {
    const docs = await Model.find({
      user: req.params.id,
    });
    res.status(200).json({
      success: true,
      count: docs.length,
      data: {
        data: docs,
      },
    });
  });
};

exports.getOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new Error("Not found"));
    }
    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    });
  });
};

exports.createOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        data: newDoc,
      },
    });
  });
};

exports.updateOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new Error("Not found"));
    }
    res.status(200).json({
      success: true,
      data: {
        data: doc,
      },
    });
  });
};

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new Error("Not found"));
    }
    res.status(204).json({
      success: true,
      data: null,
    });
  });
};
