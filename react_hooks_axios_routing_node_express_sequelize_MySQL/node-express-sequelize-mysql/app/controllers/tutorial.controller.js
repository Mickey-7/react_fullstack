// invoke index.js from models folder
const db = require("../models");
//invoking the database table
const Tutorial = db.tutorials;
///invoking Sequelize
const Op = db.Sequelize.Op;

//create
exports.create = (req, res) => {
  //validate input tile must not be empty
  if (!req.body.title) {
    res.status(400).send({
      message: "title must not be emplty!",
    });
    return;
  }

  //create tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  //save tutorial in database
  Tutorial.create(tutorial)
    //tutorial above was defined on model/tutorial.model.js
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating tutorial",
      });
    });
};

//retrieve object (with condition)
exports.findAll = (req, res) => {
  //create storage for title query
  const title = req.query.title;
  // invoke condirtion for the title query comparison using like
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  //invoking the condition and access database
  Tutorial.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving tutorial;",
      });
    });

  // We use req.query.title to get query string from the
  // Request and consider it as condition for findAll() method.
};

// Retrieve a single object
exports.findOne = (req, res) => {
  //get the id params
  const id = req.params.id;

  //invoke access database
  Tutorial.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "",
      });
    });
};

// Update an object
exports.update = (req, res) => {
  //get the id params
  const id = req.params.id;

  ///invokle database access
  Tutorial.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update tutorial with id=${id}.\n
                       Maybe tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating tutorial with id" + id,
      });
    });
};

// Delete an object
exports.delete = (req, res) => {
  //get the id params
  const id = req.params.id;

  ///invokle database access
  Tutorial.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete tutorial with id=${id}.\n
                       Maybe tutorial was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting tutorial with id" + id,
      });
    });
};

// Delete all objects
exports.deleteAll = (req, res) => {
  //invoking database delete all
  Tutorial.destroy({ where: {}, truncate: false }).then((nums) => {
    res
      .send({
        message: `${nums} tutorials were deleted successfully`,
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials.",
        });
      });
  });
};

// Find all objects by condition
exports.findAllPublished = (req, res) => {
  //invoking database to find all published
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
