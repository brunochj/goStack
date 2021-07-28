import React, { useState, useEffect } from 'react';
import api from "./services/api"

import "./App.css"
import Header from './components/Header.js'

function App(){
    const [projects, setProjects] = useState(["Desenvolviment App", "FrontEnd Web"])
    
    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response)
        })
    }, []);

    function handleAddProjects(){
        // projects.push(`Novo projeto ${Date.now()}`)
        setProjects([...projects, `Novo projeto ${Date.now()}`])
    }

    return (
        <>
            <Header title="Projects" />
            <ul>
                {projects.map(project => <li>{project}</li>)}
            </ul>
            <button type="button" onClick={handleAddProjects}>Adicionar novo projeto</button>
        </>
    )
}

export default App;