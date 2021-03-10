import { RepositoryItem } from "./RepositoryItem";
import '../styles/repositories.scss'
import { useState, useEffect } from "react";

/*type Repository = {
    name : String
    description : String
    html_url : String
}*/
export function RepositoryList() {
    const [repositories , setRepositories] = useState([]);
    
    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos').then(response => response.json())
        .then(data => {
            setRepositories(data)
        })

    } , [repositories])
    
    return(
        <section className="repository-list">
            <h1 className="">Lista de Repositorios</h1>
            <ul>
                {repositories.map(repository => {
                   return <RepositoryItem key={repository.name} repository = {repository} />
                })}
            
            </ul>
        </section>
    )
}