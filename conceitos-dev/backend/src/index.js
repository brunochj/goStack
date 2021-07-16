const express = require('express');
const { uuid, isUuid} = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequest(req, res, next){
    const { method, url } = req;
    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel)

    return next()
}

function validId(req, res, next){
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(404).json({ error: "Invalid Project Id" })
    }

    return next();
}

app.use(logRequest)
// app.use('/projects/:id', validId)

app.get('/projects', (req, res) => {
    // const query = req.query ;
    // const { title, owner } = req.query ;
    const { title } = req.query
    const results = title ? projects.filter(project => project.title.includes(title)) : projects

    return res.json(results)
});

app.post('/projects', (req, res) => {
    // const body = req.body;
    const { title, owner } = req.body

    const project = { id: uuid(), title: title, owner: owner}

    projects.push(project)
    
    return res.json(project)
})

app.put('/projects/:id', validId, (req, res) => {
    // const params = req.params
    const { id } = req.params
    const { title, owner } = req.body

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return res.status(400).json({ error: "Project not found" })
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return res.json(project)
})

app.delete('/projects/:id', validId, (req, res) => {
    // const params = req.params
    const { id } = req.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0){
        return res.status(400).json({ error: "Project not found" })
    }
 
    projects.splice(projectIndex, 1)
    
    return res.status(204).send()
})

app.listen(3333, () => {
    console.log("Backend started! 😀")
})
