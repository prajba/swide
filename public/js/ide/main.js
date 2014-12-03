var editor = ace.edit("editor");
var shMode = require("ace/mode/sh").Mode;
var batMode = require("ace/mode/batchfile").Mode;
var sqlMode = require("ace/mode/sql").Mode;
var vbsMode = require("ace/mode/vbscript").Mode;

// yyyy-mm-dd hh:mm:ss
var getTime = function() {
  var date = new Date();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if (m < 10) m = '0' + m;
  var d = date.getDate();
  if (d < 10) d = '0' + d;
  var hh = date.getHours();
  if (hh < 10) hh = '0' + hh;
  var mm = date.getMinutes();
  if (mm < 10) mm = '0' + mm;
  var ss = date.getSeconds();
  if (ss < 10) ss = '0' + ss;
  return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss;
};

// field>target cascading dropdown lists
var changeTarget = function(selectField, selectTarget) {
  var field = $(selectField).val();
  var targetList = $.unique(getTargetList(field));
  $(selectTarget).empty();
  for(var i in targetList) {
    var o = new Option(targetList[i], targetList[i]);
    $(o).html(targetList[i]);
    $(selectTarget).append(o);
  }
};
var changeTargetVersion = function(selectTarget, selectVersion) {
  var target = $(selectTarget).val();
  var targetVersionList = getTargetVersionList(target);
  $(selectVersion).empty();
  for(var i in targetVersionList) {
    var o = new Option(targetVersionList[i], targetVersionList[i]);
    $(o).html(targetVersionList[i]);
    $(selectVersion).append(o);
  }
};

// sidebar
var resetSidebar = function() {
  $('#sidebar>a').css({
    'background': '#515151',
    'color': '#BCBCBC',
    'border-bottom': '1px solid #444'
  });
};

// searchbar
var formatKeywords = function(rawinput) {
  return $.trim(rawinput);
};
var search = function() {
  var input = formatKeywords($('#searchbar>input').val());
  if(input === '') {
    $('#searchbar>input').val('');
    return;
  }
  var params = {
    field: $('#field').val(),
    target: $('#target').val(),
    keywords: input
  };
  $.get('/search', params, function(data) {
    if(data instanceof Array) {
      $('#searchresult-info').attr('class', 'alert alert-success');
      $('#searchresult-info').html('共搜索到'+data.length+'个符合条件的脚本');
      $results.html(dataTemplate({resultsArray:data}));
    }
    else {
      $('#searchresult-info').attr('class', 'alert alert-danger');
      $('#searchresult-info').html('没有找到符合条件的脚本，请重新搜索或新建脚本');
      $('#newscript').show();
    }
  });
};

// show/hide page
var showPageSearch = function() {
  $('#navbar-location').text('SWIDE');
  resetSidebar();
  $('#sidebar-search').css({
    'background': '#3A3A3A',
    'color': 'White',
    'border-bottom': '1px solid #666'
  });
  $('#searchbar').show();
  $('#searchresult').show();
};
var hidePageSearch = function() {
  $('#searchbar').hide();
  $('#searchresult').hide();
};
var showPageNewScript = function() {
  $('#navbar-location').text('SWIDE / 新建脚本');
  resetSidebar();
  $('#sidebar-new').css({
    'background': '#3A3A3A',
    'border-bottom': '1px solid #666',
    'color': 'White'
  });
  $('#actionbar').show();
  $('#attrblock').show();
  $('#editor').show();
  $('#actionbar').css('left', $(window).width() - 150);
  $('#actionbar-attrblock').css('background', '#E4E4E4');
  $('#attrblock').css({
    'height': $(window).height() - 60,
    'left': $(window).width() - 300
  });
  $('#createdby').val($('#ide-user').text());
  $('#updatedby').val($('#ide-user').text());
  $('#createdtime').val(getTime());
  $('#updatedtime').val(getTime());
  $('#editor').css({
    'height': $(window).height() - 60,
    'width': $(window).width() - 356
  });
  editor.getSession().setMode(new shMode());
};
var hidePageNewScript = function() {
  $('#actionbar').hide();
  $('#attrblock').hide();
  $('#editor').hide();
};

// init IDE
var initIDE = function() {
  $('#sidebar').css('height', $(window).height() - 30);
  $('#sidebar>a').hover(function() {
    $(this).fadeOut(100);
    $(this).fadeIn(500);
  });
  $('#sidebar-search').css({
    'background': '#3A3A3A',
    'color': 'White',
    'border-bottom': '1px solid #666'
  });
  editor.setFontSize("15px");
  editor.setTheme("ace/theme/tomorrow_night_eighties");
};

$(function() {
  initIDE();

  // searchbar events
  $('#field').change(function() {
    changeTarget('#field', '#target');
  });
  $('#searchbar>button').click(function() {
    search();
  });
  $('#searchbar>input').on('keyup', function(e) {
    if(e.keyCode === 13) {
      search();
    }
  });
  $('#newscript').click(function() {
    showPageNewScript();
  });

  // sidebar events
  $('#sidebar-new').click(function() {
    hidePageSearch();
    showPageNewScript();
  });
  $('#sidebar-search').click(function() {
    hidePageNewScript();
    showPageSearch();
  });

  // actionbar events
  $('#actionbar-save').click(function() {
    var params = {
      name: $('#scriptname').val(),
      createdBy: $('#createdby').val(),
      createdTime: $('#createdtime').val(),
      description: $('#description').val(),
      type: $('#scripttype').val(),
      machine: $('#machine').val(),
      field: $('#fieldtype').val(),
      target: {
        type: $('#targettype').val(),
        version: $('#targetversion').val()
      },
      latestVersion: 'undefined',
      scriptContent: {
        version: 'undefined',
        updatedBy: $('#updatedby').val(),
        updatedTime: getTime(),
        content: editor.getValue()
      },
      parameters: {
        input: $('#paramsinput').val(),
        output: $('#paramsoutput').val()
      }
    };
    $.post('/save', params, function(data) {
      alert(data);
    });
  });
  $('#actionbar-download').click(function() {
    alert(editor.getValue());
  });

  // attrblock events
  $('#scripttype').change(function() {
    var type = $('#scripttype').val();
    switch(type) {
    case 'sh':
      editor.getSession().setMode(new shMode());
      break;
    case 'bat':
      editor.getSession().setMode(new batMode());
      break;
    case 'sql':
      editor.getSession().setMode(new sqlMode());
      break;
    case 'vbs':
      editor.getSession().setMode(new vbsMode());
    }
  });
  $('#fieldtype').change(function() {
    changeTarget('#fieldtype', '#targettype');
    changeTargetVersion('#targettype', '#targetversion');
  });
  $('#targettype').change(function() {
    changeTargetVersion('#targettype', '#targetversion');
  });

  // alert events
  $('.alert').click(function() {
    $(this).hide();
  });
});
