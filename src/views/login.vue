<template>
  <div class="login">
    <h1>差评运维平台</h1>
    <el-form @submit.native.prevent="submit" :model="data" :rules="rules" ref="login" label-width="70px">
      <el-form-item label="手机号" prop="identity">
        <el-input v-model="data.identity"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="data.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="lock" native-type="submit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      lock: false,
      data: {
        identity: '',
        password: '',
      },
      rules: {
        identity: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确的手机号',
            // trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 16,
            message: '请输入6-16位密码',
            // trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions('user', ['LOGIN']),
    submit() {
      this.$refs.login.validate(async (valid) => {
        if (valid) {
          this.lock = true;
          try {
            const ret = await this.LOGIN(this.data);
            this.$router.push({ name: 'home' });
            this.lock = false;
          } catch (error) {
            console.log(error);
            this.lock = false;
          }
          return true;
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding-top: 5%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding: 20px;
    font-size: 30px;
  }
}
</style>
