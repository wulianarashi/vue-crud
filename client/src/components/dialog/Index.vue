<template>
  <div class="cz-dialog">
    <el-dialog :title="title" v-bind="$attrs"  :width="width+'px'" v-on="$listeners">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
          <el-button @click="$emit('update:visible', false)">取 消</el-button>
          <el-button type="primary" @click="dialogSure">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default { 
    props: {
        width:{
          type: String,
          default: '720'
        },
        title:{
          type: String,
          default: '提示'
        }
    },
    methods: {
        dialogSure() {
          this.$emit('dialogSure')
        },
        dialogClose() {
          this.$emit('update:visible', false)
        }
    }, 
  };
</script>

<style scoped>
.cz-dialog >>> .el-dialog__header {
  border-bottom: 1px solid rgba(0, 40, 100, 0.12);
}

.cz-dialog >>> .el-dialog__footer {
  padding: 10px 20px 20px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-top: 1px solid rgba(0, 40, 100,0.12);
}
</style>
