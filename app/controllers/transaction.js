const { Transaction, House } = require("../../models");

// CREATE TRANSACTION
exports.addTransaction = async (req, res) => {
  try {
    if (!req.body.houseId) {
      return res.status(200).send({
        status: "false",
        msg: "Failed STORE New Transaction",
      });
    }

    const trxData = await Transaction.create({
      house_id: req.body.houseId,
      ...req.body,
    });

    const trxStore = await Transaction.findOne({
      where: {
        id: trxData.id,
      },
      include: {
        model: House,
        as: "house",
        attributes: {
          exclude: ["city_id", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["house_id", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "true",
      msg: "Success STORE New Transaction",
      data: { trxStore },
    });
  } catch (error) {
    console.log("ERRORRRRRRRR: ", error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};
