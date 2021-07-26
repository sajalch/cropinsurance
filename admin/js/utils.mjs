export async function getETHAccount(){
      await ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum||"http://127.0.0.1:7545");
      return (await web3.eth.getAccounts())[0];
}


export function setCookie(cName, cValue, expDays=1) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

export function removeCookie(name) {   
    document.cookie = name +'=;  expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
    document.cookie = name +'=;  expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/snippet';
}

export function logout(){
    removeCookie("admin");
    window.location.href="./";
}
