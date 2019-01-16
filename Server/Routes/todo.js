const express = require("express");
const schema = require("../Schema/todo");
const api = express.Router();

api.get("/", (req, res) => {
  schema
    .find()
    .then(data => {
      res.status(200).send({ status: true, message: "", data });
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: false, message: "internal server error", data: null });
    });
});

api.get("/:id", (req, res) => {
  const { id } = req.params;
  schema
    .findOne({ _id: id })
    .then(data => {
      res.status(200).send({ status: true, message: "", data });
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: false, message: "internal server error", data: null });
    });
});

api.post("/", (req, res) => {
  const { title, description } = req.body;
  if (title && description) {
    schema
      .create({ ...req.body, status: false })
      .then(data => {
        res.status(200).send({ status: true, data, message: "" });
      })
      .catch(err => {
        res.status(500).send({
          status: false,
          data: null,
          message: "internal server error"
        });
      });
    return;
  }
  res
    .status(500)
    .send({ status: false, data: null, message: "data is not complete" });
});

api.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, status, description } = req.body;
  schema
    .updateOne({ _id: id }, { $set: { title, status, description } })
    .then(e => schema.findOne({ _id: id }))
    .then(data => {
      res.status(200).send({ status: true, message: "", data });
    })
    .catch(err => {
      res
        .status(500)
        .send({ status: false, data, message: "internal server error" });
    });
});

module.exports = api;
