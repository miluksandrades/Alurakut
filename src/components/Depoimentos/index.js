import React from "react";
import Box from "../Box";

export function Depoimentos(){
    const [depoimentos, setDepoimentos] = React.useState([]);

    return (
        <>
            <Box>
                <h4 className="subtitle">Depoimentos (em teste)</h4>
                <hr />
                <form>
                    <div>
                        <input 
                        placeholder="Insira seu usuario do github"
                        name="github"
                        aria-label="Insira seu usuario do github"
                         />
                    </div>
                    <div>
                        <input 
                        placeholder="O que está pensando agora?"
                        name="depoimento"
                        aria-label="O que está pensando agora?"
                         />
                    </div>
                    <button type="submit">Enviar depoimento</button>
                </form>
            </Box>
            <Box>
                Ainda em teste
            </Box>
        </>
    )
}