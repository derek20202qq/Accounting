var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
var eat = 0;
var wear = 0;
var live = 0;
var go = 0;
var education = 0;
var play = 0;
var other = 0;

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
            console.log(accountings[i]._id);

            $("#lookupTable").append("<tr><th>" + date + "</th><th>" + type + "</th><th>" + item + "</th><th>" + cost + "</th><th>"+ "<button class=\"btn btn-danger little\" style=\"height:5%; font-size:5%; margin:0\" onclick='remove(\""+accountings[i]._id+"\")'>刪除</button>" +"</th></tr>");
        }

        for (var i = 0; i < accountings.length; i++) {
            if(accountings[i].type == "食"){
                eat += (accountings[i].cost / 1);
            }else if(accountings[i].type == "衣"){
                wear += (accountings[i].cost / 1);
            }else if(accountings[i].type == "住"){
                live += (accountings[i].cost / 1);                
            }else if(accountings[i].type == "行"){
                go += (accountings[i].cost / 1);                
            }else if(accountings[i].type == "育"){
                education += (accountings[i].cost / 1);                
            }else if(accountings[i].type == "樂"){
                play += (accountings[i].cost / 1);               
            }else if(accountings[i].type == "其他"){
                other += (accountings[i].cost / 1);                
            }
            
        }
        var total = eat + wear + live + go + education + play + other;

        $("#eatCost").text(eat);
        $("#eatPercent").text(Math.round(eat / total * 100) + "%");
        $("#wearCost").text(wear);
        $("#wearPercent").text(Math.round(wear / total * 100) + "%");
        $("#liveCost").text(live);
        $("#livePercent").text(Math.round(live / total * 100) + "%");
        $("#goCost").text(go);
        $("#goPercent").text(Math.round(go / total * 100) + "%");
        $("#educationCost").text(education);
        $("#educationPercent").text(Math.round(education / total * 100) + "%");
        $("#playCost").text(play);
        $("#playPercent").text(Math.round(play / total * 100) + "%");
        $("#otherCost").text(other);
        $("#otherPercent").text(Math.round(other / total * 100) + "%");
        $("#totalCost").text(total);
    });
}

function remove(id){
    console.log(id)
    accountingCollection.remove({
        _id: id
    });
    accountingCollection.save();
    location.reload();
}