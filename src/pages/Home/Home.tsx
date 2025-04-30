import { useEffect  } from 'react'
import { Product } from "../../types/type"
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'
import { useProductContext } from '../../Context/ProductContext'


import { getAllProducts } from '../../services/productServices'
// control forward slash =/ comments out a line


const Home:React.FC = () => {
 
    
    const { products, selectedCategory, dispatch } = useProductContext();

    
    useEffect(() =>{
      const fetchProducts = async() =>{
        const data = await getAllProducts();
        dispatch({type:"SET_PRODUCTS",payload:data})
      }
      fetchProducts();
      


    },[])


  const getFilteredProducts = () => {
    if(selectedCategory){
      return products?.filter((product:Product)=>product.category===selectedCategory)
    }
    return products;
  }

  const filteredProducts= getFilteredProducts();
  return (
    <div>
      
     
      <select 
        onChange={(e) => 
          dispatch({type:'SET_SELECTED_CATEGORY', payload: e.target.value})
        }
        >
        <option value=''>All Categories</option>
        <option>men's clothing</option>
        <option>women's clothing</option>
        <option>electronics</option>
        <option>jewelery</option>
        
      </select> 
    <div className='container'>
       
  
        {filteredProducts?.map((product:Product)=>
        <ProductCard product={product} />
        )} 
    </div>
    </div>


  )
}

export default Home