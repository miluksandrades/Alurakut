import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { Comunidade } from '../src/components/Comunidade';
import { Followers } from '../src/components/Followers';
import { Friends } from '../src/components/Friends';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}.png`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const token = '5067fb971a1711c62fd833d3b99a44'

  const usuario = props.githubUser;
  const [comunidades, setComunity] = React.useState([]);

  React.useEffect(() => {
    fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          query: `query{
          allCommunities {
            id
            createdAt
            title
            image
            url
          }
        }`
        })
      })
      .then(res => res.json())
      .then((res) => {
        const community = res.data.allCommunities;
        setComunity(community)
      })
      .catch((error) => {
        console.log(error);
      });

  })

  return (
    <>
      <AlurakutMenu githubUser={usuario} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={usuario} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo, {usuario}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <hr />
            <form onSubmit={function handleComunity(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);

              const comunidade = {
                title: dadosForm.get('title'),
                image: 'https://picsum.photos/300/300?'+dadosForm.get('image'),
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
                setComunity(getComunity)
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
                  placeholder="Coloque um numero para carregar uma imagem"
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <Comunidade comunidades={comunidades}/>

          <Friends />

          <Followers githubUser={usuario}/>

        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then((res) => res.json());
  
  if(!isAuthenticated){
    return{
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const {githubUser} = jwt.decode(token);
  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}