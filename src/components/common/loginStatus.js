if (localStorage.getItem('login_staus') == 1) {
    document.getElementById('app').style.background = '#182039';
} else if (localStorage.getItem('login_staus') == 2) {
    document.getElementById('app').style.background = '#030E2A';
}else{
    document.getElementById('app').style.background = '#fff';
}