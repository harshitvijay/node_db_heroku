// const knex = require("knex");
// const config = require("../knexfile");
// const db = knex(config.development);
const db = require("../data/dbConfig");

const add = async (lesson) => {
  return await db("lessons").insert(lesson, ["id", "name"]);

  //work for sqlite only
  // const [id] = await db("lessons").insert(lesson);
  // return id;
};

const find = async () => {
  return await db("lessons");
};

const findById = async (id) => {
  return await db("lessons").where({ id }).first();
};

const remove = async (id) => {
  return await db("lessons").where({ id }).del();
};

const update = async (id, changes) => {
  return await db("lessons")
    .where({ id })
    .update(changes)
    .then(async () => {
      return await findById(id);
    });
};

const findMessageById = async (id) => {
  return await db("messages").where({ id }).first();
};

const addMessage = async (message, lesson_id) => {
  return await db("messages").where({ lesson_id }).insert(message, ["id"]);
  // const [id] = await db("messages").where({ lesson_id }).insert(message);
  // return await findMessageById(id);
};

const findLessonMessages = async (lesson_id) => {
  return await db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as lessonID",
      "l.name as lessonName",
      "m.id as messageId",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id });
};

const removeMessage = async (id) => {
  return await db("messages").where({ id }).del();
};

const addUser = async (user) => {
  return await db("users").insert(user, ["id", "username"]);
};

const findAllUser = async () => {
  return await db("users");
};

const findUserByUsername = async (username) => {
  return await db("users").where({ username }).first();
};

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addMessage,
  findLessonMessages,
  removeMessage,
  addUser,
  findAllUser,
  findUserByUsername,
};
