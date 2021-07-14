import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

export function Friends(){

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
    )
}