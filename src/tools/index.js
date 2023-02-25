// 防抖
export function debounce(fn, delay) {
    let times = null
    return function () {
        const context = this
        if (times) clearTimeout(times)
        times = setTimeout(() => {
            fn.apply(context, arguments)
            times = null
        }, delay);
    }
}
// 节流
export function throttle(fn, delay) {
    let use = true
    return function () {
        if (use) {
            fn.apply(this, arguments)
            use = false
            setTimeout(() => use = true, delay);
        }
    }
}
// 自定义缓动动画(下拉动画)
export function animationScroll(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
        let len = target - obj.scrollTop;
        let step = len > 0 ? Math.ceil(len / 10) : Math.floor(len / 10)
        // 将步长值转化为整数,防止误差. 
        // scrollTop不为整数防止持续执行故转化为整数判断
        if (Math.ceil(obj.scrollTop) >= target) {
            clearInterval(obj.timer)
            callback && callback()
        } else {
            obj.scrollTop += step
        }
    }, 15);
}

// 判断文件类型
export function judgeFileType(file) {
    if (file === null || file === "") {
        alert('请选择要上传的文件!')
        return false;
    }
    if (file.lastIndexof('.') === -1) {
        alert('路径不正确')
        return false;
    }
    const AllImgExt = [".jpg", ".jpeg", ".gif", ".bmp", "png"]
    const fileType = file.substring(file.lastIndexof('.')).toLowerCase()
    if (AllImgExt.lastIndexOf(fileType) === -1) {
        const errMsg = `该${fileType}类型的文件不允许上传，请上传：${AllImgExt}类型的文件。`
        alert(errMsg)
        return false
    }
}

// 文件类型
export function fileTypes() {
    return {
        'application/msword': 'word',
        'application/pdf': 'pdf',
        'application/vnd.ms-powerpoint': 'ppt',
        'application/vnd.ms-excel': 'excel',
        'aplication/zip': 'zpi',
    }
}