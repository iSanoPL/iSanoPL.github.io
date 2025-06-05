// Zapobiega wywoływaniu menu kontekstowego (prawy klik) na logo
document.addEventListener("contextmenu", function(e) {
  if (e.target.tagName.toLowerCase() === 'img' && e.target.getAttribute('src') === 'logo.png') {
    e.preventDefault();
  }
});