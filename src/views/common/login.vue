<template>
  <div class="login-box">
    <el-form :model="formInline" @submit.prevent style="width: 460px">
      <el-form-item>
        <el-input v-model="formInline.username">
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.password" show-password>
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          style="width: 100%"
          size="large"
          type="primary"
          native-type="submit"
          :loading="loading"
          @click="handleSubmit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { defineComponent, reactive, toRefs } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Login',
  components: { User, Lock },
  setup() {
    const store = useStore()
    const router = useRouter()

    const state = reactive({
      loading: false,
      formInline: {
        username: '',
        password: ''
      }
    })

    const handleSubmit = async () => {
      const { username, password } = state.formInline
      if (username.trim() == '' || password.trim() == '')
        return ElMessage.warning('用户名或密码不能为空！')
      state.loading = true
      console.log(state.formInline)
      const params = {
        username,
        password
      }

      store.dispatch('user/Login', params)

      setTimeout(() => {
        console.log(params)

        state.loading = false

        ElMessage.success('登录成功！')
        router.replace('/')
      }, 1500)
    }

    return {
      ...toRefs(state),
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: #ff0;
}
</style>
