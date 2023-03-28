import { useEffect, useState } from 'react';
import PgHeader from './components/header'; 
import Resumo from './components/resumo';
import Pgtitle from './components/title';
import './styles.scss'
import Tabela from './tabela';
import { api } from './provider';

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min) //gera um numero aleatório
}



function App() {
  const [card, setCard] = useState([])

  const productObject = {
    name:'produto',
    category: 'categoria',
    price: randomNumber (90, 190), //sorteia o numero entre 90e 190
    quantity: 1,
  }

  const fetchData = () =>{
    api.get('/card').then((response) => setCard(response.data))
  }

  useEffect(() =>{
    fetchData()
  }, [])


  const handleAddItem = () =>{

      console.log('disparou // está funcionando mas se não aparecer nenhum item em tela provalvelmente o limite de uso diario da api foi atingido =(, mas voce poderá tentar amanha')

      api.post('/card', productObject).then((response) => {
        console.log(response)
        fetchData()  //ira encontrar o item e inseri-lo
      })
  }

  const handleRemoveItem = (item) =>{
    //irei passar o handleRemoveItem e, nosso componente importado aq no app <Tabela /> e por meio de props vou usar0lo no arquivo tabela.js
    //criamos uma api.delete e contatenamos o nosso id do item do crudcrud
    //chamamos o fetchData para atualizar o nosso componente.
    api.delete(`/card/${item._id}`).then((response) =>{
      fetchData();
    })
  }

  const handleUpdateItem = (item, action) =>{

    let newQuantity = item.quantity;

    if(action ==='increase'){
      if(newQuantity === 1){  //se newQuantity for igual a 1 ira quebrar nosso codigo com o return,
        return
      }
      newQuantity -= 1;
    }

    if(action ==='decrease'){
      newQuantity += 1;  
    }

    const newData = {...item, quantity: newQuantity}
    delete newData._id

    api.put(`/card/${item._id}`, newData).then((response) =>{
      fetchData();
    })
  }

  const getTotal = () => {
    let sum = 0;
    for (let item of card) {
      sum += item.price * item.quantity;
    }

    return sum;
  }

  const cardTotal = getTotal()

  
  return (
    <>
     <PgHeader />
    <main>
     <Pgtitle data={'Seu carrinho'} />
      <div className="content">
        <section>
          <button onClick={handleAddItem} style={{padding: '5px 10px', marginBottom: 15}}>
           Adicionar item
            </button> 
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th>-</th>
              </tr>
            </thead>

            <tbody> 
              {card.map((item) =>( <Tabela key={item._id} 
              data={item}
               handleRemoveItem={handleRemoveItem} 
               handleUpdateItem={handleUpdateItem}

               />))}    
              {card.length === 0 && <tr><td colSpan='5' style={{textAlign: 'center'}}>{'Seu carrinho está vazio :('}</td></tr>}
            </tbody>

          </table>
        </section>
        <aside>
          <Resumo total={cardTotal} />
        </aside>
      </div>
    </main>
    </>
  );
}

export default App;
