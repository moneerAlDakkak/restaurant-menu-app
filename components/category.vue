<template>
  <div class="category">
    <h2 @contextmenu.prevent="admin && $refs.add.show($event)">
      <input type="text" v-model="localData.name" v-if="admin" />
      <span v-else>{{ category.name }}</span>
      <i v-if="category.discount || admin"
        >(
        <input
          type="number"
          max="100"
          min="0"
          v-model="localData.discount"
          v-if="admin"
        />
        <span v-else>{{ category.discount }}</span
        >% discount)
      </i>
    </h2>
    <ul v-if="localData.subCategories && localData.subCategories.length > 0">
      <li
        v-for="subCategory in localData.subCategories"
        :key="subCategory.name"
      >
        <SubCategory
          :subCategory="subCategory"
          :admin="admin"
          :level="1"
          ref="subsEl"
          @delete="(opts) => deleteSubCategory(opts)"
          @update="(opts) => updateSubCategory(opts)"
          @refresh="$emit('refresh')"
        />
      </li>
    </ul>
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
        <MMenuItem noHide @click="addSubCategory()">
          <i class="fas fa-plus"></i>
          Add subcategory
        </MMenuItem>
        <MMenuItem noHide @click="addItem()">
          <i class="fas fa-plus"></i>
          Add item
        </MMenuItem>
        <MMenuItem noHide @click="deleteCategory()">
          <i class="fas fa-trash"></i>
          Delete
        </MMenuItem>
      </MMenu>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { MMenu, MMenuItem, MInput, MButton } from "mairs";
import { CATEGORY } from "~/server/schemas/category";
import { ITEM } from "~/server/schemas/item";
import { SUB_CATEGORY } from "~/server/schemas/subCategory";

const latestId = useState<number>("latestId");

const props = defineProps<{
  category: CATEGORY;
  admin: boolean;
}>();

const emit = defineEmits(["delete", "refresh"]);

// template refs:
const subsEl = ref<any>(null);
const itemsEl = ref<any>(null);

const localData = ref<CATEGORY>({ ...props.category });
const CATEGORY_ID = localData.value._id || localData.value.localId;

// Component functions

function getCategory(): CATEGORY | void {
  let items: ITEM[] = [];
  let subCategories: SUB_CATEGORY[] = [];

  if (itemsEl.value) {
    itemsEl.value.forEach((item: any) => {
      let gotItem = item.getItem();
      if (gotItem) items.push(gotItem);
    });
  } else if (subsEl.value) {
    subsEl.value.forEach((subCategory: any) => {
      let gotSubCat = subCategory.getSubCategory();
      if (gotSubCat) subCategories.push(gotSubCat);
    });
  }

  if (items.length > 0) localData.value.items = items;
  if (subCategories.length > 0) localData.value.subCategories = subCategories;
  return localData.value;
}

function deleteCategory() {
  emit("delete", CATEGORY_ID);
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

function deleteSubCategory(subId: string) {
  emit("refresh");
  localData.value.subCategories?.splice(
    localData.value.subCategories?.findIndex(
      (subCat) => subCat._id === subId || subCat.localId === subId
    ),
    1
  );
}

defineExpose({
  getCategory,
});
</script>

<style lang="scss">
div.category {
  padding: m-ui-grid(1.5) m-ui-grid(1.5) m-ui-grid(2);
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.6),
    2px 2px 2px 0 rgba(255, 255, 255, 0.04) inset;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: $ui_radius;
  min-height: 400px;
  img {
    position: absolute;
    height: 400px;
    bottom: 0;
    right: 0;
    transform: translate(20%, 20%);
    opacity: 0.08;
  }
  &:first-child {
    img {
      width: 400px;
      height: auto;
    }
  }
  h2 {
    margin-top: 0;
    width: fit-content;
    position: relative;
    color: $color_accent;
    background: linear-gradient(
      to right,
      $color_accent 0%,
      m-lighten("accent", 25%) 100%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.add {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      cursor: pointer;
    }
  }
}
</style>
