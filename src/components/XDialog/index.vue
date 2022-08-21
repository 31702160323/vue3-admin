<script lang="ts">
export default {
  name: 'XDialog'
};
</script>

<script lang="ts" setup>
import { ElDialog, dialogProps, dialogEmits } from 'element-plus';
import type { DialogProps, DialogEmits } from 'element-plus';
import 'element-plus/es/components/dialog/style/css';
import { omit, mapValues } from 'lodash-es';

const slots = useSlots();
const emit = defineEmits(dialogEmits);
const props = defineProps({
  ...dialogProps,
  // 是否显示加载动画，默认false 不加载
  loading: {
    type: Boolean,
    default: false
  }
});

const myEmit = computed<DialogEmits>(() => {
  return mapValues(dialogEmits, (_, key) => {
    return function (event) {
      emit.apply(null, [key, event]);
    };
  }) as DialogEmits;
});

const myProps = computed<DialogProps>(() => omit(props, 'loading'));
</script>

<template>
  <div class="x-dialog">
    <el-dialog v-bind="myProps" v-on="myEmit">
      <div
        v-loading="props.loading"
        class="flex flex-col"
        :class="{ 'text-center': myProps.center }"
      >
        <div v-if="slots.header" class="el-dialog__header w-full"><slot name="header" /></div>
        <div v-else-if="myProps.title" class="el-dialog__header">
          <span class="el-dialog__title">{{ myProps.title }}</span>
        </div>
        <div class="el-dialog__body"><slot /></div>
        <div class="el-dialog__footer"><slot name="footer" /></div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.x-dialog :deep(.el-dialog__header) {
  margin: 0;
}

.x-dialog :deep(header.el-dialog__header) {
  display: none !important;
  padding: 0 !important;
}

.x-dialog :deep(.el-dialog--center > div.el-dialog__body) {
  padding: 0 !important;
}

.x-dialog :deep(footer.el-dialog__footer) {
  display: none !important;
}
</style>
