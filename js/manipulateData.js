// 入力値をリストの最後に追加

"use strict";

$(document).ready(function () {
  /* ==============================================
  リストを取得して初期表示する
  ============================================== */
  let json = "./data/todo.json";
  let target = $(".todo-list__item--wrap");

  $.getJSON(json, (data) => {
    data.todo.forEach((item) => {
      //inputタグを生成する
      let input = $("<input>").attr({
        id: "list--" + item.id,
        type: "checkbox",
        class: "list__item--checkbox",
        value: item.title,
      });

      //spanタグを生成してtitleを格納
      let span = $("<span>").text(item.title);

      //listタグの子要素にinputタグを追加し、
      let li = $("<li>").addClass("list__item").append(input);
      li.append(span);
      $(target).append(li);
    });
  });

  /* ==============================================
  チェックボックスをクリックしたら完了・未完了を取得できる
  ============================================== */

  /* ==============================================
  入力値をtodoリストに登録する
  ============================================== */
  $("#registration-btn").on("click", () => {
    let todoItem = getInputTodo();
    if (todoItem === "") {
      return;
    }
    let listItem = createList(todoItem);
    $(".todo-list__item--wrap").append(listItem);
    clearValue();
  });

  //入力値を取得
  let getInputTodo = () => {
    let todoItem = $("#new-item").val();
    return todoItem;
  };

  //liタグを生成して、DOMを生成する
  let createList = (todoItem) => {
    let li = $("<li>").addClass("list__item").text(todoItem);
    return li;
  };

  //inputタグの入力値をクリアする
  let clearValue = () => $("#new-item").val("");
});
