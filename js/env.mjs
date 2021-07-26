export const transactionHash = "0x5c29aa4a623a65fc3ee7ae2b8aac504a88b1ae0b30236c24554cc5d7340f2843";
export const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fatherName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "permanentAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bankAccountNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bankName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "branchName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cropName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "landInBigha",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "landPattaNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cropSeason",
				"type": "string"
			}
		],
		"name": "addNewFarmerDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passwordHintMessage",
				"type": "string"
			}
		],
		"name": "addNewUser",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newPassword",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passwordHintMessage",
				"type": "string"
			}
		],
		"name": "changeUserPass",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "premimumAmount",
				"type": "uint256"
			}
		],
		"name": "payInsuredAmount",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			}
		],
		"name": "getCropLandDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "cropName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "landInBigha",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "landPattaNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cropSeason",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			}
		],
		"name": "getFarmerDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fatherName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "permanentAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bankAccountNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bankName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "branchName",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			}
		],
		"name": "getInsuranceDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "premiumPerYear",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isPremiumPaid",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "govtSubsidyAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "insuredAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			}
		],
		"name": "validateUserLogin",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];