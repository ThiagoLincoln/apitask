import fastify from "fastify";

const server = fastify();

const tasks = [
  {
    id: 0,
    checked: true,
    task: "Limpar a casa toda para receber a visita especial dos parentes da Inglaterra.",
  },
];

let nextId = tasks.length;

server.get("/tasks", async (request, reply) => {
  return tasks;
});

server.post("/tasks", async (request, reply) => {
  const { task, checked = false } = request.body as { task: string; checked?: boolean };

  if (!task) {
    reply.status(400).send({ error: "Campo da tarefa nao realizado." });
    return;
  }

  const newTask = {
    id: nextId++,
    checked,
    task,
  };

  tasks.push(newTask);

  reply.status(201).send(newTask);
});

server.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Server is running on http://localhost:3000");
  }
});
