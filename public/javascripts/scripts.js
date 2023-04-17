// Global + Canada Map Tooltips
$(function () {
  var world = document.getElementsByTagName("path");
  for (var i = 0; i < world.length; i++) {
    var country = world[i];
    country.setAttribute("data-toggle", "tooltip");
    country.setAttribute("data-placement", "top");
    country.setAttribute("title", country.getAttribute("id"));
  }
  $('[data-toggle="tooltip"]').tooltip()
})

function confirmDelete() {
  return confirm('Are you sure you want to delete this?');
}