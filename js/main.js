// 入力値をリストの最後に追加

"use strict";

$(document).ready(function () {
  let json = "./data/todo.json";

  //jsonからtodoリストを配列に格納する際に使用する
  let arrayTodoList = [];

  /* ==============================================
  リストを取得して初期表示する
  ============================================== */

  $.getJSON(json, (data) => {
    data.todo.forEach((item) => {
      //itemのstatusに状態を設定（0:未完了 1:完了）
      item.status = 0;
      arrayTodoList.push(item);

      //inputタグを生成する
      let checkbox = makeCheckbox(item);

      //labelタグを生成してtitleを格納
      let label = makeLabel(item).text(item.title);

      //deleteBtnを生成する
      let deleteBtn = makeDeleteBtn();

      //listタグの子要素にlabelタグを追加し、
      let li = $("<li>").addClass("list__item").append(checkbox);
      li.append(label);
      li.append(deleteBtn);
      $(".todo-list__item--wrap").append(li);
    });
  });

  // inputタグを生成する（jqueryオブジェクトとかいうものを返す）
  function makeCheckbox(item) {
    let checkbox = $("<input>").attr({
      id: "list--" + item.id,
      type: "checkbox",
      class: "list__item--checkbox",
      value: item.title,
    });
    return checkbox;
  }

  // labelタグを生成する（jqueryオブジェクトを返す）
  function makeLabel(item) {
    let label = $("<label>").attr({
      for: "list--" + item.id,
    });
    return label;
  }

  // buttonタグを生成する
  function makeDeleteBtn() {
    let deleteBtn = $("<button>").attr({
      class: "list__btn--delete",
    });
    deleteBtn.text("削除");
    return deleteBtn;
  }

  /* ==============================================
  入力値をtodoリストに登録する
  ============================================== */
  $("#registration-btn").on("click", function () {
    // 入力されたかチェック
    // 入力された値を取得
    let inputValue = getInputValue();

    // 入力ボックスに入力値が空だったら終了
    if (inputValue === "") {
      return;
    }

    // jsonデータを取得して、idを取得。次のidを生成する
    $.getJSON(json, (data) => {
      let arrayTodoID = [];
      let obj = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < obj.todo.length; i++) {
        arrayTodoID.push(obj.todo[i].id);
      }
      let maxId = Math.max(...arrayTodoID);

      // inputタグを生成
      let newCheckbox = makeNewCheckbox(maxId, inputValue);

      // labelタグを生成してtitleを格納
      let newLabel = makeNewLabel(maxId).text(inputValue);

      // buttonタグを生成する
      let deleteBtn = makeDeleteBtn();

      // 入力値をテキストにしてlistタグを生成
      let newlist = $("<li>").addClass("list__item").append(newCheckbox);
      newlist.append(newLabel);
      newlist.append(deleteBtn);

      // wrapを取得して中にlistタグを挿入;
      $(".todo-list__item--wrap").append(newlist);
      clearValue();

      // オブジェクトを生成して、配列に追加
      arrayTodoList.push({ id: maxId + 1, title: inputValue, status: 0 });
    });
  });

  // 入力値を取得（stringを返す）
  function getInputValue() {
    let todoItem = $("#new-item").val();
    return todoItem;
  }

  // inputタグを生成
  function makeNewCheckbox(maxId, inputValue) {
    let newCheckbox = $("<input>").attr({
      id: "list--" + (maxId + 1),
      type: "checkbox",
      class: "list__item--checkbox",
      value: inputValue,
    });
    return newCheckbox;
  }

  // labelタグを生成する（jqueryオブジェクトを返す）
  function makeNewLabel(maxId) {
    let newLabel = $("<label>").attr({
      for: "list--" + (maxId + 1),
    });
    return newLabel;
  }

  // inputタグの入力値をクリアする
  let clearValue = () => $("#new-item").val("");

  /* ==============================================
  チェックボックスをクリックしたらそのリストに該当する配列のstatusを変更する
  ステータスを更新して配列に情報を追加する
  更新した配列であらためてDOMを生成する
  ============================================== */

  // クリックしたinputタグの中でもチェックボックスだけクリックしたときに起動
  $(document).on("click", 'input[type="checkbox"]', function () {
    // クリックしたcheckboxのIDを取得して、「list--」を削除
    let id = this.id.replace("list--", "") - 1;

    // もしクリックした要素のstatusが0（未）なら
    if (arrayTodoList[id].status === 0) {
      // ステータスを更新
      arrayTodoList[id].status = 1;
    }

    // もしクリックした要素のstatusが1（済）なら
    else if (arrayTodoList[id].status === 1) {
      // ステータスを更新
      arrayTodoList[id].status = 0;
    }

    // 一度リストを削除する
    $(".list__item").remove();

    // 更新した配列で改めてDOMを生成する
    let domList = createDOM(arrayTodoList);

    for (let i = 0; i < domList.length; i++) {
      $(".todo-list__item--wrap").append(domList[i]);
    }
  });

  function createDOM(arrayTodoList) {
    const domList = [];
    for (let i = 0; i < arrayTodoList.length; i++) {
      //inputタグ（checkbox）を作成
      let checkbox = $("<input>").attr({
        id: "list--" + arrayTodoList[i].id,
        type: "checkbox",
        class: "list__item--checkbox",
        value: arrayTodoList[i].title,
      });
      if (arrayTodoList[i].status === 1) {
        checkbox.prop("checked", true);
      }

      //labelタグの生成
      let label = $("<label>").attr({
        for: "list--" + arrayTodoList[i].id,
      });
      label.text(arrayTodoList[i].title);

      //buttonタグを生成
      let deleteBtn = makeDeleteBtn();

      //DOMを生成
      let li = $("<li>").addClass("list__item").append(checkbox);
      li.append(label);
      li.append(deleteBtn);

      domList.push(li);
    }
    return domList;
  }

  /* ==============================================
  削除の挙動を作成する
  -------------------------------------------------
  リストを生成するときに削除ボタンを一緒に作成するようにする
  削除ボタンを押したら、DOMを削除する
  対象のDOM要素に対応する配列を削除する
  削除後の配列でDOMを再描画する
  ============================================== */
});
