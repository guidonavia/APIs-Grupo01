document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('darkModeToggle');
  btn.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });
});