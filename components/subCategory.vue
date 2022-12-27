<template>
  <div>
    <DynamicHeading
      :level="level + 2"
      @contextmenu.prevent="admin && $refs.add.show($event)"
    >
      <input type="text" v-model="localData.name" v-if="admin" />
      <span v-else>
        {{ subCategory.name }}
      </span>
      <i v-if="subCategory.discount || admin"
        >(
        <input
          min="0"
          max="100"
          type="number"
          v-model="localData.discount"
          v-if="admin"
        />
        <span v-else> {{ subCategory.discount }} </span>% discount)
      </i>
    </DynamicHeading>
    <!-- subCategory prop here represents a collection of subCategories -->
    <ul v-if="localData.subCategories && localData.subCategories.length > 0">
      <li
        v-for="subCategory in localData.subCategories"
        :key="subCategory.name"
      >
        <SubCategory
          :subCategory="subCategory"
          :admin="admin"
          :level="level + 1"
          ref="subSubCategoriesEl"
          @delete="(opts) => deleteSubSubCategory(opts)"
          @update="(opts) => updateSubSubCategory(opts)"
          @refresh="$emit('refresh')"
        />
      </li>
    </ul>
    <!-- subCategories prop here represents a collection of items -->
    <ul v-else-if="localData.items && localData.items.length > 0">
      <li v-for="item in localData.items" :key="item.name">
        <Item
          :item="item"
          :admin="admin"
          ref="itemsEl"
          @delete="(id) => deleteItem(id)"
        />
      </li>
    </ul>
    <!-- Custom context menu -->
    <transition name="page">
      <MMenu ref="add">
        <MMenuItem
          noHide
          v-if="
            (subCategory.subCategories &&
              subCategory.subCategories.length > 0) ||
            !(subCategory.items && subCategory.items.length > 0)
          "
          @click="addSubCategory()"
        >
          <i class="fas fa-plus"></i>
          Add subcategory
        </MMenuItem>
        <MMenuItem
          noHide
          v-if="
            (subCategory.items && subCategory.items.length > 0) ||
            !(subCategory.subCategories && subCategory.subCategories.length > 0)
          "
          @click="addItem()"
        >
          <i class="fas fa-plus"></i>
          Add item
        </MMenuItem>
        <MMenuItem noHide @click="deleteSubCategory()">
          <i class="fas fa-trash"></i>
          Delete
        </MMenuItem>
      </MMenu>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { MMenu, MMenuItem, MInput, MButton } from "mairs";
import { ITEM } from "~~/server/schemas/item";
import { SUB_CATEGORY } from "~~/server/schemas/subCategory";

const props = defineProps<{
  subCategory: SUB_CATEGORY;
  admin: boolean;
  level: number;
}>();

const emit = defineEmits(["delete", "refresh"]);
const latestId = useState<number>("latestId");

// template refs
const itemsEl = ref<any>(null);
const subSubCategoriesEl = ref<any>(null);

const localData = ref<SUB_CATEGORY>({ ...props.subCategory });
const SUB_CATEGORY_ID = localData.value._id || localData.value.localId;

// Component functions :

function getSubCategory(): SUB_CATEGORY | void {
  let items: ITEM[] = [];
  let subSubCategories: SUB_CATEGORY[] = [];

  if (itemsEl.value) {
    itemsEl.value.forEach((item: any) => {
      let gotItem = item.getItem();
      if (gotItem) items.push(gotItem);
    });
  } else if (subSubCategoriesEl.value) {
    subSubCategoriesEl.value.forEach((subSubCategory: any) => {
      let gotSubCat = subSubCategory.getSubCategory();
      if (gotSubCat) items.push(gotSubCat);
    });
  }

  if (items.length > 0) localData.value.items = items;
  if (subSubCategories.length > 0)
    localData.value.subCategories = subSubCategories;
  return localData.value;
}

function addItem() {
  if (localData.value.subCategories && localData.value.subCategories.length > 0)
    return;

  let newItem: ITEM = {
    localId: `new-item-${latestId.value++}`,
    name: "newItem",
    price: 0,
    discount: 0,
  };

  if (localData.value.items) localData.value.items.push(newItem);
  else localData.value.items = [newItem];
}

function addSubCategory() {
  if (localData.value.items && localData.value.items.length > 0) return;

  let newSubCategory: SUB_CATEGORY = {
    localId: `new-sub-${latestId.value++}`,
    name: "newSub",
    discount: 0,
  };

  if (localData.value.subCategories)
    localData.value.subCategories.push(newSubCategory);
  else localData.value.subCategories = [newSubCategory];
}

function deleteSubCategory() {
  emit("delete", SUB_CATEGORY_ID);
}

// Emit responding functions (from children)
function deleteItem(itemId: string) {
  emit("refresh");
  localData.value.items?.splice(
    localData.value.items?.findIndex(
      (item) => item._id === itemId || item.localId === itemId
    ),
    1
  );
}

function deleteSubSubCategory(subId: string) {
  emit("refresh");
  localData.value.subCategories?.splice(
    localData.value.subCategories?.findIndex(
      (subCat) => subCat._id === subId || subCat.localId === subId
    ),
    1
  );
}

defineExpose({
  getSubCategory,
});
</script>

<style lang="scss" scoped></style>
