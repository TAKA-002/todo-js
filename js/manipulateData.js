// 入力値をリストの最後に追加

"use strict";

$(document).ready(function () {
  let json = "./data/todo.json";

  /* ==============================================
  リストを取得して初期表示する
  ============================================== */

  //jsonからtodolistを配列に格納
  let todoList = [];

  $.getJSON(json, (data) => {
    data.todo.forEach((item) => {
      //itemのstatusに状態を設定（0:未完了 1:完了）
      item.status = 0;
      todoList.push(item);

      //inputタグを生成する
      let input = makeInput(item);

      //spanタグを生成してtitleを格納
      let span = $("<span>").text(item.title);

      //listタグの子要素にinputタグを追加し、
      let li = $("<li>").addClass("list__item").append(input);
      li.append(span);
      $(".todo-list__item--wrap").append(li);
    });
  });

  //inputタグを生成する
  function makeInput(itemdata) {
    let input = $("<input>").attr({
      id: "list--" + itemdata.id,
      type: "checkbox",
      class: "list__item--checkbox",
      value: itemdata.title,
    });
    return input;
  }

  /* ==============================================
  入力値をtodoリストに登録する
  ============================================== */
  $("#registration-btn").on("click", function () {
    //inputメニューを取得
    let todoItem = getInputTodo();

    //入力ボックスに入力値が空だったら終了
    if (todoItem === "") {
      return;
    }

    // jsonデータを取得して、idを取得
    let aryId = [];

    $.getJSON(json, (data) => {
      let obj = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < obj.todo.length; i++) {
        aryId.push(obj.todo[i].id);
      }
      let maxId = Math.max(...aryId);

      //inputタグを生成
      let checkbox = $("<input>").attr({
        id: maxId + 1,
        type: "checkbox",
        class: "list__item--checkbox",
        value: todoItem,
      });

      //spanタグを生成してtitleを格納
      let span = $("<span>").text(todoItem);

      //入力値をテキストにしてlistタグを生成
      let list = createList().append(checkbox);
      list = list.append(span);

      // wrapを取得して中にlistタグを挿入;
      $(".todo-list__item--wrap").append(list);
      clearValue();
    });
  });

  //入力値を取得
  function getInputTodo() {
    let todoItem = $("#new-item").val();
    return todoItem;
  }

  //liタグを生成して、DOMを生成する
  function createList() {
    let li = $("<li>").addClass("list__item");
    return li;
  }

  //inputタグの入力値をクリアする
  let clearValue = () => $("#new-item").val("");

  /* ==============================================
  チェックボックスをクリックしたら完了・未完了を取得できる
  ============================================== */
  $("#todo-list").on("click", function (e) {
    console.log(e.target);
    $(this).prop("checked", true);
  });
});
