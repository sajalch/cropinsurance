import { abi, transactionHash } from '../../js/env.mjs';
import { getCookie, getETHAccount, logout } from './utils.mjs';
window.logout = logout;
window.getCookie = getCookie;
const admin = getCookie('admin');
document.getElementById('user-id').innerHTML = " "+ admin || ' Admin';
let contract;
let users = [];
const App=async ()=>{
    if(window.ethereum){
      const account = await getETHAccount();
      if(account){  
        const contractAddress = (await web3.eth.getTransactionReceipt(transactionHash)).contractAddress;
        contract = new web3.eth.Contract(abi,contractAddress);

        async function getRegisteredFarmerRows(){
          let rows='';
          const userCount = await contract.methods.idx().call();
            for(let i=0;i<userCount;i++){
              let user = await contract.methods.enrolledUsers(i).call();
              let data = await contract.methods.getFarmerDetails(user).call();
              if(data.name && data.permanentAddress && data.age){
                  rows+=`<tr>
                      <th scope="row">${i+1}</th>
                      <td><span>${data.name.toLowerCase()}</span></td>
                      <td><span>${data.fatherName.toLowerCase()}</span></td>
                      <td><span>${data.age}</span></td>
                      <td><span>${data.permanentAddress.toLowerCase()}</span></td>
                    </tr>                           
                    `;     
                }
            }
            return rows;
        }
        async function getClaimedFarmerRows(){
          let rows='';
          const userCount = await contract.methods.idx().call();
            for(let i=0;i<userCount;i++){
              let user = await contract.methods.enrolledUsers(i).call();
              let data = await contract.methods.getFarmerClaimDetails(user).call();
              if(data.name && data.id && data.claim){
                  rows+=`<tr>
                      <th scope="row">${i+1}</th>
                      <td><span>${data.id}</span></td>
                      <td><span>${data.name.toLowerCase()}</span></td>
                      <td><span>${data.claim}</span></td>
                      <td>${data.claim==='pending'?`<button onclick="grantClaimInsuredAmount('${data.id}','approved')"><span>approve</span></button><br/><button onclick="grantClaimInsuredAmount('${data.id}','rejected')"><span>reject</span></button>`:'Responded'}</td>
                    </tr>                           
                    `;     
                }
            }
            return rows;
        }
        function getRegisteredFarmers(){
          getRegisteredFarmerRows().then(data=>{
            document.getElementById('display').innerHTML=`
                <h2>Registered Farmers</h2>
                <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Father's Name</th>
                    <th scope="col">Age</th>
                    <th scope="col">Permanent Address</th>
                  </tr>
                </thead>
                <tbody>
                ${data}
                </tbody>
              </table>`;
          })    
        }

        function getFarmerClaimDetails(){
          getClaimedFarmerRows().then(data=>{
            document.getElementById('display').innerHTML=`
                <h2>Insurance Claimed Farmers</h2>
                <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Farmer ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Claim Status</th>
                    <th scope="col">Grants</th>
                  </tr>
                </thead>
                <tbody>
                ${data}
                </tbody>
              </table>`;
          })    
        }
        function grantClaimInsuredAmount(userId, claim){
          contract.methods.grantClaimInsuredAmount(userId, claim).send({from:account}).then(data=>{
            if(data){
              alert('Granted Successfully!');
            }else{
              alert('Grant Unsuccessful!');
            }
            getFarmerClaimDetails();
          });
          
        }
        getRegisteredFarmers();

        window.getRegisteredFarmers= getRegisteredFarmers;
        window.getFarmerClaimDetails= getFarmerClaimDetails;
        window.grantClaimInsuredAmount = grantClaimInsuredAmount;
     }
}
};
App();
