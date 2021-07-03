const { User, Role } = require("../models");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE USER ( SIGN UP )
exports.signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validateData = joi.object({
      fullName: joi.string().min(4).required(),
      username: joi.string().min(4).required(),
      email: joi.string().email().required(),
      password: joi.string().min(8).required(),
      listAsId: joi.number().min(1).required(),
      gender: joi.string().required(),
      address: joi.string().min(10).required(),
    });

    const { error } = validateData.validate(req.body);

    if (errors) {
      return res.send({
        status: "false",
        msg: errors.details[0].message,
      });
    }

    const checkUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (checkUsername) {
      return res.send({
        status: "false",
        msg: "Username Already Registered",
      });
    }

    const checkEmail = await User.findOne({
      where: {
        email,
      },
    });

    if (checkEmail) {
      return res.send({
        status: "false",
        msg: "Email Already Registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const dataUser = await User.create({
      ...req.body,
      role_id: req.body.listAsId,
      password: passwordHash,
    });

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: dataUser.id,
      },
      secretKey
    );

    res.send({
      status: "true",
      msg: "Register Success",
      data: {
        username: dataUser.username,
        token,
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);

    res.send({
      status: "false",
      msg: "Error Authentication",
    });
  }
};

// GET USER ( SIGN IN )
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validateData = joi.object({
      username: joi.string().min(4).required(),
      password: joi.string().min(8).required(),
    });

    const { errors } = validateData.validate(req.body);

    if (errors) {
      return res.send({
        status: "false",
        msg: errors.details[0].message,
      });
    }

    const checkUsername = await User.findOne({
      where: {
        username: username,
      },
    });

    // console.log("CEK USRNAME: ", checkUsername);

    if (!checkUsername) {
      return res.send({
        status: "false",
        msg: "Username Or Password Incorrect | Email",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUsername.password
    );

    if (!checkPassword) {
      return res.send({
        status: "false",
        msg: "Username Or Password Incorrect | Pass",
      });
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: checkUsername.id,
      },
      secretKey
    );

    res.send({
      status: "true",
      msg: "Sign In Success",
      data: {
        username: checkUsername.username,
        token,
      },
    });
  } catch (error) {
    console.log("ERROR: ", error);

    res.send({
      status: "false",
      msg: "Error Authentication",
    });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const UserList = await User.findAll({
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

    res.send({
      status: "true",
      msg: "Success GET All Users",
      data: UserList,
    });
  } catch (error) {
    res.send({
      status: "false",
      msg: "Failed GET All Users",
    });
  }
};

// GET USER FROM PARAMS(ID)
exports.getUser = async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        id: req.params.id,
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

    res.send({
      status: "true",
      msg: `Success GET User ID : ${UserData.id}`,
      data: {
        id: UserData.id,
        fullName: UserData.fullName,
        username: UserData.username,
        email: UserData.email,
        password: UserData.password,
        gender: UserData.gender,
        listAs: {
          id: UserData.listAs.id,
          name: UserData.listAs.name,
        },
      },
    });
  } catch (error) {
    res.send({
      status: "false",
      msg: "Failed GET Users",
    });
  }
};

// DELETE USER

exports.deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteUser) {
      return res.send({
        status: "false",
        msg: "User ID Doesn't Exist",
      });
    }

    res.send({
      status: "true",
      msg: "Success DELETE User",
      data: deleteUser.id,
    });
  } catch (error) {
    res.send({
      status: "false",
      msg: "internal server error",
    });
  }
};
