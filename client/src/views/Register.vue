<template>
    <Sign title="注册" name='立即登录' path='/login'>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
            <el-form-item label="" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入公司名称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password">
                <el-input type='password' v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
                <el-input type='password' v-model="ruleForm.pwd" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button round class="w-100" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </Sign>
</template>

<script>
import { register } from '@/api/user.js'
import { message } from '@/utils/message.js'
import Sign from '@/components/sign/Index.vue'
import {  phone } from '@/utils/fn.js'
export default {
    data() {
      return {
        ruleForm: {
          company: '',
          name: '',
          phone: '',
          password: '',
          pwd: ''
        },
        rules: {
            company: [
                { required: true, message: '请输入公司名称', trigger: 'blur' },
            ],
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            phone: [
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                {
                    validator: phone
                }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 12, message: '密码长度在6到12个字符', trigger: 'blur'}
            ],
            pwd: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                {
                    validator: (rule, value, callback) => {
                        if (value !== this.ruleForm.password) {
                            callback(new Error('两次密码不一致'))
                        } else {
                            callback()
                        }
                    }
                }
            ]
        }
      };
    },
    created() {
        if(this.$store.getters && this.$store.getters.authenticated) {
            this.$router.replace('/index')
            message('请退出后再注册','warning')
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                register(this.ruleForm).then( res => {
                    if (res.code ===200) {
                        message('注册成功')
                        this.$router.push('/login')
                    }else{
                        return Promise.reject(res)
                    }
                }).catch( err => {
                    message(err.message, 'error')
                })
            }
        });
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
