<script lang="ts" setup>
import XTable from '@/components/XTable';
import XDialog from '@/components/XDialog/index.vue';
const show = ref(true);
const pageSize = ref(10);

function open() {
  console.log('open');
}

function close() {
  console.log('close');
}

function sizechange() {
  console.log('size-change', pageSize.value);
}

function currentchange() {
  console.log('currentchange');
}
</script>

<template>
  <div>
    <XTable
      showPagination
      v-model:page-size="pageSize"
      background
      :total="100"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      description="暂无数据"
      @size-change="sizechange"
      @current-change="currentchange"
    >
      1
    </XTable>
    <XDialog v-model="show" @open="open" @close="close">1</XDialog>
  </div>
</template>
