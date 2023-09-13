const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const server = express();
server.use(express.json());

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
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.send(user);
});

server.put("/user/:id", async (req, res) => {
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

server.post("/plan", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  res.send(user);
});

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

server.listen(3000, () => {
  console.log("server started at 3000");
});
