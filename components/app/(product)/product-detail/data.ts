import { ProductSample } from "@/mock/product.mock";
import { handleDiscount } from "@/utils/currency-helper";

const productImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=85",
];

export const getProductDetail = (productId?: string | string[]) => {
  const id = Number(Array.isArray(productId) ? productId[0] : productId);
  const product =
    ProductSample.find((currentProduct) => currentProduct.id === id) ??
    ProductSample[0];
  const salePrice = handleDiscount({ price: product.price, discount: 15 });

  return {
    ...product,
    image: productImages[(product.id - 1) % productImages.length],
    salePrice,
    subtitle:
      "Suitable for daily routines with compact carry, durable finish, and fast checkout support",
    soldLabel: "4K+ sold",
    cartLabel: "5K+ Added to cart",
    storeName: "Velvet Skin Lab",
    variants: [
      {
        id: "variant-1",
        label: `${product.name} / Standard set`,
        price: salePrice,
        discountLabel: "-15%",
      },
      {
        id: "variant-2",
        label: `${product.name} / Value pack`,
        price: handleDiscount({ price: product.price + 18, discount: 10 }),
        discountLabel: "-10%",
      },
    ],
  };
};

export type ProductDetail = ReturnType<typeof getProductDetail>;
