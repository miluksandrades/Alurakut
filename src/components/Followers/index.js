import React from "react";
import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export function Followers({githubUser}){

    const [seguidores, setSeguidores] = React.useState([]);

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${githubUser}/followers`)
            .then((dados) => {
                return dados.json();
            })
            .then((dados) => {
                setSeguidores(dados)
            })
    }, [])

    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
                Seguidores ({seguidores.length})
            </h2>
            <ul>
                {
                    seguidores.slice(0, 6).map((item) =>{
                        return (
                            <li key={item.id}>
                                <a href={`https://github.com/${item.login}`} target="_blank">
                                <img src={`https://github.com/${item.login}.png`} />
                                <span>{item.login}</span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
        </ProfileRelationsBoxWrapper>
        
    )
}