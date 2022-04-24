/*
const displayBtn = document.getElementById("displayBtn");
displayBtn.addEventListener("click", () => {
    fetch("/test").then(response => response.json()).then(data => {
        console.log(data[0]);
        data.forEach(element => {
            document.getElementById("displayP").innerHTML += "id: " + element.USER_ID + ", username: " + element.USERNAME + ", password: " + element.PASSWORD + "<br>";
        });
    });
});
*/

const fetchApplications = () => {
    fetch('/fetchStudents', {
        method: "post"
    }).then(response => response.json()).then(
        data => {
            let result = '';
            data.forEach(element => {
                result += `<tr><td>`+element.FIRST_NAME+`</td><td>`+element.LAST_NAME+`</td><td>`+element.CITY+`</td><td>`+(!element.APPROVED ? 'PROCESSING' : (element.APPROVED === 0) ? 'DENIED' : 'APPROVED')+`</td></tr>`;
            });
            console.log(result);
            document.getElementById('studentListTBody').innerHTML = result;
        }
    )
};