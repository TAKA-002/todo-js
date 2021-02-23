// 入力値をリストの最後に追加

"use strict";

$(document).ready(function () {
  //入力値をtodoリストに登録する
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
