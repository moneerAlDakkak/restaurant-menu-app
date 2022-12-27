import Menu from "../schemas/menu";
import connectToDb from "../db";
export default defineEventHandler(async (event) => {
  await connectToDb();
  const menu = await Menu.findOne();
  return menu;
});
