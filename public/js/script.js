const displayBtn = document.getElementById("displayBtn");
displayBtn.addEventListener("click", () => {
    fetch("/test").then(response => response.json()).then(data => {
        console.log(data[0]);
        data.forEach(element => {
            document.getElementById("displayP").innerHTML += "id: " + element.USER_ID + ", username: " + element.USERNAME + ", password: " + element.PASSWORD + "<br>";
        });
    });
});