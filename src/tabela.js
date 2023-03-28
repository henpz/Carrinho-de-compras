import React from "react";

function Tabela({data, handleRemoveItem, handleUpdateItem}){
    return(
        <>
        <tr>
                <td>
                  <div className="product">
                    <img id="camisa" src="https://images.tcdn.com.br/img/img_prod/1044362/camisa_nba_memphis_grizzlies_jordan_statement_edition_jersey_22_23_ja_morant_12_715_1_60feb397707446f78495cfde0c77c519.jpg"
                    alt="jpge" /> 
                    <div className="info">
                      <div className="name">{data.name}</div>
                      <div className="category">{data.category}</div>
                    </div>
                  </div>
                </td>
                <td>{data.price}</td>
                <td>
                  <div className="qty">
                    <button onClick={handleUpdateItem(data, 'decrease')}><i className="bx bx-minus"></i></button>
                    <span>{data.quantity}</span>
                    <button onClick={handleUpdateItem(data, 'increase')}><i className="bx bx-plus"></i></button>
                  </div>
                </td>
                <td> {data.price * data.quantity} </td>
                <td>
                  <button className="remove" onClick={() =>{
                    handleRemoveItem(data)
                  }}>
                    <i className="bx bx-x"></i></button>
                </td>
              </tr>
        </>
    )
}

export default Tabela