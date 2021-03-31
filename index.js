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
 
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner};

    projects.push(project); //esse push joga a criação do projeto para o nosso array
    return response.json(project); // sempre retornar o projeto recem criado e nunca exibir a lista completa
});


app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuidv4(), title, owner};

    projects.push(project); //esse push joga a criação do projeto para o nosso array
    return response.json(project); // sempre retornar o projeto recem criado e nunca exibir a lista completa
});


app.put('/projects/:id', (request, response) => {
    const params = request.params;
    console.log(params)
    return response.json([
        'projeto 10',
        'projeto 20',
        'projeto 3',
        'projeto 4',
        'projeto 5'
    ]);
});

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'projeto 1',
        'projeto 2',
        'projeto 3',
        'projeto 4',
        'projeto 50'
    ]);
});

app.listen(3000);