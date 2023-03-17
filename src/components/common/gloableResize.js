function resizeFont() {
    //获取屏幕宽度
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; //设计图参考宽度
    if (clientWidth < 1640) {
        let rem = 1640 / 19.2;
        document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
        return
    }
    let design = 1920;
    if (clientWidth <= 820) {
        let rem = 820 / 19.2;
        document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
    } else {
        document.getElementsByTagName('html').item(0).style.fontSize = (clientWidth / design) * 95.5 + 'px';
    }
}

function resizeFontFull() {
    //获取屏幕宽度
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth; //设计图参考宽度
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight; //设计图参考宽度
    if (clientWidth < 1640) {
        let rem = 1640 / 19.2;
        document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
        return
    }
    let design = 1920;
    if (clientWidth <= 820) {
        let rem = 820 / 19.2;
        document.getElementsByTagName('html').item(0).style.fontSize = rem + 'px';
    } else {
        document.getElementsByTagName('html').item(0).style.fontSize = (clientWidth / design) * 105 + 'px';

    }

}


export default {
    resizeFont,
    resizeFontFull
}