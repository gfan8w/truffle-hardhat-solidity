 function mywait() {
    return new Promise(()=>{
        setTimeout(()=>{
            Promise.resolve("resolved")
        },2000)
    });
}

async function asyncCall(){
    console.log("calling");
    const result=await mywait();
    console.log("result",result);
 }

 asyncCall();


 function testAwait(){
     console.log("test await")
 }

 async function callTest(){

     await testAwait();
     console.log("test done")

 }

 callTest()


 const hello = async ()=>{console.log("hello hello");return 1}

 console.log("type of hello:"+hello)
 let helloReturn=hello();
 console.log('helloReturn',helloReturn)
 hello().then(v=>console.log(v));



























