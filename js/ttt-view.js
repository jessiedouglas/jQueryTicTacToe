(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.board = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    var self = this

    $(".ttt-board").on("click", ".ttt-cell", function (event) {
      self.makeMove($(event.target));
    });
  };


  View.prototype.makeMove = function ($cell) {
    var rowIdx = $cell.parent().index();
    var colIdx = $cell.index();
    try {
      this.game.playMove([rowIdx, colIdx]);
      $cell.addClass("marked-" + this.game.board.grid[rowIdx][colIdx]);
    } catch (MoveError) {
      alert("Invalid move!");
    }

    if (this.game.isOver()) {
      if (this.game.winner()) {
        alert("Congratulations, " + this.game.winner() + "! You win!")
      } else {
        alert("It's a draw.")
      }

      $(".ttt-board").off("click");
      $(".ttt-cell").addClass("game-over")
    }
  };

  View.prototype.setupBoard = function () {
    this.board.html(
      '<div class="ttt-row group">\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
      </div>\
      \
      <div class="ttt-row group">\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
      </div>\
      \
      <div class="ttt-row group">\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
        <div class="ttt-cell"></div>\
      </div>'
    )
  };
})();
