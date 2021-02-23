// jsonファイルを取得してtitleプロパティをリストに設定

"use strict";

$(function () {
  let json = "./data/todo.json";
  let target = $(".todo-list__item--wrap");

  $.getJSON(json, (data) => {
    // console.log(data.todo[0].title);
    data.todo.forEach((item) => {
      let li = $("<li>").addClass("list__item").text(item.title);
      console.log(li);
      $(target).append(li);
    });
  });
});
