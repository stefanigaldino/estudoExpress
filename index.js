const { request, response } = require('express');
const express = require('express');
const {v4:uuidv4} = require('uuid');

const app = express();

app.use(express.json());

const projects = [];

//console.log (app);

// QUERYS PARAMS: Vamos usar principalmente para filtros e paginação.
// ROUTE PARAMS: Usamos para identificar recursos na hora de atualizar ou deletar.
// REQUEST body: Seria o resto do conteudo na hora de criar ou editar as informações


app.get('/projects', (request, response) => {
    const { title, owner } = request.query;
    
    return response.json(projects); // sempre retornar o projeto recem criado e nunca exibir a lista completa
});


app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuidv4(), title, owner};

    projects.push(project); //esse push joga a criação do projeto para o nosso array
    return response.json(project); // sempre retornar o projeto recem criado e nunca exibir a lista completa
});


app.put('/projects/:id', (request, response) => {
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({error: 'Projeto não encontrado'});
    }

    const project = {
        id,
        title,
        owner
    }
    projects[projectIndex] = project;
    
    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const {id} = request.params;
    const projectIndex = projects.findIndex(project => project.id === id);
    if (projectIndex < 0) {
        return response.status(400).json({error: 'Projeto não encontrado'});
    }

    projects.splice(projectIndex, 1);
    //splice
    return response.status(204).send();
});

app.listen(3000);

console.log(projects);