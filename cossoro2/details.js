document.addEventListener("DOMContentLoaded", function() {
    const serviceId = new URLSearchParams(window.location.search).get("id");
    fetch(`https://qap-token-auth.onrender.com/empresas/${serviceId}`)
        .then(response => response.json())
        .then(data => {
            displayServiceDetails(data);
        })
        .catch(error => console.error('Error:', error));
});

function displayServiceDetails(service) {
    const detailsContainer = document.getElementById("service-details");
    detailsContainer.innerHTML = `
        <h2>${service.nome}</h2>
        <p>${service.endereco.estado}, ${service.endereco.cidade}, ${service.endereco.bairro}, ${service.endereco.rua}, ${service.endereco.numero}</p>
        <p>Telefone: ${service.telefone}</p>
        <p>Tipo de Serviço: ${service.tipo}</p>
    `;
}
