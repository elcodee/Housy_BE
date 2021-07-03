const { House, Location } = require("../models");

// CREATE HOUSE
exports.addHouse = async (req, res) => {
  try {
    const houseData = await House.create({
      ...req.body,
    });

    const HouseDataStored = await House.findOne({
      where: {
        name: req.body.name,
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

    res.send({
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
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);
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

    const housesLoop = HouseList.map((houseData) => {
      return {
        id: houseData.id,
        name: houseData.name,
        address: houseData.address,
        price: houseData.price,
        typeRent: houseData.typeRent,
        ameneties: houseData.ameneties.split(","),
        bedroom: houseData.bedroom,
        bathroom: houseData.bathroom,
        city: {
          id: houseData.city.id,
          name: houseData.city.name,
        },
      };
    });

    res.status(200).send({
      status: "true",
      msg: "Success GET All House",
      data: housesLoop,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
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
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
    });
  }
};
