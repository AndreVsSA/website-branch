document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', async () => {
       
        const response = await fetch('https://qap-token-auth.onrender.com/empresas');
        let services = [];
        const serviceType = item.dataset.service;
       

        if (response.ok) {
            const data = await response.json();
            services = Array.isArray(data) ? data : [];
        } else {
            console.error('Failed to fetch services:', response.statusText);
        }

        displayServices(services, serviceType);
        document.getElementById('search').focus();
        
    });
});

function displayServices(services, serviceType) {
    const serviceList = document.getElementById('service-list');
    serviceList.innerHTML = '';

    services
        .filter(service => service.tipo.toLowerCase() === serviceType.toLowerCase())
        .forEach(service => {
            const listItem = document.createElement('li');
            listItem.className = 'service-item';
            listItem.innerHTML = `
                <h3>${service.nome}</h3>
                <p>Endereço: ${service.endereco.rua}, ${service.endereco.numero} - ${service.endereco.bairro}, ${service.endereco.cidade}, ${service.endereco.estado}</p>
                <p>Telefone: ${service.telefone}</p>
                <button onclick="showServiceDetails(${JSON.stringify(service).replace(/"/g, '&quot;')})">Ver detalhes</button>
            `;
            serviceList.appendChild(listItem);
        });

    document.getElementById('service-menu').classList.remove('hidden');
    document.getElementById('service-details').classList.add('hidden');
}

function showServiceDetails(service) {
    const serviceDetails = document.getElementById('service-details');
    serviceDetails.innerHTML = `
        <h2>${service.nome}</h2>
        <p>Endereço: ${service.endereco.rua}, ${service.endereco.numero} - ${service.endereco.bairro}, ${service.endereco.cidade}, ${service.endereco.estado}</p>
        <p>Telefone: ${service.telefone}</p>
        <p>Tipo de serviço: ${service.tipo}</p>
        <button onclick="hideServiceDetails()">Fechar</button>
    `;
    serviceDetails.classList.remove('hidden');
    document.getElementById('service-menu').classList.remove('hidden');
}

function hideServiceDetails() {
    document.getElementById('service-details').classList.add('hidden');
}