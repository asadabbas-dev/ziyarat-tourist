const { Op } = require("sequelize");
const db = require("../database/models");
const { Tourist, Country, User } = require("../database/models");

const createTourist = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const { firstName, lastName, email, phone, address, tourId, cninc, age } =
      req.body;

    const userObj = {
      firstName,
      lastName,
      email,
      phone,
      address,
      roleId,
    };
    let touristObj = {
      ...userObj,
      tourId,
      cninc,
      age,
    };

    const user = await User.create(userObj, { transaction });

    const touristPromise = await Tourist.create(
      { ...touristObj, userId: user.userId },
      { transaction }
    );

    await Promise.all(touristPromise);
    await transaction.commit();

    res.status(201).json({
      data: touristPromise,
      message: "tourist created successfully",
      status: "success",
    });
  } catch (error) {
    await transaction.rollback();
    console.error("error saving parent and children:", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const updateTourist = async (req, res) => {
  try {
    let request = await getTouristRequestObj(req);

    const userObj = request[0];
    const touristObj = request[1];
    let existingEntity = await User.findByPk(userObj.userId, {
      raw: true,
      Include: {},
    });

    if (!existingEntity) {
      return res.status(404).json({ error: "user not found" });
    }

    let userUpdate = await User.update(
      {
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        phone: userObj.phone,
        address: userObj.address,
      },
      {
        where: {
          userId: userObj.userId,
        },
      }
    );

    let touristUpdate = await Tourist.update(
      {
        name: userObj.firstName + " " + userObj.lastName,
        email: userObj.email,
        cnic: userObj.cnic,
        age: userObj.age,
        phone: userObj.phone,
        address: userObj.address,
      },
      {
        where: {
          userId: userObj.userId,
        },
      }
    );

    console.log("existing user is: ", existingEntity);

    res.status(201).json({
      data: resultUpdate,
      message: "tourist updated successfully",
      status: "success",
    });
  } catch (error) {
    console.error("something went wrong with this error: ", error);
    res.status(500).json({
      data: null,
      message: "internal server error i.e. " + error,
      status: "error",
    });
  }
};

const getByTouristId = async (req, res) => {
  const touristDetails = await getTouristDetails(req.params.id);
  console.log(touristDetails);
  res.status(200).json({
    data: touristDetails,
    message: "tour get successfully.",
    status: "success",
  });
};

const getTourists = async (req, res) => {
  let { pageSize, pageNumber } = req.query;
  pageSize = parseInt(pageSize) || 10;
  pageNumber = parseInt(pageNumber) || 1;
  let offset = (pageNumber - 1) * pageSize;

  const totalTours = await Tourist.count();

  let tourists = await Tourist.findAll({
    where: {
      tourId: {
        [Op.eq]: req.params.tourId,
      },
    },
    limit: pageSize,
    offset: offset,
  });
  return res.status(200).json({
    data: tourists,
    message: "tourists get successfully.",
    status: "success",
    paginated: {
      totalCount: totalTours,
      pageNumber: pageNumber,
      pageSize: pageSize,
    },
  });
};

const deleteTourist = async (req, res) => {
  try {
    let existingTourist = await Tourist.findOne({
      raw: true,
      where: {
        userId: req.params.id,
      },
    });
    if (!existingTourist) {
      return res.status(404).json({
        data: null,
        message: "no results found for the given query",
        status: "error",
      });
    }
    let result = await Tourist.destroy({
      where: {
        touristId: req.params.id,
      },
    });

    res.status(200).json({
      data: result,
      message: "tourist deleted successfully.",
      status: "success",
    });
  } catch (error) {
    console.error("error while deleting entity:", error);
    res.status(500).json({
      data: null,
      message: "something went wrong: " + error.message,
      status: "error",
    });
  }
};

const getTouristDetails = async (touristId) => {
  const tourist = await Tourist.findByPk(parseInt(touristId));
  return tourist;
};

const getTouristRequestObj = async (req) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phone, address, tourId, cninc, age } =
    req.body;
  const userObj = {
    firstName,
    lastName,
    email,
    phone,
    address,
    roleId,
    userId,
  };
  const touristObj = {
    ...userObj,
    tourId,
    cninc,
    age,
  };

  let response = [];
  response.push(userObj);
  response.push(touristObj);
  return response;
};

module.exports = {
  createTourist,
  updateTourist,
  getTourists,
  getByTouristId,
  deleteTourist,
};
