import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export function Comunidade({comunidades}){
    
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((item) => {
                  return (
                    <li key={item.createdAt}>
                      <a href={`${item.url}`} target="_blank" >
                        <img src={`${item.image}`} alt="Capa"/>
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
}