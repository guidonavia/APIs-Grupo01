const btn = document.getElementById('cargar');
const tbody = document.querySelector('#tabla tbody');

btn.addEventListener('click', async () => {
  tbody.innerHTML = ''; // limpia

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    users.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${u.id}</td><td>${u.name}</td><td>${u.email}</td>`;
      tbody.appendChild(tr);
    });
  } catch (e) {
    console.error('Error al cargar los usuarios', e);
  }
});
