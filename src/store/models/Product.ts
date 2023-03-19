export type ProductApi = {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: string;
  category: {
    name: string;
    id: number;
  };
};

export type ProductModel = {
  id: number;
  title: string;
  subtitle: string;
  images: string[];
  content: string;
  category: string;
  categoryId: number;
};

export const normalizeProduct = (from: ProductApi): ProductModel => ({
  id: from.id,
  title: from.title,
  subtitle: from.description,
  images: from.images,
  content: from.price,
  category: from.category.name,
  categoryId: from.category.id
});

export interface IFetchProducts {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: number;
}

export enum Meta {
  initial = 'initial', // Процесс не начат
  loading = 'loading', // В процессе загрузки
  error = 'error', // Завершилось с ошибкой
  success = 'success' // Завершилось успешно
}
