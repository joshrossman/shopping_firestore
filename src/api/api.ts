import axios, {AxiosResponse } from 'axios'
import { Product } from '../types/type'

const apiClient = axios.create({baseURL: 'https://fakestoreapi.com'})

export const fetchProducts = (): Promise<AxiosResponse<Product[]>> => apiClient.get<Product[]>('/products')
export const fetchCategories = (): Promise<AxiosResponse<string[]>> => apiClient.get<string[]>('/products/categories')


