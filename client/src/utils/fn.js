//空空如也
export const isEmpty = function (value) {
    return (
        value === undefined || value === null ||
        (typeof value == "object" && Object.keys(value).length === 0) ||
        (typeof value == "string" && value.trim().length === 0)
    );
}

//验证手机号
export const phone = function (rule, value, callback) {
    if (value.length !== 11) {
        callback(new Error('请输入11位手机号码'))
    } else if(!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error('请输入有效的'))
    } else {
        callback()
    }
}