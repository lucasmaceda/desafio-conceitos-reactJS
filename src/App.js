import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() 
{
  const [repositories, setRepositories] = useState([]);

  // array de dependências
  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // função de cadastro de dados no backend
  async function handleAddRepository() {
    
    // requisição post para inserção de dados no backend
    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: "test",
      techs: "test" 
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) 
  {
    const response = await api.delete(`repositories/${id}`);

    if(response.status === 204){
      const repositoryListUpdated = repositories.filter(p => p.id !== id);

      setRepositories(repositoryListUpdated);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { 
          repositories.map(repository => 
            <li key={repository.id}>

              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
