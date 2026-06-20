/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Stats, Product, Category } from '@/types'

export const stats: Stats = {
  productCount: 1000,
  categoryCount: 7,
  yearLaunched: 2024,
  dailyDeals: 50,
}

export const promoCodes: any = [];

export const blogPosts: any = [];

export const collections: any = [];

export const mainFAQ: any = [];

export const promoFAQ: any = [];

export const howItWorksSteps = [
  {
    icon: 'Search',
    title: 'Собираем товары',
    description: 'Ежедневно сканируем AliExpress и отбираем товары с реальными скидками от 30% до 90% через партнёрскую программу Admitad.',
  },
  {
    icon: 'Filter',
    title: 'Проверяем качество',
    description: 'Фильтруем по рейтингу продавца (4.5+), количеству продаж (100+), отзывам с фото и реальной истории цен за 90 дней.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Публикуем лучшее',
    description: 'Добавляем только проверенные товары с подробным описанием, характеристиками и актуальными ценами в рублях.',
  },
  {
    icon: 'ShoppingCart',
    title: 'Вы покупаете выгодно',
    description: 'Переходите на AliExpress по нашим ссылкам, получаете ту же цену + применяете промокоды. Мы получаем комиссию и развиваем сервис.',
  },
  {
    icon: 'RefreshCw',
    title: 'Обновляем ежедневно',
    description: 'Каталог обновляется каждый день: удаляем товары с истекшими скидками, добавляем новые выгодные предложения.',
  },
]

export async function loadProducts(): Promise<Product[]> {
  const res = await fetch('/products.json')
  if (!res.ok) throw new Error('Failed to load products')
  return res.json()
}

export async function loadCategories(): Promise<Category[]> {
  const res = await fetch('/categories.json')
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}
