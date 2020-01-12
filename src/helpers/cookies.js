
export function setCookie(name, value, days) {
   document.cookie = `${name}=${value};expires=${
      new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toUTCString()
      };path=/`;
}

export function setCookies(payload) {
   payload.forEach(o_o => setCookie(o_o[0], o_o[1], o_o[2]))
}

export function setCookieMany([...cookies]) {
   cookies.forEach(cookie => {
      var d = new Date();
      d.setTime(d.getTime() + (cookie.days * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toUTCString();
      console.log(cookie.key + "=" + cookie.value + ";" + expires + ";path=/");
      document.cookie = cookie.key + "=" + cookie.value + ";" + expires + ";path=/";
   })
}

export function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(';');
   for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return "";
}

export function checkCookie() {
   var user = getCookie("username");
   if (user != "") {
      console.log("Welcome again " + user);
   } else {
      user = prompt("Please enter your name:", "");
      if (user != "" && user != null) {
         setCookie("username", user, 365);
      }
   }
}

export function hasCookie(cName) {
   let cookie = getCookie(cName);
   if (cookie != "") return true
   else return false
}

export default {
   setCookie, getCookie, checkCookie, hasCookie
}