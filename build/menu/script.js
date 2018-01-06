$(document).ready(function() {
    $("#fetchAll").click(fetchAll);
    $("#add").click(add);
});

const tourDataURL = "/tourData";

function addToursAsElement(tours) {
    const targetDiv = $("#tours");
    targetDiv.empty();
    const results = [];
    tours.forEach(function(tour) {
        const tourDiv = $("<div>");
        tourDiv.addClass("tour");
        const tourFields = Object.keys(tour);
        for (var i = 0; i < tourFields.length; i++) {
            tourDiv.append(
                $("<span>")
                    .addClass("tourField")
                    .html(tourFields[i] + ": " + tour[tourFields[i]] || "null")
            );
        }
        tourDiv.append(
            $("<button>")
                .html("delete")
                .addClass("delete")
                .attr('id', tour.id)
                .click(function() {
                    remove(tour.id);
                })
        );
        results.push(tourDiv);
    });
    for (var i = 0; i < results.length; i++) {
        targetDiv.append(results[i]);
    }
}

function convertDatetime(sqlDate) {
    const date = new Date(sqlDate);
    return moment(sqlDate).locale("nl").format("DD MMMM YYYY HH:mm");
}

function addToursAsPrettyElement(tours) {
    const targetDiv = $("#tours");
    targetDiv.empty();
    const results = [];
    tours.forEach(function(tour) {
        console.log(tour);
        const tourTable = $("<table>");
        tourTable.css("width", "100%")
            .append($("<tbody>")
                .append($("<tr>")
                    .append($("<td>")
                        .addClass("datum")
                        .html(convertDatetime(tour.begin))
                    )
                )
                .append($("<tr>")
                    .append($("<td>")
                        .append($("<a>")
                            .html(tour.eventName)
                            .attr("href", tour.eventLink)
                            .attr("target", "_blank")
                        )
                    )
                )
                .append($("<tr>")
                    .append($("<td>")
                        .append($("<a>")
                            .html(tour.location + ", " + tour.city)
                            .attr("href", tour.locationLink)
                            .attr("target", "_blank")
                        )
                    )
                )
            );


        tourTable.append(
            $("<button>")
                .html("delete")
                .addClass("delete")
                .attr('id', tour.id)
                .click(function() {
                    remove(tour.id);
                })
        );
        results.push(tourTable);
    });
    for (var i = 0; i < results.length; i++) {
        targetDiv.append(results[i]);
    }
}

function fetchAll() {
    $.get(tourDataURL, function(response) {
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        if (parsedResponse.error) {
            console.log(parsedResponse.error);
            alert("error");
        } else {
            addToursAsPrettyElement(parsedResponse.data);
        }
    });
}

function getBegin() {
    const dayValue = $("#beginDay").val();
    const day = dayValue.length === 2 ? dayValue : ("0"+dayValue);
    const monthValue = $("#beginMonth").val();
    const month = monthValue.length === 2 ? monthValue : ("0"+monthValue);
    return moment($("#beginYear").val()+"-"
        +$("#beginMonth").val()+"-"
        +$("#beginDay").val()+" "
        +$("#beginHour").val()+":"+$("#beginMinute").val()).format("YYYY-MM-DD HH:mm");
}

function getEnd() {
    const dayValue = $("#endDay").val();
    if (dayValue.length === 0) {
        return null;
    }
    const day = dayValue.length === 2 ? dayValue : ("0"+dayValue);
    const monthValue = $("#endMonth").val();
    const month = monthValue.length === 2 ? monthValue : ("0"+monthValue);
    return $("#endYear").val()+"-"+month+"-"+day+" "+$("#endHour").val()+":"+$("#endMinute").val();
}

function add() {
    const tour = {
        eventName: $("#eventName").val(),
        eventLink: $("#eventLink").val(),
        city: $("#city").val(),
        location: $("#location").val(),
        locationLink: $("#locationLink").val(),
        begin: getBegin(),
        end: getEnd()
    };
    console.log(tour);
    $.ajax({
        url: tourDataURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(tour),
        success: function(response) {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.error) {
                console.log(parsedResponse.error);
                alert("error");
            } else {
                console.log("success");
                fetchAll();
            }
        }
    });
}

function remove(id) {
    console.log("removing tour " + id);
    $.ajax({
        url: tourDataURL,
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({id: id}),
        success: function(response) {
            const parsedResponse = JSON.parse(response);
            if (parsedResponse.error) {
                console.log(parsedResponse.error);
                alert("error");
            } else {
                console.log("success");
                fetchAll();
            }
        }
    });
}
