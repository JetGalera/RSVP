<script>
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;

    // Toggle display
    if(answer.style.display === 'block'){
      answer.style.display = 'none';
    } else {
      answer.style.display = 'block';
    }

    // Optional: toggle arrow direction
    const arrow = button.querySelector('.arrow');
    arrow.textContent = arrow.textContent === '▼' ? '▲' : '▼';
  });
});
</script>
