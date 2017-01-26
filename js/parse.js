$(document).ready(function() {

  document.getElementById('fileUpload').addEventListener('change', upload, false);

  // Method that checks that the browser supports the HTML5 File API
  function browserSupportFileUpload() {
    var isCompatible = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isCompatible = true;
    }
    return isCompatible;
  }

  // Method that reads and processes the selected file
  function upload(evt) {
    var title = [];
    var author = [];
    var highlights = [];

    if (!browserSupportFileUpload()) {
      alert('The File APIs are not fully supported in this browser!');
      } else {
      var data = null;
      var file = evt.target.files[0];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event) {
        var csvData = event.target.result;
        data = $.csv.toArrays(csvData);
        if (data && data.length > 0) {

          $.each(data, function(index, value) {
            if (index === 1) {
              title.push(value[0]);
            };
            if (index === 2) {
              title.push(value[0]);
            };
            if (index > 8) {
              highlights.push(value[3]);
            };
          });

        } else {
          alert('No data to import!');
        }
      };
      reader.onerror = function() {
        alert('Unable to read ' + file.fileName);
      };
    }

    $('#submit').on('click', function() {
      var formattedTitle = title.join('\r\n\n');
      var formattedAuthor = author.join('\r\n\n');
      var formattedHighlights = highlights.join('\r\n\n');
      var blob = new Blob([formattedTitle, formattedAuthor, '\r\n\n', formattedHighlights], {type: "text/plain;charset=utf-8"});
      saveAs(blob, formattedTitle + ".txt");
    });

  }

});

