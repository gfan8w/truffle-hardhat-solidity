/**
 * 参考： https://javascript.info/async-await
 * @returns
 */


async function f(){
    return 1;
}

let a=f();
console.log('f()',a)

let b = f().then((a,b)=>{console.log('f().then',a,b)});

;(async () => {
    b = await f();
    console.log("await b:", b)
})();

// await可以后面跟上 有一个 then方法的类。
class Thenable {
    /**
     * @type number
     * @param num
     */
    constructor(num) {
        this.num=num;
    }

    then(resolve, reject) {
        console.log(resolve);
        setTimeout(() => resolve(this.num* 2),1000);
    }

}


async function  g(){
    // await可以后面跟上 有一个 then方法的实例，做到promise 兼容性， 这里的await 后面跟的不是一个promise对象，但因为类实现了 .then方法
    let result =await new Thenable(1);
    console.log("result:",result)
}

g();

 function h() {
    return Promise.reject("a simple rejetct")
}

h().then(c=>{console.log(c)}).catch(e=>console.log("catch",e))  // 这里如果不加 catch，会全局里crash

async function a1 () {
     await setTimeout(()=>{return Promise.resolve(1)},1000);
}

async function a2 () {
    await setTimeout(()=> new Promise(resolve => 3),3000);
}

async function a3 () {
      return new Promise((r,j) => setTimeout(()=>r(4),4000) );  //会返回4，
     // return new Promise(()=>setTimeout(()=>Promise.resolve(4),4000));  //无法返回4
     // return await setTimeout(() =>4,4000);   //无法返回4
}

( async ()=> {

    let a=await a3();
    console.log("a3:",a)
    let results = await Promise.all([a1(), a2(), a3()]);
    console.log("promise all:", results)

})();

/**
 * async 保证 函数返回一个 promise，如果不是promise，就包装出一个promise返回
 * @returns {Promise<void>}
 */
async function ff(){
     let prom =new Promise((resolve,reject)=>{
         setTimeout(()=>resolve("done"),4000)
     });

     let result= await prom;  //await的意思 就是等待一个 Promise 直到resolve, await 只能在 async里面

     console.log("wait to get result:",result)

    return 1
 }


 ff();


async function fttt(){
    await Promise.reject("Whoops!")
}

async function fddd(){
    throw new Error("Whoops!")
}

async function getFttt(){
    try{
        let resp=await fttt();
        // let resp= fttt();  //取消注释，查看运行结果，体验不同的结果，要注意是运行时捕获异常，还是这里的catch
        // let resp= fddd();  //取消注释，查看运行结果，体验不同的结果，要注意是运行时捕获异常，还是这里的catch
    }
    catch (e){
        console.log("getFttt error:",e)
    }
}

getFttt()































































