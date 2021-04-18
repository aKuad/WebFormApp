/*
 * Form input sending script
 */

/* Data sending trigger */
function form_send() {
  if(input_check()) {
    data_send(item_get());
    document.getElementsByTagName("body")[0].innerHTML = `
      <div class="base-container">
        <h1 id="form-title">` + document.getElementById("form-title").innerHTML + `</h1>
        <div class="main-secspace">
          <div class="main-container">ご回答ありがとうございました。</div>
        </div>
        <div class="button-container">
          <a href="/"><div class="button-content">トップへ戻る</div></a>
        </div>
      </div>`;
  } else {
    document.getElementById("info-incorrect").style = "";
  }
}


/* Form fill checker */
function input_check() {
  var isAllObjFilled = true;
  for(i = 0; i < document.getElementsByClassName("form-noEmpty").length; i++) {
    if(document.getElementsByClassName("form-noEmpty")[i].value == "") {
      isAllObjFilled = false;
    }
  }
  return isAllObjFilled;
}


/* Form input reader */
function item_get() {
  var data = {"form-name": location.href.split("/").pop()};
  for(i = 0; i < document.getElementsByClassName("form-content").length; i++) {
    data[document.getElementsByClassName("form-content")[i].name]
      = document.getElementsByClassName("form-content")[i].value;
  }
  console.log(JSON.stringify(data));
  return data;
}


/* Data sender */
function data_send(data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/send");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}
