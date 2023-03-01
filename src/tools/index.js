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

// 拍照权限获取
export function turnOnCamera(element) {
    // 摄像头信息
    let constraints = {
        video: {
            height: element.offsetHeight,
            width: element.offsetWidth
        }
    }
    // 请求用户摄像头权限，允许时将摄像头图像转移至element上显示
    navigator.mediaDevices.getUserMedia(constraints).then(res => {
        element.srcObject = res
        element.play()
    }).catch((err) => console.log(err))
}

// 拍照图片绘制
export function shutter(canvas, video) {
    let width = +video.offsetWidth, height = +video.offsetHeight
    canvas.width = width
    canvas.height = height
    changePhotoPart(true, canvas, video)
    canvas.getContext("2d").drawImage(video, 0, 0, width, height)
}

// 拍照获取图片后下载并完成发送
export function download(canvas) {
    const ele = document.createElement('a')
    ele.href = canvas.toDataURL("image/png")
    ele.download = new Date().getTime() + ".png"
    ele.click()
}

// 摄像头区域和canvas显示转换
export function changePhotoPart(flag, canvas, video) {
    if (flag) {
        video.style.display = 'none'
        canvas.style.display = 'block'
    } else {
        video.style.display = 'block'
        canvas.style.display = 'none'
    }
}

// 绘制百度地图
export function drawMap(name, longitude, latitude) {
    let map = new BMapGL.Map(name);
    map.enableScrollWheelZoom(true);
    map.centerAndZoom(new BMapGL.Point(longitude, latitude), 11);
    let scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    let zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
    map.addControl(zoomCtrl);
    let locationCtrl = new BMapGL.LocationControl()
    map.addControl(locationCtrl)
    getCity()
}

// 获取城市
export function getCity() {
    function myFun(result) {
        let cityName = result.name
        console.log(cityName);
    }

    let myCity = new BMapGL.LocalCity()
    myCity.get(myFun)
}

// 获取地址
export function getLocation(name) {
    function showLocation(position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        sessionStorage.setItem('latitude', latitude)
        sessionStorage.setItem('longitude', longitude)
        drawMap(name, longitude, latitude)
    }
    function checkError() {
        alert("timeout!")
    }
    if (navigator.geolocation) {
        // 监测浏览器是否支持地理定位API
        navigator.geolocation.getCurrentPosition(showLocation, checkError)
    } else {
        alert('不支持地理定位！')
    }
}
