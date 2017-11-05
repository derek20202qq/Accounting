var fdb = new ForerunnerDB();
var db = fdb.db("accounting");
var accountingCollection = db.collection('accounting');
accountingCollection.load();

function addInfo() {
    var newAccounting = {
        date: $("#date").val(),
        type: $("#type").val(),
        item: $("#item").val(),
        cost: $("#cost").val()
    };
    accountingCollection.insert(newAccounting);
    accountingCollection.save()
    $("#date").val("");
    $("#type").val("");
    $("#item").val("");
    $("#cost").val("");
    alert("Success");
}
