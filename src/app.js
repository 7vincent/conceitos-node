const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const likes = 0;
  const id = uuid();
  const repo = {
    id,
    likes,
    ...request.body
  }
  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const id = request.params.id; 
  const repositoreIndex = repositories.findIndex(repo =>
      repo.id===id
      );
  if(repositoreIndex === -1){
    return response.status(400).json({error: "Repository does not exists"});
  }
  const repoRequest = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoreIndex].likes,
  }
  repositories[repositoreIndex] = repoRequest;
  return response.json(repoRequest);   
});

app.delete("/repositories/:id", (request, response) => {
  const id = request.params.id; 
  const repositoreIndex = repositories.findIndex(repo =>
      repo.id===id
      );
  if(repositoreIndex === -1){
    return response.status(400).json({error: "Repository does not exists"});
  }
  repositories.splice(repositories[repositoreIndex]);
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repositoreIndex = repositories.findIndex(repo =>
    repo.id===id
    );
  if(repositoreIndex === -1){
    return response.status(400).json({error: "Repository does not exists"});
  }

  repositories[repositoreIndex].likes += 1;

  return response.json(repositories[repositoreIndex])

});

module.exports = app;
