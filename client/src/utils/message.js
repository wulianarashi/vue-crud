import { Message, MessageBox } from 'element-ui'

//对于饿了么的提示封装
export const message = (message, type = 'success') => {
    Message({
        message,
        type
    })
}

//对于饿了么的时删除提示封装
export const messageBox = (text = '你确定要删除吗?', type = 'warning') => {
    return MessageBox.confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type
    })
}
