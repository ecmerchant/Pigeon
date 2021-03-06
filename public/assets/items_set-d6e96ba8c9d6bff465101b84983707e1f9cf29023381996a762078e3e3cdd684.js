
var maxColnum = 2;
var maxRownum = 100;
var price_data = [];
var title_data = [];
var colOption = [];

var idata = gon.udata;
var pdata = idata['price'];
var fdata = idata['fixed'];
var tdata = idata['title'];
var kdata = idata['keyword'];

for(var i=0; i < maxRownum; i++){
  price_data[i] = [];
  title_data[i] = [];
  for(var j=0; j < maxColnum; j++){
    price_data[i][0] = i*500;
    price_data[i][1] = 2980 + i*500;
    title_data[i][j] = "";
  }
  colOption[i] = {readOnly: true};
}
colOption[0] = {readOnly: false};

var price_container = document.getElementById('price_table');
var price_handsontable = Handsontable(price_container, {
  /* オプション */
  width: 480,
  height: 240,
  //data: price_data,
  data: pdata,
  contextMenu: true,
  rowHeaders: true,
  colHeaders: ["ヤフオク販売価格","アマゾン販売価格"],
  maxCols: maxColnum,
  maxRows: maxRownum,
  manualColumnResize: true,
  autoColumnSize: false,
  colWidths:[200,200]
});

var title_container = document.getElementById('title_table');
var title_handsontable = Handsontable(title_container, {
  /* オプション */
  width: 480,
  height: 240,
  //data: title_data,
  data: tdata,
  contextMenu: true,
  rowHeaders: true,
  colHeaders: ["置換前","置換後"],
  maxCols: maxColnum,
  maxRows: maxRownum,
  manualColumnResize: true,
  autoColumnSize: false,
  colWidths:[200,200]
});

var int_data =[];
var rnum = 100;
for(var i=0; i < rnum; i++){
  int_data[i] = [];
  int_data[i][0] = "";
  int_data[i][1] = "";
  int_data[i][2] = "";
}

int_data[0][0] = "feed_product_type"
int_data[1][0] = "quantity"
int_data[2][0] = "recommended_browse_nodes"
int_data[3][0] = "fulfillment_latency"
int_data[4][0] = "condition_type"
int_data[5][0] = "condition_note"
int_data[6][0] = "standard_price_points"
int_data[0][1] = "商品タイプ"
int_data[1][1] = "数量"
int_data[2][1] = "推奨ブラウズノード番号"
int_data[3][1] = "出荷作業日数"
int_data[4][1] = "商品のコンディション"
int_data[5][1] = "商品のコンディション説明"
int_data[6][1] = "ポイント（販売価格に対するパーセントを記入）"

var fix_container = document.getElementById('fix_table');
var fix_handsontable = Handsontable(fix_container, {
  /* オプション */
  width: 800,
  height: 240,
  //data: int_data,
  data: fdata,
  contextMenu: true,
  rowHeaders: true,
  colHeaders: ["項目名","説明","値"],
  maxCols: 3,
  maxRows: maxRownum,
  manualColumnResize: true,
  autoColumnSize: true,
  colWidths:[200,200,200]
});

var brand_data = [];
for(var i=0; i < 100; i++){
  brand_data[i] = [];
  brand_data[i][0] = "";
  brand_data[i][1] = "";
  brand_data[i][2] = "";
  brand_data[i][3] = "";
  brand_data[i][4] = "";
}

var brand_container = document.getElementById('brand_table');
var brand_handsontable = Handsontable(brand_container, {
  /* オプション */
  width: 1000,
  height: 240,
  //data: brand_data,
  data: kdata,
  contextMenu: true,
  rowHeaders: true,
  colHeaders: ["キーワード","brand_name（ブランド名）","manufacturer（メーカ名）","recommended_browse_nodes（推奨ブラウズノード）","generic_keywords（検索キーワード）"],
  maxCols: 5,
  maxRows: maxRownum,
  manualColumnResize: true,
  autoColumnSize: false,
  colWidths:[200,150,150,250,400]
});



$("#save").click(function () {
  var pricedata = price_handsontable.getData();
  var titledata = title_handsontable.getData();
  var keydata = brand_handsontable.getData();
  var fixdata = fix_handsontable.getData();

  var senddata = {price: pricedata, title: titledata, keyword: keydata, fixed: fixdata};
  senddata = JSON.stringify(senddata);

  myData = {data: senddata};

  $.ajax({
    url: "/items/set",
    type: "POST",
    data: myData,
    dataType: 'json',
    success: function (myData) {
      alert("保存しました");
      //handsontable.loadData(myData);
    },
    error: function (myData) {
      //handsontable.loadData(myData);
      alert("保存しました");
      //alert("NG");
    }
  });
});
