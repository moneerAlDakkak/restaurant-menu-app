<template>
  <div @contextmenu.prevent="admin && $refs.add.show($event)">
    <input type="text" v-model="localData.name" v-if="admin" />
    <span v-else>{{ item.name }}</span>
    <template v-if="admin">
      <i
        >(
        <input
          min="0"
          max="100"
          type="number"
          v-model="localData.discount"
          v-if="admin"
        />
        <span v-else>{{ item.discount }}</span
        >% discount)</i
      >
      <input
        type="number"
        v-model="localData.price"
        v-if="admin"
        class="price"
      />
      <span v-else>{{ item.price }}</span
      >$
    </template>
    <template v-else>
      <span v-if="localData.discount > 0">
        <del>{{ item.price }}$</del>
        <span>{{ item.price - (item.price * item.discount) / 100 }}</span>
        $
      </span>
      <span v-else>{{ item.price }}$</span>
    </template>

    <MMenu ref="add">
      <MMenuItem noHide @click="deleteItem()">
        <i class="fas fa-trash"></i>
        Delete
      </MMenuItem>
    </MMenu>
  </div>
</template>

<script setup lang="ts">
import { MMenu, MMenuItem } from "mairs";
import { ITEM } from "~~/server/schemas/item";
const props = defineProps<{
  item: ITEM;
  admin: boolean;
}>();

const emit = defineEmits(["delete"]);

const localData: ITEM = { ...props.item };
const ITEM_ID = localData._id || localData.localId;

function getItem(): ITEM | void {
  return localData;
}

function deleteItem() {
  emit("delete", ITEM_ID);
}

defineExpose({
  getItem,
});
</script>

<style lang="scss" scoped>
div {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  del {
    margin: 10px;
    opacity: 0.4;
  }
}
</style>
