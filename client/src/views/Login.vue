<template>
    <Sign title='登录' name='立即注册' path='/register'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
            <el-form-item label="" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input type='password' v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button round class="w-100" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </Sign>
</template>

<script>
import jwt_decode from 'jwt-decode'
import { login, me } from '@/api/user.js'
import { message } from '@/utils/message.js'
import Sign from '@/components/sign/Index.vue'
import { isEmpty, phone } from '@/utils/fn.js'
export default {
    data() {
      return {
        ruleForm: {
          phone: '',
          password: ''
        },
        rules: {
            phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                {
                    validator: phone
                }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ]
        }
      };
    },
    created() {
        if(this.$store.getters && this.$store.getters.authenticated) {
            this.$router.replace('/index')
            message('您已登录')
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.ruleForm).then( res => {
                        if (res.code === 200) {
                            //用户登录成功
                            window.localStorage.setItem('wulianarashi', res.token)
                            const decode = jwt_decode(res.token)
                            this.$store.dispatch('setAuthenticated', !isEmpty(decode))
                            this.$store.dispatch('user', decode)
                            message(res.message)
                            this.$router.push('/index')
                        }else{
                            return Promise.reject(res)
                        }
                    }).catch( err => {
                        message(err.message, 'error')
                    })
                }
            })
       },
    },
    components: {
        Sign
    },
    deactivated() {
        this.$refs.ruleForm.resetFields()
    }
  }
</script>

<style lang="stylus" scoped>
</style>