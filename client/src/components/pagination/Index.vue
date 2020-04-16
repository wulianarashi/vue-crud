<template>
    <div class="mt-2 text-right">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
                :page-size="paginations.page_size" layout="total, sizes, prev, pager, next, jumper" :total="paginations.total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props:{
        allData:{
            type:Array,
            default() {
                return []
            }
        }
    },
    watch:{
        allData:{
            handler(newVal) {
                //监听到新数据到来初始化分页
                if (newVal) {
                    this.paginations.total = newVal.length
                    this.paginations.page_index = 1
                    this.paginations.page_size = 5
                    let tableData = newVal.filter((item, index) => {
                        return index < this.paginations.page_size
                    })
                    //向调用该组件的组件暴露一个当前分页数据条目的方法
                    this.$emit('paginationList', tableData)
                }
            },
            deep:true
        }
    },
    data() {
        return {
            paginations: {
                page_index: 1,
                total: 0,
                page_size: 5,
                page_sizes: [5, 10, 15],
            },
        }
    },
    methods:{
         handleSizeChange(page_size) {
            //对于每页几条数据的处理
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            let tableData = this.allData.filter((item, index) => {
                return index < page_size
            })
            this.$emit('paginationList', tableData)
        },
        handleCurrentChange(page) {
            //跳页码
            let index = this.paginations.page_size * (page - 1)
            let num = this.paginations.page_size * page
            let tables = []
            for (let i = index; i < num; i++) {
                if (this.allData[i]) {
                    
                    tables.push(this.allData[i])
                }
            }
            let tableData = tables
            this.$emit('paginationList', tableData)
        },
    }
}
</script>

<style>

</style>
