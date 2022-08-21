import { defineComponent } from 'vue';
import { ElEmpty, ElPagination } from 'element-plus';
import { paginationProps, paginationEmits, emptyProps } from 'element-plus';
import 'element-plus/es/components/empty/style/css';
import 'element-plus/es/components/pagination/style/css';
import { pick, mapKeys, mapValues, upperFirst } from 'lodash-es';

const components = { ElEmpty, ElPagination };

export const loadingSvg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  "
    style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"
  />
`;

const props = {
  // 表格数据
  dataList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  // 是否显示加载动画，默认false 不加载
  loading: {
    type: Boolean,
    default: false
  },
  // 是否显示分页器
  showPagination: {
    type: Boolean,
    default: false
  },
  ...paginationProps,
  ...emptyProps
};

const emits = { ...paginationEmits };

export default defineComponent({
  name: 'XTable',
  props,
  emits,
  components,
  setup(props, { emit, slots, attrs }) {
    const myPaginationEmits = computed(() => {
      return mapKeys(
        mapValues(paginationEmits, (_, key) => {
          return function (event) {
            emit.apply(null, [key, event]);
          };
        }),
        (_, key) => {
          return 'on' + upperFirst(key);
        }
      );
    });

    const myPaginationProps = computed(() => pick(props, Object.keys(paginationProps)));

    const myEmptyProps = computed(() => pick(props, Object.keys(emptyProps)));

    return () => (
      <>
        <div
          {...attrs}
          class="p-4 bg-white"
          v-loading={props.loading}
          element-loading-svg={loadingSvg}
          element-loading-svg-view-box="-10, -10, 50, 50"
        >
          {slots?.buttons && <div class="flex w-1/1 py-2">{slots?.buttons()}</div>}
          {props.dataList.length > 0 ? (
            slots.default && slots.default()
          ) : (
            <el-empty {...myEmptyProps.value} />
          )}
          {props.showPagination && (
            <div class="flex justify-end w-1/1 py-1">
              <el-pagination
                class="flex justify-end mt-4"
                {...myPaginationEmits.value}
                {...myPaginationProps.value}
              />
            </div>
          )}
        </div>
      </>
    );
  }
});
