import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export function Comunidade({comunidades}){
    const size = 6;
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, size).map((item) => {
                  return (
                    <li key={item.id}>
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