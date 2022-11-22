async function f() {
    console.log("enter");
    await new Promise((resolve, reject)=> setTimeout(()=> { console.log("promise resolved"); resolve(); }, 2000));
    console.log("leave");
}
async function main() {
    console.log("start");
    await f();
    console.log("end");
}
main().then(x=>console.log("done"));


// 这段代码用于测试 rust的输出，
// 源自：https://zhuanlan.zhihu.com/p/385965048

