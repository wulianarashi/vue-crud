<template>
    <div class="card">
        <div class="text-right">
            <el-button size="small" @click="add" type='primary'>添加员工</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="工号" width="180" prop='num'></el-table-column>
            <el-table-column label="姓名" width="150" prop='name'></el-table-column>
            <el-table-column label="邮箱" width="150" prop='email'></el-table-column>
            <el-table-column label="身份证" width="180" prop='card'></el-table-column>
            <el-table-column label="手机号" width="180" prop='phone'></el-table-column>
            <el-table-column label="入职时间" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.entry | time() }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align='center' width="180">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="mini" plain type="danger" @click="remove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination @paginationList='paginationList' :allData='allData'/>
        <MyDialog :title='title' :visible.sync='show' @dialogSure='dialogSure' @closed='closed'>
            <el-form :model="ruleForm" :rules="rules" :inline="true" ref="ruleForm" label-width="80px" class="demo-form-inline mt-4">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="工号" prop="num">
                            <el-input v-model="ruleForm.num" :style="width" placeholder="请输入工号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" :style="width" placeholder="请输入员工姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" :style="width" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="身份证号" prop="card">
                            <el-input v-model="ruleForm.card" :style="width" placeholder="请输入身份证"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入职时间" prop="entry">
                            <el-date-picker type="date" placeholder="选择日期" value-format='yyyy-MM-dd' v-model="ruleForm.entry" :style="width"></el-date-picker>
                        </el-form-item>               
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="ruleForm.email" :style="width" placeholder="请输入邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </MyDialog>
    </div>
</template>

<script>
import { list, add, edit, del } from '@/api/company/staff.js'
import MyDialog from '@/components/dialog/Index.vue'
import Pagination from '@/components/pagination/Index.vue'
import { message, messageBox } from '@/utils/message.js'
export default {
    data() {
        return {
            tableData: [],
            allData: [],
            title:'',
            show: false,
            width: { width:'240px'},
            ruleForm: {
                num: '',
                name: '',
                email: '',
                card: '',
                phone: '',
                entry: ''
            },
            rules: {
                num: [
                    { required: true, message: '请输入工号', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    {
                        validator: (rule, value, callback) => {
                            if (value.length !== 11) {
                                callback(new Error('请输入11位手机号码'))
                            } else if (!/^1[3456789]\d{9}$/.test(value)) {
                                callback(new Error('请输入有效的手机号码'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }
                ],
                card: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    {  min: 15,max: 18, message: '长度在 15 或 18', trigger: 'blur' }
                ],
                entry: [
                    { type: 'string', required: true, message: '请选择入职时间', trigger: 'change' }
                ],
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    mounted() {
        if (!this.tableData.length) {
            this.getList()
        }
    },
    methods: {
        getList() {
            list().then( res => {
                if (res.code === 200) {
                    this.allData = res.data
                } else {
                    message('信息获取失败','error')
                }
            }).catch( err => {
                message(err.message, 'error')
            })
        },
        add() {
            this.show = true
            this.title = '添加员工'
        },
        edit(data) {
            this.title = '编辑员工'
            this.show = true
            this.ruleForm = {
                id: data._id,
                num: data.num,
                name: data.name,
                email: data.email,
                card: data.card,
                phone: data.phone,
                entry: data.entry,
            }
        },
        remove(data) {
            messageBox().then( () => {
                del(data._id, null).then( (res) => {
                    if (res.code === 200) {
                        message(res.message)
                        this.getList()
                    } else {
                        message('删除失败','error')
                        this.getList()
                    }
                })
            })
        },
        dialogSure() {
            if (this.title === '添加员工') {
                add(this.ruleForm).then( res => {
                    if (res.code === 200) {
                        this.show = false
                        message(res.message)
                        this.getList()
                    } else {
                        message('添加失败', 'error')
                        this.getList()
                    }
                }).catch( err => {
                    message(err.message)
                }) 
            } else {
                edit(this.ruleForm.id, this.ruleForm).then( res => {
                    if (res.code === 200) {
                        this.show = false
                        message(res.message)
                        this.getList()
                    } else {
                         message('编辑失败', 'error')
                        this.getList()
                    }
                }).catch( err => {
                    message(err.message)
                }) 
            }
        },
        paginationList(data) {
            this.tableData = data
        },
        closed() {
            this.$refs.ruleForm.resetFields()
        }
    },
    filters: {
        time(val) {
            return new Date(val).toLocaleString()
        }
    },
    components: {
        MyDialog,
        Pagination
    }
}
</script>

<style>

</style>