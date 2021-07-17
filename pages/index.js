import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AluraCommons';
import { Comunidade } from '../src/components/Comunidade';
import { Followers } from '../src/components/Followers';
import { Friends } from '../src/components/Friends';
import { CommunityForm } from '../src/components/CommunityForm';
import { Depoimentos } from '../src/components/Depoimentos';

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
  const token = '571f34edabdd84118196fa75b2ef31'

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
          <CommunityForm comunidades={comunidades} setComunity={setComunity} />
          <Depoimentos />
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
  const {githubUser} = jwt.decode(token);
  
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  }).then((res) => res.json());

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}