const API_URL = 'http://localhost:3000/authors';

async function fetchAuthors() {
  try {
    const response = await fetch(API_URL);
    const authors = await response.json();

    const tableBody = document.querySelector('#authorsTable tbody');
    tableBody.innerHTML = '';

    authors.forEach(author => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${author.nome}</td>
        <td>${author.cognome}</td>
        <td>${author.email}</td>
        <td>${author.dataDiNascita}</td>
        <td><img src="${author.avatar}" alt="Avatar" style="width:50px;height:50px;"></td>
        <td>
          <button onclick="editAuthor('${author._id}')">Modifica</button>
          <button onclick="deleteAuthor('${author._id}')">Elimina</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Errore nel recupero degli autori:', error);
  }
}

async function fetchAuthorById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const author = await response.json();
    console.log('Dati autore:', author);
    return author;
  } catch (error) {
    console.error('Errore nel recupero autore:', error);
  }
}

async function addAuthor(event) {
  event.preventDefault();

  const newAuthor = {
    nome: document.getElementById('name').value,
    cognome: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    dataDiNascita: document.getElementById('birthday').value,
    avatar: document.getElementById('avatar').value,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAuthor),
    });

    if (response.ok) {
      fetchAuthors();
      document.getElementById('authorForm').reset();
    } else {
      console.error('Errore nella creazione autore:', await response.text());
    }
  } catch (error) {
    console.error('Errore:', error);
  }
}

async function editAuthor(id) {
  const updatedAuthor = await fetchAuthorById(id);

  if (updatedAuthor) {
    document.getElementById('name').value = updatedAuthor.nome;
    document.getElementById('lastName').value = updatedAuthor.cognome;
    document.getElementById('email').value = updatedAuthor.email;
    document.getElementById('birthday').value = updatedAuthor.dataDiNascita;
    document.getElementById('avatar').value = updatedAuthor.avatar;

    document.getElementById('authorForm').onsubmit = async function (event) {
      event.preventDefault();

      const updatedData = {
        nome: document.getElementById('name').value,
        cognome: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        dataDiNascita: document.getElementById('birthday').value,
        avatar: document.getElementById('avatar').value,
      };

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          fetchAuthors();
          document.getElementById('authorForm').reset();
          document.getElementById('authorForm').onsubmit = addAuthor;
        } else {
          console.error('Errore aggiornamento autore:', await response.text());
        }
      } catch (error) {
        console.error('Errore:', error);
      }
    };
  }
}

async function deleteAuthor(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchAuthors();
    } else {
      console.error('Errore eliminazione autore:', await response.text());
    }
  } catch (error) {
    console.error('Errore:', error);
  }
}

document.getElementById('authorForm').addEventListener('submit', addAuthor);

fetchAuthors();