import { useEffect, useState } from 'react'
import { Product } from "../../types/type"
import ProductCard from '../../components/ProductCard/ProductCard'
import './Home.css'
import { useProductContext } from '../../Context/ProductContext'
import { useQuery } from 'react-query'
import { fetchProducts, fetchCategories } from '../../api/api'
import NavBar from '../../components/NavBar/NavBar'
import LoginButton from '../../components/Logging/LoginButton';
import LogoutButton from '../../components/Logging/LogoutButton';
import Token from '../../components/Logging/Token';

const Home:React.FC = () => {
 
    <NavBar />
    const { products, selectedCategory, dispatch } = useProductContext();

    //fetches data from fakestore api. Displays data in console.
   
    const {data: productsData, isLoading} = useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });

    const { data: categories } = useQuery({
      queryKey:['categories'],
      queryFn:fetchCategories,
    });

    useEffect(() => {
      if(productsData){
        dispatch({type:'SET_PRODUCTS', payload:productsData.data});
      }
    },[dispatch, productsData]
  );

  const getFilteredProducts = () => {
    if(selectedCategory){
      return products?.filter((product:Product)=>product.category===selectedCategory)
    }
    return products;
  }

  const filteredProducts= getFilteredProducts();
  return (
    <div>
      <Token></Token>
      <NavBar />
      <select 
        onChange={(e) => 
          dispatch({type:'SET_SELECTED_CATEGORY', payload: e.target.value})
        }
        >
        <option value=''>All Categories</option>
        {categories?.data.map((category)=>(
          <option value={category}>{category}</option>
        ))};
      </select> 
    <div className='container'>
        {isLoading && <h1>Loading...</h1>}
  
        {filteredProducts?.map((product:Product)=>
        <ProductCard product={product} />
        )}
    </div>
    </div>


  )
}

export default Home