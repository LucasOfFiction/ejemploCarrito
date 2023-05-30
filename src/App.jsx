import React from 'react'
import { useContext } from 'react'
import './App.css'
import ShoppingCart from './components/ShopingCart'
import DropdownCart from './components/DropdownCart'

function App() {

  return (
    <div className="App">

      <ShoppingCart>

        <DropdownCart/>
      
      </ShoppingCart>
      
    </div>
  )
}

export default App
