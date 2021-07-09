const { Transaction, House, Location, User, Role } = require("../../models");

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
      user_id: req.idUser,
      attachment:
        process.env.TRANSACTION_IMG_URL + req.files.attachment[0].filename,
      ...req.body,
    });

    const trxStore = await Transaction.findOne({
      where: {
        id: trxData.id,
      },
      include: [
        {
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
            exclude: ["city_id", "img_id", "createdAt", "updatedAt"],
          },
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: [
              "id",
              "role_id",
              "username",
              "password",
              "gender",
              "createdAt",
              "updatedAt",
            ],
          },
        },
      ],
      attributes: {
        exclude: ["user_id", "house_id", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "true",
      msg: "Success STORE New Transaction",
      data: trxStore,
    });
  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

// UPDATE TRANSACTION
exports.updateTransaction = async (req, res) => {
  try {
    const UserValidate = await User.findOne({
      where: {
        id: req.idUser,
      },
      include: {
        model: Role,
        as: "listAs",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["role_id", "password", "createdAt", "updatedAt"],
      },
    });

    if (UserValidate.listAs.name === "owner") {
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

      res.status(200).send({
        status: "true",
        msg: `Transaction Data ID ${req.params.id} Updated`,
        data: {
          updatedTransaction,
          status: "Approve",
        },
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "You don't have permission",
      });
    }
  } catch (error) {
    console.log("TRX ERR: ", error);
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
      trxData.house.ameneties.split(",");
      return trxData;
    });

    res.status(200).send({
      status: "true",
      msg: "Success GET All Transaction",
      data: TransactionLoop,
    });
  } catch (error) {
    console.log("ERR: ", error);
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
