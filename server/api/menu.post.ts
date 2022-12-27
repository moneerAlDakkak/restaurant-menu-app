import Menu from "../schemas/menu";
import connectToDb from "../db";
import applyDiscount from "../utils/applyDiscount";

export default defineEventHandler(async (event) => {
  await connectToDb();
  const body = await readBody(event);
  if (useRuntimeConfig().adminPass !== body.password)
    return { message: "Wrong Password", status: 400 };
  const menu = applyDiscount(body.menu);

  const newMenu = await Menu.findOneAndUpdate(
    { name: "BeinMenu1" },
    { categories: menu.categories },
    { new: true, upsert: true }
  );
  return { message: "Menu saved sucessfully", status: 200 };
});

// interface item {
//   discount?: string;
// }

// interface subcat {
//   discount?: string;
//   items?: item[];
//   subCategories?: subcat[];
// }

// interface menu extends subcat {}

// let a: menu = {
//   discount: "10%",
//   subCategories: [
//     {
//       discount: "10%",
//       subCategories: [
//         {
//           items: [{}, { discount: "75%" }],
//         },
//       ],
//     },
//     {
//       items: [{ discount: "40%" }, {}],
//     },
//   ],
// };

// function changePrice(item: ITEM) {

// }

// function applyDiscount(target: MENU): void;
// function applyDiscount(target: CATEGORY): void;
// function applyDiscount(target: SUB_CATEGORY): void;
