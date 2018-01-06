$(document).ready(function() {
    $("#fetchAll").click(fetchAll);
    $("#add").click(add);
});

function fetchAll() {
    $.get("/tourData", function(response) {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.error) {
            console.log(parsedResponse.error);
        } else {
            console.log(parsedResponse.data);
        }
    });
}

function add() {
    const tour = JSON.stringify({
        eventName: $("#eventName").val(),
        city: $("#city").val(),
        beginDate: $("#beginDate").val(),
        endDate: $("#endDate").val(),
        beginTime: $("#beginTime").val(),
        endTime: $("#endTime").val(),
        location: $("#location").val(),
    });
    $.post("/tourData", tour, function(response) {
        const parsedResponse = JSON.parse(response);
        if (parsedResponse.error) {
            console.log(parsedResponse.error);
        } else {
            console.log("success");
        }
    });
}
