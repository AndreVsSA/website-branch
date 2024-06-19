document.addEventListener("DOMContentLoaded", function() {
    const url = 'https://qap-token-auth.onrender.com/empresas';
    const servicesList = document.getElementById('servicesList');
    const searchBar = document.getElementById('searchBar');
    let services = [];

    searchBar.addEventListener('input', function() {
        const searchValue = searchBar.value.toLowerCase();
        const filteredServices = services.filter(service => {
            return (
                service.endereco.cidade.toLowerCase().includes(searchValue) ||
                service.endereco.estado.toLowerCase().includes(searchValue) ||
                service.tipoServico.toLowerCase().includes(searchValue)
            );
        });
        displayServices(filteredServices);
    });

    function displayServices(services) {
        servicesList.innerHTML = '';
        services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${service.nome}, Endereço: ${service.endereco.estado}, ${service.endereco.cidade}, ${service.endereco.bairro}, ${service.endereco.rua}, ${service.endereco.numero}, Telefone: ${service.telefone}, Tipo de serviço: ${service.tipoServico}`;
            servicesList.appendChild(li);
        });
    }

    function displaySearchBar() {
        searchBar.style.display = 'block';
        searchBar.focus();
    }

    document.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', displaySearchBar);
    });

    fetch(url)
        .then(response => response.json())
        .then(data => {
            services = data;
            displayServices(services);
        })
        .catch(error => {
            console.error('Erro ao obter serviços:', error);
        });

    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('particles.js loaded - callback');
    });
});
