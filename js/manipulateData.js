// 入力値をリストの最後に追加

"use strict";

$(document).ready(function () {
  let json = "./data/todo.json";

  /* ==============================================
  リストを取得して初期表示する
  ============================================== */

  $.getJSON(json, (data) => {
    //jsonからtodoリストを配列に格納する際に使用する
    let arrayTodoList = [];
    data.todo.forEach((item) => {
      //itemのstatusに状態を設定（0:未完了 1:完了）
      item.status = 0;
      arrayTodoList.push(item);

      //inputタグを生成する
      let checkbox = makeCheckbox(item);

      //labelタグを生成してtitleを格納
      let label = makeLabel(item).text(item.title);

      //listタグの子要素にlabelタグを追加し、
      let li = $("<li>").addClass("list__item").append(checkbox[0]);
      li.append(label[0]);
      $(".todo-list__item--wrap").append(li);
    });
  });

  //inputタグを生成する（jqueryオブジェクトとかいうものを返す）
  function makeCheckbox(item) {
    let checkbox = $("<input>").attr({
      id: "list--" + item.id,
      type: "checkbox",
      class: "list__item--checkbox",
      value: item.title,
    });
    return checkbox;
  }

  //labelタグを生成する（jqueryオブジェクトを返す）
  function makeLabel(item) {
    let label = $("<label>").attr({
      for: "list--" + item.id,
    });
    return label;
  }

  /* ==============================================
  入力値をtodoリストに登録する
  ============================================== */
  $("#registration-btn").on("click", function () {
    // 入力されたかチェック
    //入力された値を取得
    let inputValue = getInputValue();

    //入力ボックスに入力値が空だったら終了
    if (inputValue === "") {
      return;
    }

    // jsonデータを取得して、idを取得。次のidを生成する
    $.getJSON(json, (data) => {
      let arrayTodoList = [];
      let obj = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < obj.todo.length; i++) {
        arrayTodoList.push(obj.todo[i].id);
      }
      let maxId = Math.max(...arrayTodoList);

      //inputタグを生成
      let newCheckbox = makeNewCheckbox(maxId, inputValue);

      //labelタグを生成してtitleを格納
      let newLabel = makeNewLabel(maxId).text(inputValue);

      //入力値をテキストにしてlistタグを生成
      let newlist = $("<li>").addClass("list__item").append(newCheckbox);
      newlist = newlist.append(newLabel);

      // wrapを取得して中にlistタグを挿入;
      $(".todo-list__item--wrap").append(newlist);
      clearValue();
    });
  });

  //入力値を取得（stringを返す）
  function getInputValue() {
    let todoItem = $("#new-item").val();
    return todoItem;
  }

  //inputタグを生成
  function makeNewCheckbox(maxId, inputValue) {
    let newCheckbox = $("<input>").attr({
      id: "list--" + (maxId + 1),
      type: "checkbox",
      class: "list__item--checkbox",
      value: inputValue,
    });
    return newCheckbox;
  }

  //labelタグを生成する（jqueryオブジェクトを返す）
  function makeNewLabel(maxId) {
    let newLabel = $("<label>").attr({
      for: "list--" + (maxId + 1),
    });
    return newLabel;
  }

  //inputタグの入力値をクリアする
  let clearValue = () => $("#new-item").val("");

  /* ==============================================
  チェックボックスをクリックしたらチェックされているtodoリストを生成する
  ============================================== */
});
