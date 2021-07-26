import { abi, transactionHash } from '../../js/env.mjs';
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
        async function login(event){
            event.preventDefault();
            const email = document.querySelector("#login input[name='email']").value;
            const pass = document.querySelector("#login input[name='pass']").value;
            const user = await contract.methods.validateAdminLogin(email,pass).call();
            if(user){
              setCookie("admin",user);
              window.location.href= "dashboard.html";
            }else{
              alert("Login Unsucessfull");
            }
        }
    }
}
};
App();
