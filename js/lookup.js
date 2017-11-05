var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');

function search() {
    $("#lookupTable").find("tr").remove();
    accountingCollection.load(function () {
        var accountings = accountingCollection.find(
            {
                date: {
                    $gte: $("#fromTime").val(),
                    $lte: $("#toTime").val()
                }
            },
            {
                $orderBy: { date: -1 }
            }

        );

        for (var i = 0; i < accountings.length; i++) {
            var date = accountings[i].date;
            var type = accountings[i].type;
            var item = accountings[i].item;
            var cost = accountings[i].cost;

            $("#lookupTable").append("<tr><th>" + date + "</th><th>" + type + "</th><th>" + item + "</th><th>" + cost + "</th></tr>");
        }
    });
}