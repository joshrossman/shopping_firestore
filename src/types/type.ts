export interface Product{
    //data base on the api information on fakestoreapi.com
    id:number;
    title: string;
    price: number;
    description: string;
    category: string;
    image:string;
    rating:
    {
        rate:number;
        count?:number;
    }
    //additional types which will be needed for the cart. It must be optional, since when it is called from the api endpoint, it will not have a quantity.
    quantity?: number;
    

}