//能点击的选择进度的进度条
//HTML样式写法：外面一层div，里面一层div
//css样式：内层div宽度设为百分比,里面一层定位为absolute，外面一层定位为relative
/*
例子：
<div class="progress">
    <div></div>
</div>
 */
/*
 现有功能：
 1、传参更改进度条进度		setProgress
2、点击更改进度条进度		clickProgress
3、拉动更改进度条进度	（暂时没有兼容移动端）	movePregress
4、放回更改后的进度		getProgress
*/