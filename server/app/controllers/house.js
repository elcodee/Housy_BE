const { House, Location, User, Role, House_img } = require("../../models");
// const { Op } = require("sequelize");

// CREATE HOUSE
exports.addHouse = async (req, res) => {
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
      const houseDatas = {
        ...req.body,
        city_id: req.body.cityId,
      };

      const imgDatas = {
        thumb: process.env.HOUSE_IMG_URL + req.files.photo[0].filename,
        detail_one: process.env.HOUSE_IMG_URL + req.files.detailOne[0].filename,
        detail_two: process.env.HOUSE_IMG_URL + req.files.detailTwo[0].filename,
        detail_three:
          process.env.HOUSE_IMG_URL + req.files.detailThree[0].filename,
      };

      const imgData = await House_img.create({
        ...imgDatas,
      });

      await House.create({
        ...houseDatas,
        img_id: imgData.id,
      });

      const HouseDataStored = await House.findOne({
        where: {
          name: req.body.name,
        },
        include: [
          {
            model: Location,
            as: "city",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: House_img,
            as: "image",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["city_id", "createdAt", "updatedAt"],
        },
      });

      res.status(200).send({
        status: "true",
        msg: "Success STORE New House",
        data: {
          id: HouseDataStored.id,
          name: HouseDataStored.name,
          address: HouseDataStored.address,
          price: HouseDataStored.price,
          typeRent: HouseDataStored.typeRent,
          ameneties: HouseDataStored.ameneties.split(","),
          bedroom: HouseDataStored.bedroom,
          bathroom: HouseDataStored.bathroom,
          city: {
            id: HouseDataStored.city.id,
            name: HouseDataStored.city.name,
          },
          image: {
            id: HouseDataStored.image.id,
            thumb: HouseDataStored.image.thumb,
            detail_one: HouseDataStored.image.detail_one,
            detail_two: HouseDataStored.image.detail_two,
            detail_three: HouseDataStored.image.detail_three,
          },
        },
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "You don't have permission",
      });
    }
  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).send({
      status: "failed",
      message: "internal server error",
    });
  }
};

// GET ALL HOUSES
exports.getHouses = async (req, res) => {
  try {
    const HouseList = await House.findAll({
      include: [
        {
          model: Location,
          as: "city",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: House_img,
          as: "image",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["img_id", "house_id", "city_id", "createdAt", "updatedAt"],
      },
    });

    const housesLoop = HouseList.map((houseData) => {
      houseData.ameneties.split(",");
      return houseData;
    });

    res.status(200).send({
      status: "true",
      msg: "Success GET All House",
      data: housesLoop,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "Failed GET All House",
    });
  }
};

// GET HOUSES FROM PARAMS(ID)
exports.getHouse = async (req, res) => {
  try {
    const HouseData = await House.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Location,
          as: "city",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: House_img,
          as: "image",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["city_id", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "true",
      msg: "Success GET House",
      data: {
        id: HouseData.id,
        name: HouseData.name,
        address: HouseData.address,
        price: HouseData.price,
        typeRent: HouseData.typeRent,
        ameneties: HouseData.ameneties.split(","),
        bedroom: HouseData.bedroom,
        bathroom: HouseData.bathroom,
        city: {
          id: HouseData.city.id,
          name: HouseData.city.name,
        },
        image: {
          id: HouseData.image.id,
          thumb: HouseData.image.thumb,
          detail_one: HouseData.image.detail_one,
          detail_two: HouseData.image.detail_two,
          detail_three: HouseData.image.detail_three,
        },
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
    });
  }
};

// UPDATE HOUSE
exports.updateHouse = async (req, res) => {
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
      let newHouse = req.body;

      newHouse = {
        ...newHouse,
        city_id: req.body.cityId,
      };

      await House.update(newHouse, {
        where: {
          id: req.params.id,
        },
      });

      const updatedHouse = await House.findOne({
        where: {
          id: req.params.id,
        },
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
      });

      res.status(200).send({
        status: "true",
        msg: `House Data ID ${req.params.id} Updated`,
        data: { updatedHouse },
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "You don't have permission",
      });
    }
  } catch (error) {
    console.log("ERROR: ", error);

    res.status(500).send({
      status: "false",
      msg: "Internal Server Error UPDATE",
    });
  }
};

// DELETE HOUSE
exports.deleteHouse = async (req, res) => {
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
      const deleteHouse = await House.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deleteHouse) {
        return res.status(404).send({
          status: "false",
          msg: "House ID Doesn't Exist",
        });
      }

      res.status(200).send({
        status: "true",
        msg: `Success DELETE House ID ${req.params.id}`,
        data: { id: req.params.id },
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: "You don't have permission",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "internal server error",
    });
  }
};
