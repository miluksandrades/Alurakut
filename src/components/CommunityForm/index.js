import React from "react";
import Box from "../Box";

export function CommunityForm({comunidades, setComunity}){
    return (
        <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <hr />
            <form onSubmit={function handleComunity(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);

              const comunidade = {
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
                url: dadosForm.get('url')
              }

              fetch('/api/communitys', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (res) =>{
                const dados = await res.json();
                const comunidade = dados.registroCriado
                const getComunity = [...comunidades, comunidade];  
                setComunity(getComunity);
              })

            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input
                  placeholder="Coloque uma url para carregar uma imagem"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa" />
              </div>
              <div>
                <input
                  placeholder="Um link para a comunidade"
                  name="url"
                  aria-label="Um link para a comunidade" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
    )
}