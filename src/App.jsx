import { useState } from "react"
import { Input } from "./components/forms/Input"
import { Checkbox } from "./components/forms/checkbox"
import { ProductCategoryRow } from "./components/forms/products/ProductCategoryRow"
import { ProductRow } from "./components/forms/products/ProductRow"
import "./App.css"

const PRODUCTS = [
      {category:"Fruits", prix:"7$" , stocked: true, name:"Pomme"},
      {category:"Fruits", prix:"1$" , stocked: false, name:"banane"},
      {category:"Fruits", prix:"10$" , stocked: false, name:"orange"},
      {category:"Legumes", prix:"3$" , stocked: true, name:"concombre"},
      {category:"Legumes", prix:"4$" , stocked: false, name:"carotte"},
      {category:"Legumes", prix:"5$" , stocked: true, name:"tomate"},
      {category: "Fruits", prix: "7$", stocked: false, name: "Pomme" },
      {category: "Fruits", prix: "1$", stocked: true, name: "Banane" },
      {category: "Fruits", prix: "10$", stocked: false, name: "Orange" },
      {category: "Légumes", prix: "3$", stocked: true, name: "Concombre" },
      {category: "Légumes", prix: "4$", stocked: false, name: "Carotte" },
      {category: "Légumes", prix: "5$", stocked: true, name: "Tomate" },
      {category: "Boissons", prix: "2$", stocked: false, name: "Eau" },
      {category: "Boissons", prix: "4$", stocked: true, name: "Jus d'orange" },
      {category: "Boissons", prix: "6$", stocked: false, name: "Coca-Cola" },
      {category: "Produits laitiers", prix: "6$", stocked: true, name: "Lait" },
      {category: "Produits laitiers", prix: "8$", stocked: false, name: "Fromage" },
      {category: "Produits laitiers", prix: "5$", stocked: true, name: "Yaourt" }
 ]

function App (){
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(10)

  const visibleProducts = PRODUCTS.filter (product => {
    if (showStockedOnly && !product.stocked){
      return false
    }

    if (search && !product.name.toLowerCase().includes(search.toLowerCase())){
      return false
    }

    if (Number.parseInt(product.prix) > maxPrice){
      return false
    }

    return true
  })

  return <div className="app-container" >
      <Searchbar 
      search={search} 
      onSearchChange={setSearch}
      maxPrice={maxPrice}
      onMaxPriceChange={setMaxPrice}
      showStockedOnly={showStockedOnly} 
      setShowStockedOnly={setShowStockedOnly} />
      <ProductTable products={visibleProducts}  />
  </div>

}

function Searchbar ({showStockedOnly, setShowStockedOnly, search, onSearchChange, maxPrice, onMaxPriceChange}){
  return <div>
    <div className="mb-3">
      <Input value={search} onChange={onSearchChange} placeholder="Rechercher ..."/>
      <label htmlFor="max-price">Prix maximum : {maxPrice}$</label>
      <input
        id="max-price"
        type="range"
        className="form-range"
        min={0}
        max={10}
        value={maxPrice}
        onChange={(event) => onMaxPriceChange(Number(event.target.value))}
      />
      <Checkbox id="stocked" checked={showStockedOnly} 
      onChange={setShowStockedOnly} label="N'affichez que les produits en stock"  />
    </div>
  </div>
}

function ProductTable ({products}){

  const rows = []
  let lastCategory = null

  for (let product of products){
    if (product.category !== lastCategory){
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
    }
    lastCategory = product.category
    rows.push(<ProductRow key={product.name} product={product} />)
  }

  return <table className="product-table" >
    <thead>
      <tr>
        <th>Nom</th>
        <th>prix</th>
      </tr>
    </thead>
    <tbody>

    {rows}
  
    </tbody>
  </table>
}

export default App