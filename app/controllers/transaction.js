const { Transaction, House, Location } = require("../../models");

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
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

// UPDATE TRANSACTION
exports.updateTransaction = async (req, res) => {
  try {
    let newTrx = req.body;

    newTrx = {
      ...newTrx,
      house_id: req.body.houseId,
    };

    await Transaction.update(newTrx, {
      where: {
        id: req.params.id,
      },
    });

    let updatedTransaction = await Transaction.findOne({
      where: {
        id: req.params.id,
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

    // console.log("TRX DATA: ", updatedTransaction);
    res.status(200).send({
      status: "true",
      msg: `Transaction Data ID ${req.params.id} Updated`,
      data: {
        updatedTransaction,
        status: "Approve",
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);

    res.status(500).send({
      status: "false",
      msg: "Internal Server Error UPDATE",
    });
  }
};

// GET ALL TRANSACTION
exports.getTransactions = async (req, res) => {
  try {
    const TransactionList = await Transaction.findAll({
      include: {
        model: House,
        as: "house",
        include: {
          model: Location,
          as: "city",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["city_id", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["house_id", "createdAt", "updatedAt"],
      },
    });

    const TransactionLoop = TransactionList.map((trxData) => {
      return {
        id: trxData.id,
        checkin: trxData.checkin,
        checkout: trxData.checkout,
        house: {
          id: trxData.house.id,
          name: trxData.house.name,
          city: {
            id: trxData.house.city.id,
            name: trxData.house.city.name,
          },
          address: trxData.house.address,
          price: trxData.house.price,
          typeRent: trxData.house.typeRent,
          ameneties: trxData.house.ameneties.split(","),
          bedroom: trxData.house.bedroom,
          bathroom: trxData.house.bathroom,
        },
        total: trxData.typeRent,
        status: trxData.status,
        attachment: trxData.attachment,
      };
    });

    res.status(200).send({
      status: "true",
      msg: "Success GET All Transaction",
      data: TransactionLoop,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
    });
  }
};

// GET HOUSES FROM PARAMS(ID)
exports.getTransaction = async (req, res) => {
  try {
    const TransactionData = await Transaction.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: House,
        as: "house",
        include: {
          model: Location,
          as: "city",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        attributes: {
          exclude: ["city_id", "createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["house_id", "createdAt", "updatedAt"],
      },
    });

    console.log("TRX BY ID: ", TransactionData.total);

    res.status(200).send({
      status: "true",
      msg: `Success GET House Transaction ${req.params.id}`,
      data: {
        id: TransactionData.id,
        checkin: TransactionData.checkin,
        checkout: TransactionData.checkout,
        house: {
          id: TransactionData.house.id,
          name: TransactionData.house.name,
          city: {
            id: TransactionData.house.city.id,
            name: TransactionData.house.city.name,
          },
          address: TransactionData.house.address,
          price: TransactionData.house.price,
          typeRent: TransactionData.house.typeRent,
          ameneties: TransactionData.house.ameneties.split(","),
          bedroom: TransactionData.house.bedroom,
          bathroom: TransactionData.house.bathroom,
        },
        total: TransactionData.typeRent,
        status: TransactionData.status,
        attachment: TransactionData.attachment,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "Failed GET Transaction",
    });
  }
};
