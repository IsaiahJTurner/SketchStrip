$(document).ready(function() {
  $("textarea").bind('input propertychange', function() {
    $textarea = $(this);
    var svg = $textarea.val();
    var prevLength = svg.length;
    /*
      I kept all the regex's seperate so adding config options could be
      easier in the future.
     */
    
    // remove sketch:type attribute
    svg = svg.replace(/sketch:type="[a-zA-Z0-9:;\.\s\(\)\-\,]*"/gi, "");
    // remove id's
    svg = svg.replace(/id="[a-zA-Z+0-9:;\.\s\(\)\-\,]*"/gi, "");
    // remove xmlns:sketch
    svg = svg.replace(/xmlns\:sketch="[a-zA-Z0-9:;\/\.\s\(\)\-\,]*"/gi, "");
    // remove title tag
    svg = svg.replace(/<title>[^]*<\/title>/, "");
    // remove desc tag 
    svg = svg.replace(/<desc>[^]*<\/desc>/, "");
    // remove defs tag if empty (not sure if it's always empty, just playing it safe)
    svg = svg.replace(/<defs>*<\/defs>/, "");
    // remove comments
    svg = svg.replace(/<\!--[^]*-->/, "");
    // remove empty lines
    svg = svg.replace(/^\s*[\r\n]/gm, "");
    // replace double spaces between attributes with a single space
    // TODO: this line seemes to remove indents
    // svg = svg.replace(/< +/g, ' ');
    // remove extra space before closing >
    svg = svg.replace(/ >+/g, '>');
    
    var newLength = svg.length;
    var charsRemoved = prevLength - newLength;
    $("#saved").text(charsRemoved);

    $textarea.val(svg)
  });
});
