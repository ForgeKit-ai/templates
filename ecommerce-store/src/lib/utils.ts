import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('en-US').format(number)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export function getImageUrl(path: string, width?: number, height?: number) {
  // For demo purposes, we'll use Unsplash for product images
  const baseUrl = 'https://images.unsplash.com'
  if (path.startsWith('http')) return path
  
  const dimensions = width && height ? `/${width}x${height}` : ''
  return `${baseUrl}${dimensions}?${path}`
}

export function calculateDiscount(originalPrice: number, salePrice: number) {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function generateSKU(productName: string, variant?: string) {
  const base = slugify(productName).toUpperCase().replace(/-/g, '').substring(0, 6)
  const variantCode = variant ? slugify(variant).toUpperCase().substring(0, 3) : ''
  const random = Math.random().toString(36).substr(2, 3).toUpperCase()
  
  return `${base}${variantCode}${random}`
}