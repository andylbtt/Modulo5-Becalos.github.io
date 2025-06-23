const container = document.getElementById('data-container');
const modal = document.getElementById('modal');
const modalDetails = document.getElementById('modal-details');
const genderFilter = document.getElementById('genderFilter');
const speciesFilter = document.getElementById('speciesFilter');

let currentPage = 1;
let usingAxios = false;

function showCharacters(characters) {
  container.innerHTML = '';
  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = 'character';
    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}" />
      <h4>${character.name}</h4>
      <p><strong>Especie:</strong> ${character.species}</p>
      <p><strong>Género:</strong> ${character.gender}</p>
    `;
    card.onclick = () => openModal(character);
    container.appendChild(card);
  });
}

function openModal(character) {
  modalDetails.innerHTML = `
    <h2>${character.name}</h2>
    <img src="${character.image}" alt="${character.name}" style="width: 100%; border-radius: 8px;" />
    <p><strong>Género:</strong> ${character.gender}</p>
    <p><strong>Especie:</strong> ${character.species}</p>
    <p><strong>Estado:</strong> ${character.status}</p>
    <p><strong>Origen:</strong> ${character.origin.name}</p>
    <p><strong>Ubicación:</strong> ${character.location.name}</p>
  `;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

async function fetchCharacters() {
  usingAxios = false;
  await loadCharacters(fetch);
}

async function axiosCharacters() {
  usingAxios = true;
  await loadCharacters(axios.get);
}

async function loadCharacters(requestFn) {
  try {
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;
    const gender = genderFilter.value;
    const species = speciesFilter.value;

    if (gender) url += `&gender=${gender}`;
    if (species) url += `&species=${species}`;

    const response = requestFn === fetch
      ? await requestFn(url).then(res => res.json())
      : await requestFn(url).then(res => res.data);

    showCharacters(response.results);
  } catch (error) {
    console.error('Error cargando personajes:', error);
    container.innerHTML = '<p>Error cargando personajes.</p>';
  }
}

function nextPage() {
  currentPage++;
  usingAxios ? axiosCharacters() : fetchCharacters();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    usingAxios ? axiosCharacters() : fetchCharacters();
  }
}

function applyFilters() {
  currentPage = 1;
  usingAxios ? axiosCharacters() : fetchCharacters();
}

function clearFilters() {
  genderFilter.value = "";
  speciesFilter.value = "";
  currentPage = 1;
  usingAxios ? axiosCharacters() : fetchCharacters();
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}