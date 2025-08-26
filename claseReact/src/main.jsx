import React from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import Card from './Card.jsx'

const root = createRoot(document.getElementById('root'))

function onButtonClick(){
  const card = document.querySelector('body');
  card.style.backgroundColor = 'grey';
  alert('Hiciste click!');
}

root.render(
  <Card
    title={'Titulo de la pagina'} 
    description={'Esta pagina esta hecha con React'}
    onButtonClick={() => onButtonClick()}
    children ={<p>Texto como children</p>}
    />
)
