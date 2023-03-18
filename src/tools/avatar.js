// 绘制头像
export function drawAvatar(canvas, img, avatar, width, height) {
    canvas.width = width
    canvas.height = height
    canvas.getContext("2d").drawImage(img, 0, 0, width, height)
    showAvatar(canvas, avatar)
    avatarEvents(canvas, avatar)
}

// 预览头像
export function showAvatar(canvas, avatar) {
    if (!canvas.style.left) canvas.style.left = 0
    if (!canvas.style.top) canvas.style.top = 0
    avatar.width = 200
    avatar.height = 200
    avatar.getContext("2d").drawImage(canvas, -parseInt(canvas.style.left), -parseInt(canvas.style.top), 200, 200, 0, 0, 200, 200)
}

// 头像裁剪拖拽事件
function avatarEvents(canvas, avatar) {
    canvas.addEventListener('mousedown', (e) => {
        if (canvas.style.left == '') canvas.style.left = '0px'
        if (canvas.style.top == '') canvas.style.top = '0px'
        const initialX = e.clientX - parseInt(canvas.style.left), initialY = e.clientY - parseInt(canvas.style.top)
        canvas.addEventListener('mousemove', moves)

        function moves(e) {
            const nowX = e.clientX - initialX, nowY = e.clientY - initialY
            const _width = Math.abs(200 - canvas.offsetWidth)
            canvas.style.left = nowX + 'px'
            canvas.style.top = nowY + 'px'
            if (parseInt(canvas.style.left) <= -_width) {
                canvas.style.left = -_width + 'px'
            } else if (parseInt(canvas.style.left) > 0) {
                canvas.style.left = 0 + 'px'
            }
            if (parseInt(canvas.style.top) <= -_width) {
                canvas.style.top = -_width + 'px'
            } else if (parseInt(canvas.style.top) > 0) {
                canvas.style.top = 0 + 'px'
            }
            showAvatar(canvas, avatar)
        }

        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', moves)
        })
        canvas.addEventListener('mouseleave', () => {
            canvas.removeEventListener('mousemove', moves)
        })
    })

}

export function changeAvatarSize(canvas, value, img, avatar) {
    canvas.width = 200 + value * 1.2
    canvas.height = 200 + value * 1.2
    drawAvatar(canvas, img, avatar, canvas.width, canvas.height)
}