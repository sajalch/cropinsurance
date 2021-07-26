import { abi, transactionHash } from './env.mjs';
import { setCookie, getCookie, removeCookie, getETHAccount } from './utils.mjs';
let contract;
window.getCookie = getCookie;
const App=async ()=>{
    if(window.ethereum){
      const account = await getETHAccount();
      if(account){  
        const contractAddress = (await web3.eth.getTransactionReceipt(transactionHash)).contractAddress;
        contract = new web3.eth.Contract(abi,contractAddress);
        
      document.querySelector("#login").addEventListener('submit',login);
      document.querySelector("#signup").addEventListener('submit',signup);
      document.querySelector("#reset-pass").addEventListener('submit',resetPass);
      async function login(event){
          event.preventDefault();
          const email = document.querySelector("#login input[name='email']").value;
          const pass = document.querySelector("#login input[name='pass']").value;
          const user = await contract.methods.validateUserLogin(email,pass).call();
          if(user){
            setCookie("user",user);
            window.location.href= "dashboard.html";
          }else{
            alert("Login Unsucessfull");
          }
      }
      
      async function signup(event){
          event.preventDefault();
          const email = document.querySelector("#signup input[name='email']").value;
          const pass = document.querySelector("#signup input[name='pass']").value;
          const cpass = document.querySelector("#signup input[name='cpass']").value;
          const pmh = document.querySelector("#signup input[name='pmh']").value;
          if(pass === cpass){
            try{
              if(!await contract.methods.getUser(email).call()){
                const userCreated = await contract.methods.addNewUser(email,pass,pmh).send({from:account});
                alert("User Sign Up Successfull, Login Now...");
                window.hideUnhide('signup',document.querySelector("#login"));
                window.hideUnhide('login',document.querySelector("#signup"));
              }else{
                alert("User Already Exists");
              }
            }catch{
              alert("User Sign Up Unuccessfull");
            }
          }else{
              alert("Password Mismatch");
          }
      }
      async function resetPass(event){
        event.preventDefault();
          const email = document.querySelector("#reset-pass input[name='email']").value;
          const pass = document.querySelector("#reset-pass input[name='pass']").value;
          const cpass = document.querySelector("#reset-pass input[name='cpass']").value;
          const pmh = document.querySelector("#reset-pass input[name='pmh']").value;
          if(pass === cpass){
            try{
              if(await contract.methods.getUser(email).call()){
                const userCreated = await contract.methods.changeUserPass(email,pass,pmh).send({from:account});
                alert("Password Reset Successfull, Login Now...");
                window.hideUnhide('reset-pass',document.querySelector("#login"));
                window.hideUnhide('login',document.querySelector("#reset-pass"));
              }else{
                alert("User Does'nt Exists");
              }
            }catch{
              alert("Unuccessfull");
            }
          }else{
              alert("Password Mismatch");
          }
      }

    }
}
};
App();
