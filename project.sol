pragma solidity 0.6.0;

contract cropInsurance {
    
    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }
    
    function compare(string memory a, string memory b) private view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    
    struct User{
        string userId;
        string password;
        string passwordHintMessage;
    }
    mapping(bytes32=>User) private userMap;
    function addNewUser(string memory userId, string memory password, string memory passwordHintMessage) public returns(bool){
        bytes32 key = stringToBytes32(userId);
        if(compare(userMap[key].userId,"")){
            userMap[key] = User(userId, password, passwordHintMessage);
            return true;
        }
        return false;
    }
    function getUser(string memory userId) public view returns(string memory){
        bytes32 key = stringToBytes32(userId);
        return userMap[key].userId;
    }
    function validateUserLogin(string memory userId, string memory password) public view returns(string memory){
        bytes32 key = stringToBytes32(userId);
        if(compare(userMap[key].password, password))
            return userMap[key].userId;
        return "";
    }
    function changeUserPass(string memory userId, string memory newPassword, string memory passwordHintMessage) public returns(bool){
        bytes32 key = stringToBytes32(userId);
        if(compare(userMap[key].passwordHintMessage, passwordHintMessage)){
            userMap[key].password = newPassword;
            return true;
        }
        return false;
    }
    
   // ///////////////////////////////////////////////////
    struct FarmerDetails {
        string name;
        string fatherName;
        string permanentAddress;
        uint age;
        string bankAccountNumber;
        string bankName;
        string branchName;
        string cropName;
        uint landInBigha;
        string landPattaNumber;
        string cropSeason;
        uint premiumPerYear;
        bool isPremiumPaid;
        uint govtSubsidyAmount;
        uint insuredAmount;
    }
    
    mapping (bytes32 => FarmerDetails) private farmerMap;
    
    uint premiumVal;
    uint subsidyVal;
  function getPremiumCalculator(string memory cropName, uint landInBigha, string memory cropSeason) private {
     uint premiumToBePaid = 0;
        if(compare(cropSeason, "kharif")){
            if(compare(cropName, "urad"))
            {
                premiumToBePaid = 31100;
            }
            else if(compare(cropName, "paddy-sali")){
             premiumToBePaid = 59400;
            }
            else if(compare(cropName, "jute")){
             premiumToBePaid = 55300;
            }
        }
       else if(compare(cropSeason, "rabi")){
           if(compare(cropName, "paddy-summer")){
             premiumToBePaid = 60100;
            }
            else if (compare(cropName, "mustard")){
             premiumToBePaid = 33700;
            }
            else if(compare(cropName, "potato")){
             premiumToBePaid = 131900;
            }
       } 
       premiumVal=(premiumToBePaid * landInBigha);
       subsidyVal=(premiumToBePaid * 3) * landInBigha;
    }
    function addNewFarmerDetails(
        string memory userId,
        string memory name,
        string memory fatherName,
        string memory permanentAddress,
        uint age,
        string memory bankAccountNumber,
        string memory bankName,
        string memory branchName,
        string memory cropName,
        uint landInBigha,
        string memory landPattaNumber,
        string memory cropSeason
    ) public returns(bool){
        bytes32 key = stringToBytes32(userId);
        if(compare(userMap[key].userId, userId)){
            
            getPremiumCalculator(cropName, landInBigha,cropSeason);
            uint premiumPerYear = premiumVal;
            uint govtSubsidyAmount = subsidyVal;
            
            
            
            farmerMap[key].name = name;
            farmerMap[key].fatherName = fatherName;
            farmerMap[key].permanentAddress=permanentAddress;
            farmerMap[key].age=age;
            farmerMap[key].bankAccountNumber=bankAccountNumber;
            farmerMap[key].bankName=bankName;
            farmerMap[key].branchName=branchName;
            farmerMap[key].cropName=cropName;
            farmerMap[key].landInBigha= landInBigha;
            farmerMap[key].landPattaNumber= landPattaNumber;
            farmerMap[key].cropSeason= cropSeason;
            farmerMap[key].premiumPerYear= premiumPerYear;
            farmerMap[key].isPremiumPaid= false;
            farmerMap[key].govtSubsidyAmount= govtSubsidyAmount;
            farmerMap[key].insuredAmount= 0;  
            return true;
        }
        return false;
    }

    function getFarmerDetails(string memory userId) public view 
    returns(
        string memory name,
        string memory fatherName,
        string memory permanentAddress,
        uint age,
        string memory bankAccountNumber,
        string memory bankName,
        string memory branchName
    ){
        bytes32 key = stringToBytes32(userId);
        return (farmerMap[key].name,
             farmerMap[key].fatherName,
            farmerMap[key].permanentAddress,
            farmerMap[key].age,
            farmerMap[key].bankAccountNumber,
            farmerMap[key].bankName,
            farmerMap[key].branchName);
    }
    function getCropLandDetails(string memory userId) public view returns(
         string memory cropName,
        uint landInBigha,
        string memory landPattaNumber,
        string memory cropSeason){
            bytes32 key = stringToBytes32(userId);
            return(
                farmerMap[key].cropName,
                farmerMap[key].landInBigha,
                farmerMap[key].landPattaNumber,
                farmerMap[key].cropSeason);
        }
    function getInsuranceDetails(string memory userId) public view returns(
            uint premiumPerYear,
            bool isPremiumPaid,
            uint govtSubsidyAmount,
            uint insuredAmount
        ){
            bytes32 key = stringToBytes32(userId);
            return(
                farmerMap[key].premiumPerYear,
                farmerMap[key].isPremiumPaid,
                farmerMap[key].govtSubsidyAmount,
                farmerMap[key].insuredAmount);
        }
        
    function payInsuredAmount(string memory userId, uint premimumAmount) public payable returns(bool){
        bytes32 key = stringToBytes32(userId);
        if(farmerMap[key].premiumPerYear == premimumAmount){
            farmerMap[key].insuredAmount = farmerMap[key].premiumPerYear + farmerMap[key].govtSubsidyAmount;
            farmerMap[key].isPremiumPaid = true;
        }
        return farmerMap[key].isPremiumPaid;
    }
}