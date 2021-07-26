import { abi, transactionHash } from './env.mjs';
import { getCookie, getETHAccount, logout } from './utils.mjs';
window.logout = logout;
window.getCookie = getCookie;
const user = getCookie('user');
document.getElementById('user-id').innerHTML = " "+ user || ' User';
let contract;
const App=async ()=>{
    if(window.ethereum){
      const account = await getETHAccount();
      if(account){  
        const contractAddress = (await web3.eth.getTransactionReceipt(transactionHash)).contractAddress;
        contract = new web3.eth.Contract(abi,contractAddress);
        let premimumAmount=0;
        function getProfile(){
          contract.methods.getFarmerDetails(user).call().then(data=>{
            if(data.name && data.permanentAddress && data.age){
            document.getElementById('display').innerHTML=`
                <h2>Profile</h2>
                <div align="left">
                    <p>Name: <span id="name">${data.name.toLowerCase()}</span></p>
                    <p>Father's Name: <span id="fname">${data.fatherName.toLowerCase()}</span></p>
                    <p>Permanent Address: <span id="address">${data.permanentAddress.toLowerCase()}</span></p>
                    <p>Age: <span id="age">${data.age}</span></p>
                    <p>Bank Name: <span id="bank-name">${data.bankName.toLowerCase()}</span></p>
                    <p>Branch Name: <span id="branch-name">${data.branchName.toLowerCase()}</span></p>
                    <p>Bank Account: <span id="bank-acc">${data.bankAccountNumber}</span></p>
                </div>`;
            }else{
              farmerDetails();
              return;
            }
          });
        }
        function getCropLandDetails(){
          contract.methods.getCropLandDetails(user).call().then(data=>{
            document.getElementById('display').innerHTML=`
                <h2>Crop-Land Details</h2>
                <div align="left">
                    <p>Crop Name: <span>${data.cropName.toLowerCase()}</span></p>
                    <p>Land in Bigha: <span>${data.landInBigha}</span></p>
                    <p>Land Patta Number: <span>${data.landPattaNumber}</span></p>
                    <p>Crop Season: <span >${data.cropSeason.toLowerCase()}</span></p>
                </div>`;
          });
        }

        function getInsuranceDetails(){
          contract.methods.getInsuranceDetails(user).call().then(data=>{
            premimumAmount=data.premiumPerYear;
            document.getElementById('display').innerHTML=`
                <h2>Insurance Details</h2>
                <div align="left">
                    <p>Premium/Year: <span>Rs. ${data.premiumPerYear}</span></p>
                    <p>Govt Subsidy Amount: <span>Rs. ${data.govtSubsidyAmount}</span></p>
                    <p>Premium Paid Status: <span>${data.isPremiumPaid?`Paid`:`To be Paid`}</span></p>
                    ${data.isPremiumPaid?`<p>If anything goes wrong with the crops you'll recieve <span >Rs. ${data.insuredAmount}</span>, 
                    you can claim and a team will verify, once verified you'll recieve the amount in the bank.
                     You can contact us in case of any queries.</p>
                     ${data.claim?'<span>Claim Status: '+ data.claim+'</span>':`<button onclick="claimInsuredAmount()">Claim Now</button>`}
                     `                     
                     :`
                    <button onclick="payInsuredAmount()">Pay Now</button>
                    `}
                </div>`;
          });
        }
        function farmerDetails(){
          document.querySelectorAll('li a').forEach((element,i,arr)=>{if(i+2!=arr.length) element.removeAttribute('onclick')});
            document.getElementById('display').innerHTML=`
                <h2>Add Famer Details</h2>
                <div align="left">
                    <p>Enter Name<br/> <input id='name' type='text' value='' required/></p>
                    <p>Father's Name<br/> <input id='fatherName' type='text' value='' required/></p>
                    <p>Address<br/> <input id='permanentAddress' type='text' value='' required/></p>
                    <p>Age<br/> <input id='age' type='number' value='1' min='1' max='120' required/></p>
                    <p>Bank Account Number<br/> <input id='bankAccountNumber' type='number' value='' required/></p>
                    <p>Bank Name<br/> <input id='bankName' type='text' value='' required/></p>
                    <p>Branch Name<br/> <input id='branchName' type='text' value='' required/></p>
                    <p>Crop Season<br/> 
                    <select id='cropSeason' onchange="feedCrops()" required>
                      <option value=''>Select</option>
                      <option value='kharif'>Kharif</option>
                      <option value='rabi'>Rabi</option>
                    </select>
                  </p>
                    <p>Crop Name<br/> 
                      <select id='cropName' required >
                        <option value=''>Select</option>
                      </select>
                    </p>
                    <p>Land In Bigha<br/> <input id='landInBigha' type='number' min='1' value='' required/></p>
                    <p>Land Patta Number<br/> <input id='landPattaNumber' type='number' min='1' value='' required/></p>
                    <button type='button' onclick="addFarmerDetails()">Submit</button>
                 </div>`;
        }
        function feedCrops(){
          const cropSeason = document.getElementById('cropSeason').value.trim().toLowerCase();
          let data='';
          if(cropSeason === 'kharif'){
            data =`
            <option value='urad'>Urad</option>
            <option value='paddy-sali'>Paddy(Sali)</option>
            <option value='jute'>Jute</option>
            `;
          }else if(cropSeason === 'rabi'){
            data=`
            <option value='paddy-summer'>Paddy(Summer)</option>
            <option value='mustard'>Mustard</option>
            <option value='potato'>Potato</option>
            `;
          }else{
            data=`<option value=''>Select</option>`;
          }
          document.getElementById('cropName').innerHTML=data;
        }
        function addFarmerDetails(){
            const name = document.getElementById('name').value.trim().toLowerCase();
            const fatherName = document.getElementById('fatherName').value.trim().toLowerCase();
            const permanentAddress = document.getElementById('permanentAddress').value.trim().toLowerCase();
            const age = document.getElementById('age').value.trim().toLowerCase();
            const bankAccountNumber = document.getElementById('bankAccountNumber').value.trim().toLowerCase();
            const bankName = document.getElementById('bankName').value.trim().toLowerCase();
            const branchName = document.getElementById('branchName').value.trim().toLowerCase();
            const cropName = document.getElementById('cropName').value.trim().toLowerCase();
            const landInBigha = document.getElementById('landInBigha').value.trim().toLowerCase();
            const landPattaNumber = document.getElementById('landPattaNumber').value.trim().toLowerCase();
            const cropSeason = document.getElementById('cropSeason').value.trim().toLowerCase();
            let flag = false;
            if(name && fatherName && permanentAddress && age && bankAccountNumber && bankName && branchName && cropName && landInBigha && landPattaNumber && cropSeason){
              contract.methods.addNewFarmerDetails(
                user,
                name,
                fatherName,
                permanentAddress,
                age,
                bankAccountNumber,
                bankName,
                branchName,
                cropName,
                landInBigha,
                landPattaNumber,
                cropSeason).send({from:account}).then(data=>{
                    if(data){
                      alert("Hurray!!! Your details filled in our system");
                    }else{
                      alert("Some Problem Detected, Contact the team")
                    }
                    setTimeout(()=>window.location.reload(),1000);
                  }).catch(err=>{alert("Some Error Occured!!!");setTimeout(()=>window.location.reload(),1000);});
            }else{
              alert("All fields are mandatory!!!")
            }
          
        }
        function passwordManage(){
            document.getElementById('display').innerHTML=`
                <h2>Password Management</h2>
                <div align="left">
                    <p>Enter Password Hint<br/> <input id='passwordHintMessage' type='text' value='' required/></p>
                    <p>New password<br/> <input id='newPassword' type='password' value='' required/></p>
                    <p>Confirm New Password<br/> <input id='cnewPassword' type='password' value='' required/></p>
                    <button type='button' onclick="changeUserPass()">Change</button>
                 </div>`;
        }

        function changeUserPass(){
          const passwordHintMessage = document.getElementById('passwordHintMessage').value.trim().toLowerCase();
          const newPassword = document.getElementById('newPassword').value.trim().toLowerCase();
          const cnewPassword = document.getElementById('cnewPassword').value.trim().toLowerCase();
          let status = false;
          if(passwordHintMessage && newPassword && newPassword===cnewPassword){
            contract.methods.changeUserPass(user,newPassword,passwordHintMessage).send({from:account}).then(data=>{
              status = !!data;
              alert('Great!!!, Password is Changed')
            });
          }else{
            alert('Enter Correct Credentials');
          }
          return status;
        }

        function payInsuredAmount(){
          const ethAccount = prompt('Enter the Etherium Account').trim().toLowerCase();
          let status = false;
          contract.methods.payInsuredAmount(user,premimumAmount).send({from:ethAccount}).then(data=>{
            status = !!data;
            alert('Congrats, Payment Successfull');
            getInsuranceDetails();
          }).catch(err=>alert('Some error occured',err));
          return status;
        }
        function claimInsuredAmount(){
          if(confirm("Are you sure you want to claim now?")){
          let status = false;
          contract.methods.claimInsuredAmount(user).send({from:account}).then(data=>{
            status = !!data;
            alert('Claim Raised Successfully!');
            getInsuranceDetails();
          }).catch(err=>alert('Some error occured',err));
          return status;
         }
        }
        
        getProfile();

        window.getProfile= getProfile;
        window.getCropLandDetails=getCropLandDetails;
        window.getInsuranceDetails=getInsuranceDetails;
        window.payInsuredAmount=payInsuredAmount;
        window.claimInsuredAmount = claimInsuredAmount;
        window.passwordManage=passwordManage;
        window.changeUserPass=changeUserPass;
        window.addFarmerDetails = addFarmerDetails;
        window.feedCrops = feedCrops;
     }
}
};
App();
