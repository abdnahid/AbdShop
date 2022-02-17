function showLogin() {
    var login = document.getElementById("loginModalBody");
    var register = document.getElementById("registerModalBody");
    document.querySelector(".login-button").style.backgroundColor = 'var(--theme)';
    document.querySelector(".register-button").style.backgroundColor = '#fff';
    document.querySelector(".login-button").style.color = '#fff';
    document.querySelector(".register-button").style.color = '#333';
    register.classList.remove("show");
    register.classList.add("hide");
    login.classList.remove("hide");
    login.classList.add("show");
  }
  
function showRegister() {
    var login = document.getElementById("loginModalBody");
    var register = document.getElementById("registerModalBody");
    document.querySelector(".login-button").style.backgroundColor = '#fff';
    document.querySelector(".register-button").style.backgroundColor = 'var(--theme)';
    document.querySelector(".register-button").style.color = '#fff';
    document.querySelector(".login-button").style.color = '#333';
    register.classList.remove("hide");
    register.classList.add("show");
    login.classList.remove("show");
    login.classList.add("hide");
  }