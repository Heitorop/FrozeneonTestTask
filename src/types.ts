export interface Product {
  brand: string
  category: string
  description: string
  title: string
  discountPercentage: number
  id: number
  images: Array<string>
  price: number
  rating: number
  stock: number
  thumbnail: string
}

export interface Products {
  limit: number
  products: Array<Product>
  skip: number
  total: number
}
