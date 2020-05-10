// module export to app
module.exports = (app) => {
  //invoke controller
  const tutorials = require("../controllers/tutorial.controller.js");

  //invoking express router
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve Tutorial by id
  router.get("/:id", tutorials.findOne);

  // Update Tutorial by id
  router.put("/:id", tutorials.update);

  // Delete Tutorial by id
  router.delete("/:id", tutorials.delete);

  // Delete all tutorial
  router.delete("/", tutorials.deleteAll);

  // Retrieve published
  router.get("/published", tutorials.findAllPublished);

  //invoking addition on URL
  app.use("/api/tutorials", router);
};

// You can see that we use a controller from /controllers/tutorial.controller.js.
// We also need to include routes in server.js (right before app.listen()):
//     require("./app/routes/turorial.routes")(app);
