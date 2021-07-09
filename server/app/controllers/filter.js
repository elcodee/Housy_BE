const { House, Location } = require("../../models");
const { Op } = require("sequelize");

// FILTER BY SINGLE PARAM
exports.housesFilter = async (req, res) => {
  try {
    const getKeyValue = { ...req.query };

    let fieldFilter = {};

    switch (getKeyValue.typeRent) {
      case null:
        fieldFilter;
      default:
        fieldFilter.typeRent = {
          [Op.eq]: getKeyValue.typeRent,
        };
    }

    switch (getKeyValue.belowPrice) {
      case null:
        fieldFilter;
      default:
        fieldFilter.price = {
          [Op.lte]: getKeyValue.belowPrice,
        };
    }

    const HouseList = await House.findAll({
      where: fieldFilter,
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
      houseData.ameneties.split(",");
      return houseData;
    });

    res.status(200).send({
      status: "true",
      msg: "Success FILTER Houses",
      data: housesLoop,
    });
  } catch (error) {
    console.log("ERR: ", error);
    res.status(500).send({
      status: "false",
    });
  }
};
