export interface Product {
  brand: string
  category: string
  description: string
  title: string
  discountPercentage: number
  id: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
}

export interface Products {
  limit: number
  products: Product[]
  skip: number
  total: number
}
