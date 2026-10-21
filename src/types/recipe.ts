export type RecipeCategory = "natural" | "smoothie" | "milkshake" | "cocktail";

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: RecipeCategory;
  image: string;
  imageAlt: string;
  prepMinutes: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tips?: string[];
  featured: boolean;
  publishedAt: string;
  tags: string[];
}

export interface CategoryInfo {
  id: RecipeCategory;
  label: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "natural",
    label: "عصائر طبيعية",
    description: "عصائر طازجة من فواكه وخضروات طبيعية",
    image: "/images/recipes/natural.jpg",
  },
  {
    id: "smoothie",
    label: "سموذي",
    description: "مشروبات كريمية غنية بالفواكه واللبن",
    image: "/images/recipes/smoothie.jpg",
  },
  {
    id: "milkshake",
    label: "ميلك شيك",
    description: "ميلك شيك كريمي ولذيذ",
    image: "/images/recipes/milkshake.jpg",
  },
  {
    id: "cocktail",
    label: "كوكتيل فواكه",
    description: "مزيج من الفواكه والنكهات المنعشة",
    image: "/images/recipes/cocktail.jpg",
  },
];

export const CATEGORY_LABELS: Record<RecipeCategory, string> = {
  natural: "عصائر طبيعية",
  smoothie: "سموذي",
  milkshake: "ميلك شيك",
  cocktail: "كوكتيل فواكه",
};

export const VALID_CATEGORIES: RecipeCategory[] = [
  "natural",
  "smoothie",
  "milkshake",
  "cocktail",
];
