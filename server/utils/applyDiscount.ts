import { MENU } from "../schemas/menu";
import { CATEGORY } from "../schemas/category";
import { ITEM } from "../schemas/item";
import { SUB_CATEGORY } from "../schemas/subCategory";

export default function applyDiscount(target: any): MENU {
  let discount = target.discount;

  if (target.items) {
    target.items = target.items.map((item: ITEM) => {
      if (!item.discount) item.discount = discount;
      return item;
    });
  }

  if (target.subCategories) {
    target.subCategories = target.subCategories.map(
      (subCategory: SUB_CATEGORY) => {
        if (!subCategory.discount) subCategory.discount = discount;
        return applyDiscount(subCategory);
      }
    );
  }

  if (target.categories) {
    target.categories = target.categories.map((category: CATEGORY) => {
      if (!category.discount) category.discount = discount;
      return applyDiscount(category);
    });
  }

  return target;
}
