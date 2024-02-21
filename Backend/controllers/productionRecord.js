import Bike from "../models/bikes.js";
import Bikes from "../models/bikes.js";
import Production from "../models/productionRecords.js";
import moment from "moment";

const selectBike = async (req, res) => {
  try {
    const { userId, bikeId, str } = req.body;

    if (str === "post") {
      const bike = await Bikes.findById(bikeId);
      if (!bike) {
        return res.status(404).json({ message: "Bike not found" });
      }
      const assemblyTime = bike.assemblyTime;
      const statusCheck = await Production.find({
        employeeId: userId,
        status: "Inprogress",
      });
      const record = {
        employeeId: userId,
        bikeId,
        assemblyTime,
        status: "Inprogress",
      };

      if (statusCheck.length === 0) {
        await Production.create(record);
        const empBikelist = await Production.find({
          employeeId: userId,
        }).populate("bikeId");

        res.status(201).json({ success: true, data: empBikelist });
      } else {
        const empBikelist = await Production.find({
          employeeId: userId,
        }).populate("bikeId");
        res.status(200).json({
          success: true,
          data: empBikelist,
          message: "Already another bike is Inprogress",
        });
      }
    } else if (str === "get") {
      const empBikelist = await Production.find({
        employeeId: userId,
      }).populate("bikeId");

      res.status(200).json({ success: true, data: empBikelist });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecords = async (req, res) => {
  // console.log(req.query);
  try {
    const { userId, date } = req.query;
    const bikes = await Bike.find();
    const targetDate = new Date(date);
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);
    const productionRecords = await Production.find({
      employeeId: userId,
      updatedAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      status: "Completed",
    }).populate("bikeId");

    res
      .status(200)
      .json({ success: true, data: productionRecords, bikes: bikes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllRecords = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    let matchStage;
    let productionRecords;

    if (fromDate && toDate) {
      const formattedFromDate = moment(fromDate, "YYYY-MM-DD")
        .startOf("day")
        .toDate();
      const formattedToDate = moment(toDate, "YYYY-MM-DD")
        .endOf("day")
        .toDate();

      matchStage = {
        updatedAt: {
          $gte: formattedFromDate,
          $lte: formattedToDate,
        },
        status: "Completed",
      };
    } else matchStage = { status: "Completed" };
    const groupStage = {
      _id: "$bikeId",
      count: { $sum: 1 },
    };
    const aggregatedData = await Production.aggregate([
      { $match: matchStage },
      { $group: groupStage },
    ]);
    productionRecords = await Production.populate(aggregatedData, {
      path: "_id",
      select: "name",
      model: "Bike",
    });

    res.status(200).json({ success: true, data: productionRecords });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStatusBike = async (req, res) => {
  try {
    const { _id, status, assemblyTime, userId } = req.body;

    const updatedDocument = await Production.findByIdAndUpdate(
      _id,
      { status, assemblyTime },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }
    const empBikelist = await Production.find({
      employeeId: userId,
    }).populate("bikeId");

    // res.status(200).json({ success: true, data: empBikelist });
    // console.log('updatedDocument:', updatedDocument);

    return res
      .status(200)
      .json({ message: "Status updated successfully", empBikelist });
  } catch (err) {
    // console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getDatabyId = async (req, res) => {
  try {
    const { userId } = req.body;
    const bikeRecord = await Production.find({ employeeId: userId });
    console.log("bikeRecord::: ", bikeRecord);
    return res
      .status(200)
      .json({ message: "Retrived All Bikes successfully", bikeRecord });
  } catch (error) {
    console.log("error::: ", error);
    return res.status(500).json({ message: err.message });
  }
};

export default {
  selectBike,
  getRecords,
  getAllRecords,
  updateStatusBike,
  getDatabyId,
};
