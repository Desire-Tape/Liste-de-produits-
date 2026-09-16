/**
 * ligne produit dans un tableau de deux colones (prix/name)
 * @param {{name: string, stocked= boolean, price: string}} product 
 */
export function ProductRow ({product}) {
    
    const style = product.stocked ? undefined : {color: 'red'} 
    
    return <tr>
        <td style={style} >{product.name}</td>
          <td style={style}>{product.prix}</td>
    </tr>
}