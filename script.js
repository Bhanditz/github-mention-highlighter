// Generated by CoffeeScript 1.6.3
(function() {
  var GitHubMentionHighlighter;

  GitHubMentionHighlighter = (function() {
    GitHubMentionHighlighter.prototype.userMentions = function() {
      var $mention, mention, mentions, _i, _len, _ref;
      mentions = [];
      _ref = $(".user-mention");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mention = _ref[_i];
        $mention = $(mention);
        if ($mention.text() === ("@" + this.username)) {
          mentions.push($mention);
        }
      }
      return mentions;
    };

    GitHubMentionHighlighter.prototype.teamMentions = function() {
      var $mention, mention, mentions, _i, _len, _ref;
      mentions = [];
      _ref = $(".team-mention");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mention = _ref[_i];
        $mention = $(mention);
        $.ajax({
          url: $mention.data("url"),
          async: false,
          dataType: 'json',
          success: function(data) {
            if ($.inArray(this.username, data["members"]) !== -1) {
              return mentions.push($mention);
            }
          }
        });
      }
      return mentions;
    };

    GitHubMentionHighlighter.prototype.mentions = function() {
      return $.merge(this.userMentions(), this.teamMentions());
    };

    function GitHubMentionHighlighter() {
      var $mention, _i, _len, _ref;
      this.username = $("#user-links .name").text().trim();
      _ref = this.mentions();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        $mention = _ref[_i];
        $mention.addClass("highlight");
        $mention.parents(".timeline-comment").addClass("highlight");
      }
    }

    return GitHubMentionHighlighter;

  })();

  $(function() {
    return new GitHubMentionHighlighter();
  });

}).call(this);
