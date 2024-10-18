document.getElementById('cep').addEventListener('blur', buscarCEP);

function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep !== '') {
        const validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!("erro" in data)) {
                        document.getElementById('rua').value = data.logradouro;
                        document.getElementById('bairro').value = data.bairro;
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                        ajustarTelefoneComDDD(data.localidade);
                    } else {
                        limparFormularioCEP();
                        alert("CEP não encontrado.");
                    }
                })
                .catch(error => alert("Erro ao consultar o CEP."));
        } else {
            limparFormularioCEP();
            alert("Formato de CEP inválido.");
        }
    } else {
        limparFormularioCEP();
    }
}

function limparFormularioCEP() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('telefone').placeholder = '(00) 99999-9999';
}

function ajustarTelefoneComDDD(cidade) {
    const ddds = {
        'São Paulo': '11',
        'Rio de Janeiro': '21',
        'Belo Horizonte': '31',
        // Adicione mais cidades e DDDs conforme necessário
    };
    const ddd = ddds[cidade] || '00';
    document.getElementById('telefone').value = `(${ddd}) `;
}

function limparFormulario() {
    document.getElementById('cadastroForm').reset();
    limparFormularioCEP();
}
