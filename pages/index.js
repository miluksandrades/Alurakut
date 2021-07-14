import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { Comunidade } from '../src/components/Comunidade';

function ProfileSidebar(props) {
  return (
    <Box>
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

export default function Home() {

  const githubUser = 'miluksandrades';
  const [comunidades, setComunity] = React.useState([
    {
      id: '1',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
      url: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    },
    {
      id: '2',
      title: 'Comunidade Alura',
      image: 'https://yt3.ggpht.com/ytc/AKedOLRszi3O39AB5-uw_1jkrxJppwegjToBgIKFIOqiiA=s900-c-k-c0x00ffffff-no-rj',
      url: 'https://github.com/topics/alurakut'
    }
]);

  const amigos = [
    'diego3g',
    'rafaballerini',
    'peas',
    'coutinhonobre',
    'omariosouto',
    'filipedeschamps',
    'miluksandrades'
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem vindo, {githubUser}
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleComunity(e) {
              e.preventDefault();

              const dadosForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: 'https://picsum.photos/300/300?'+dadosForm.get('image'),
                url: dadosForm.get('url')
              }

              const getComunity = [...comunidades, comunidade];

              setComunity(getComunity)
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
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Amigos ({amigos.length})
            </h2>
            <ul>
              {amigos.slice(0, 6).map((item) => {
                return (
                  <li key={item}>
                    <a href={`https://github.com/${item}`} target="_blank">
                      <img src={`https://github.com/${item}.png`} />
                      <span>{item}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Comunidade comunidades={comunidades}/>

        </div>
      </MainGrid>
    </>
  )
}
