const { User, Role } = require("../../models");
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

    const { errors } = validateData.validate(req.body);

    if (errors) {
      return res.status(200).send({
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
      return res.status(200).send({
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
      return res.status(200).send({
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

    res.status(200).send({
      status: "true",
      msg: "Register Success",
      data: {
        username: dataUser.username,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "Error Authentication",
    });
  }
};

// POST USER ( SIGN IN )
exports.signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validateData = joi.object({
      username: joi.string().min(4).required(),
      password: joi.string().min(8).required(),
    });

    const { errors } = validateData.validate(req.body);

    if (errors) {
      return res.status(200).send({
        status: "false",
        msg: errors.details[0].message,
      });
    }

    const checkUsername = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!checkUsername) {
      return res.status(200).send({
        status: "false",
        msg: "Username Or Password Incorrect | Username",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      checkUsername.password
    );

    if (!checkPassword) {
      return res.status(200).send({
        status: "false",
        msg: "Username Or Password Incorrect | Password",
      });
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(
      {
        id: checkUsername.id,
      },
      secretKey
    );

    res.status(200).send({
      status: "true",
      msg: "Sign In Success",
      data: {
        username: checkUsername.username,
        token,
      },
    });
  } catch (error) {
    console.log("USER ERR: ", error);
    res.status(500).send({
      status: "false",
      msg: "Error Authentication",
    });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    res.status(200).send({
      status: "true",
      msg: `Transaction Data ID ${req.params.id} Updated`,
      data: {
        updatedTransaction,
        status: "Approve",
      },
    });
  } catch (error) {
    console.log("TRX ERR: ", error);
    res.status(500).send({
      status: "false",
      msg: "Internal Server Error UPDATE",
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

    res.status(200).send({
      status: "true",
      msg: "Success GET All Users",
      data: UserList,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "Failed GET All Users",
    });
  }
};

// GET USER FROM PARAMS (ID)
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

    res.status(200).send({
      status: "true",
      msg: `Success GET User ID : ${UserData.id}`,
      data: UserData,
    });
  } catch (error) {
    res.status(500).send({
      status: "false",
      msg: "Failed GET Users",
    });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
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
      const deleteUser = await User.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!deleteUser) {
        return res.status(200).send({
          status: "false",
          msg: "User ID Doesn't Exist",
        });
      }

      res.status(200).send({
        status: "true",
        msg: "Success DELETE User",
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
