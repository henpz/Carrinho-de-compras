import React from "react";

function Pgtitle({data}){
    return(
        <div className="page-title">{data || '{insira um titulo}'}</div>
    )
}

export default Pgtitle