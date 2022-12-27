<template>
  <div>
    <Title>Admin Panel</Title>
    <header>
      <span> Royal Dish </span>
      <MInput type="password" ref="passEl" placeholder="Admin password">
        <template v-slot:start>
          <i class="fas fa-lock"></i>
        </template>
        <template v-slot:end>
          <MButton @click="saveMenu($event)">Save</MButton>
        </template>
      </MInput>
    </header>
    <main>
      <h1>Our Menu</h1>
      <section>
        <transition-group name="page">
          <Category
            v-for="category in stateMenu.categories"
            :key="category.name"
            :category="category"
            admin
            ref="renderedCategories"
            @delete="(opts) => deleteCategory(opts)"
            @update="(opts) => updateCategory(opts)"
            @refresh="infosMenu()"
          />
        </transition-group>
        <div class="category add">
          <i class="fas fa-plus fa-4x" @click="addCategory()"></i>
        </div>
      </section>
    </main>
    <transition name="page">
      <MPoppup ref="mpop" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { MInput, MButton, MPoppup } from "mairs";
import { CATEGORY } from "~~/server/schemas/category";
import { MENU } from "~~/server/schemas/menu";

let fetchedMenu = await $fetch("/api/menu");
const stateMenu = useState<MENU>("menu", () => fetchedMenu as MENU);
const latestId = useState("latestId", () => 0);

// template refs
const mpop = ref<any>(null);
const renderedCategories: any = ref<any>(null);
const passEl = ref<any>(null);

// Component functions :

function infosMenu(): MENU {
  const menu: MENU = { categories: [] };
  if (!renderedCategories.value) menu;

  renderedCategories.value.forEach((cat: any) => {
    let gotCategory = cat.getCategory();
    if (gotCategory) menu.categories.push(gotCategory);
  });

  return menu;
}

// Emit responding functions (from children)

function deleteCategory(categoryId: string) {
  let newMenu: MENU = infosMenu();
  newMenu.categories.splice(
    newMenu.categories.findIndex(
      (category: CATEGORY) =>
        category._id === categoryId || category.localId === categoryId
    ),
    1
  );
  stateMenu.value = newMenu;
}

function addCategory() {
  if (!stateMenu.value) return;

  const newCategory: CATEGORY = {
    name: "newCategory",
    localId: `new-category-${latestId.value++}`,
    discount: 0,
  };

  if (stateMenu.value.categories) stateMenu.value?.categories.push(newCategory);
  else stateMenu.value.categories = [newCategory];
}

async function saveMenu(e: any) {
  stateMenu.value = infosMenu();
  const body = {
    menu: toRaw(stateMenu.value),
    password: e.currentTarget.parentElement.children[1].value,
  };
  const data = await $fetch("/api/menu", {
    body,
    method: "post",
  });

  if (data) {
    mpop.value.show({ message: (data as any).message });
  }
}
</script>

<style lang="scss"></style>
