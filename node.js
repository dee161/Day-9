const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
const express = require("express");
const server = express();
server.use(express.json());
server.use(cors());

server.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "not" });
  }
});

server.post("/user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      time: req.body.time,
      content: req.body.content,
      image: req.body.image,
    },
  });
  res.send(user);
});

server.get("/admin", async (req, res) => {
  const admin = await prisma.admin.findMany();
  res.status(200).send(admin);
});
server.get("/movie", async (req, res) => {
  const movie = await prisma.movie.findMany();
  res.status(200).send(movie);
});
server.post("/admin", async (req, res) => {
  console.log(req.body);
  const admin = await prisma.admin.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    },
  });
  res.send(admin);
});

server.post("/movieadd", async (req, res) => {
  console.log(req.body);
  const movie = await prisma.movie.create({
    data: req.body,
  });
  res.send(movie);
});

server.delete("/moviedelete/:id", async (req, res) => {
  const movieId = parseInt(req.params.id);
  try {
    await prisma.movie.delete({
      where: { id: movieId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).send(" not ");
  }
});

server.delete("/admin/:id", async (req, res) => {
  const adminId = parseInt(req.params.id);
  try {
    await prisma.admin.delete({
      where: { id: adminId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).send(" not ");
  }
});
// use for bulk data
server.post("/movie", async (req, res) => {
  try {
    const movieArray = req.body;
    const moviesCreated = await prisma.movie.createMany({
      data: movieArray.map((movie) => ({
        name: movie.name,
        description: movie.description,
        image: movie.image,
      })),
    });
    res.status(204).send(moviesCreated);
  } catch (e) {
    console.error(e.message);
    res.status(500).send(e.message);
  }
});

server.delete("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).send(" not ");
  }
});

// ------------------------
server.get("/plan", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "not" });
  }
});
// insert
server.post("/plan", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.send(user);
});
// update
server.put("/plan/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });
    res.send(user);
  } catch (error) {
    res.status(404).send("not");
  }
});

server.delete("/plan/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).send("not");
  }
});

server.listen(4000, () => {
  console.log("server started at 4000");
});
