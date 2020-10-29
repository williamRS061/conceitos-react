import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';
//import BackgroundImage from './assets/background.jpg';
import Header from './components/Header';


export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('/projects').then((response) => {
            setProjects(response.data);
        })
        .catch((error) => console.error(error));
    }, []);

    async function handleAddProjects() {
        //setProjects([...projects, `New Project ${Date.now()}`]);
        const response = await api.post('/projects', {
            title: 'Frontend',
            owner: 'William'
        });
        const project = response.data;
        setProjects([...projects, project]);
    }

    return(
        <>
            <Header title="Teste" />
            {/*<img width={300} src={BackgroundImage} />*/}
            <ul>
                {projects?.map((project) => <li key={project.id}>{project.title}</li>)}
            </ul>
            <button type="button" onClick={handleAddProjects}>Add Project</button>
        </>
        
    );
}