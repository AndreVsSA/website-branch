document.addEventListener("DOMContentLoaded", function () {

    let serviceType = [];
    let services = [];

    //const url = `https://qap-token-auth.onrender.com/empresas`;

    const servicesList = document.getElementById('services-list');
    const searchBar = document.getElementById('searchBar');

    const item = document.querySelectorAll('.grid-item');

    searchBar.addEventListener('input', function () {
        const searchValue = searchBar.value.toLowerCase();
        const filteredServices = services.filter(service => {
            console.log(service.cidade.toLowerCase().includes(searchValue));

             return (
                service.cidade.toLowerCase().includes(searchValue) ||
                service.estado.toLowerCase().includes(searchValue) ||
                service.tipoServico.toLowerCase().includes(searchValue)
            ); 
        });
        displayServices(filteredServices);
    });

    //seta event listener nos icones

    for (let i = 0; i < item.length; i++) {
        serviceType.push(item[i].getAttribute('data-service'));

        item[i].addEventListener('click', displaySearchBar(i));
    }

    function displayServices(services) {
        servicesList.innerHTML = '';
        services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = `Nome: ${service.nome}, Endereço: ${service.endereco.estado}, ${service.endereco.cidade}, ${service.endereco.bairro}, ${service.endereco.rua}, ${service.endereco.numero}, Telefone: ${service.telefone}, Tipo de serviço: ${service.tipoServico}`;
            servicesList.appendChild(li);
        });
    }

    //função que acessa a api e puxa os dados

    function displaySearchBar(value) {
        const url = `https://qap-token-auth.onrender.com/empresas?service=${serviceType[value]}`;
        
        searchBar.style.display = 'block';
        searchBar.focus();

        //executa a chamada da api

        fetch(url)
            .then(response => response.json())
            .then(data => {
                services = data;
                console.log(services);
                //displayServices(services);
            })
            .catch(error => {
                console.error('Erro ao obter serviços:', error);
            });

    }

    //inicializa as particulas

    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'particles.json', function () {
        console.log('particles.js loaded - callback');
    });

});
