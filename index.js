import express, { response } from 'express';

const host = '0.0.0.0';
const port = 3000;
const app = express();

var listacadastros = [];

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.write(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Menu do sistema</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>`);

        res.write(`
                                <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">GOGREEN</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      
    <a class="nav-item nav-link active" href="/login">Login<span class="sr-only"></span></a>
      <a class="nav-item nav-link" href="/cadastro">Cadastro</a>
      <a class="nav-item nav-link" href="/cadastros">Cadastrados</a>
      <a class="nav-item nav-link active" href="/sair">Sair<span class="sr-only"></span></a>
   </div>
  </div>
</nav>
            `);

        res.write(`
            
      
        </body>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
        </html>`);

    res.end();
});


// FORMULÁRIO
app.get('/cadastro', (req, res) => {
    res.send(`
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro</title> 
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
            <form method="POST" action="/cadastro" class="row g-3">

                <div class="col-md-4">
                    <label class="form-label">Primeiro Nome</label>
                    <input type="text" class="form-control" name="primeiroNome">
                </div>

                <div class="col-md-4">
                    <label class="form-label">Sobrenome</label>
                    <input type="text" class="form-control" name="sobrenome">
                </div>

                <div class="col-md-4">
                    <label class="form-label">Nome de Usuário</label>
                    <input type="text" class="form-control" name="nomeUsuario">
                </div>

                <div class="col-md-6">
                    <label class="form-label">Cidade</label>
                    <input type="text" class="form-control" name="cidade">
                </div>

                <div class="col-md-3">
                    <label class="form-label">Estado</label>
                    <input type="text" class="form-control" name="estado">
                </div>

                <div class="col-md-3">
                    <label class="form-label">CEP</label>
                    <input type="text" class="form-control" name="cep">
                </div>

                <div class="col-12">
                    <input type="checkbox" name="termos"> Aceito os termos
                </div>

                <div class="col-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </div>

            </form>

            <br>
            <a href="/cadastros" class="btn btn-secondary">Ver Cadastros</a>
        </div>
        </body>
        </html>
    `);
});


// POST
app.post('/cadastro', (req, res) => {

const {primeiroNome, sobrenome, nomeUsuario, cidade, estado, cep, termos} = req.body;

if(!primeiroNome || !sobrenome || !nomeUsuario || !cidade || !estado || !cep || !termos){

let html = `<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Cadastro</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
<div class="container mt-5">
<form method="POST" action="/cadastro" class="row g-3">

<div class="col-md-4">
<label class="form-label">Primeiro Nome</label>
<input type="text" class="form-control" name="primeiroNome" value="${primeiroNome}">`;

if(!primeiroNome){
html += `<div class="alert alert-warning">Informe o primeiro nome!</div>`;
}

html += `</div>

<div class="col-md-4">
<label class="form-label">Sobrenome</label>
<input type="text" class="form-control" name="sobrenome" value="${sobrenome}">`;

if(!sobrenome){
html += `<div class="alert alert-warning">Informe o sobrenome!</div>`;
}

html += `</div>

<div class="col-md-4">
<label class="form-label">Nome de Usuário</label>
<input type="text" class="form-control" name="nomeUsuario" value="${nomeUsuario}">`;

if(!nomeUsuario){
html += `<div class="alert alert-warning">Informe o nome de usuário!</div>`;
}

html += `</div>

<div class="col-md-6">
<label class="form-label">Cidade</label>
<input type="text" class="form-control" name="cidade" value="${cidade}">`;

if(!cidade){
html += `<div class="alert alert-warning">Informe a cidade!</div>`;
}

html += `</div>

<div class="col-md-3">
<label class="form-label">Estado</label>
<input type="text" class="form-control" name="estado" value="${estado}">`;

if(!estado){
html += `<div class="alert alert-warning">Informe o estado!</div>`;
}

html += `</div>

<div class="col-md-3">
<label class="form-label">CEP</label>
<input type="text" class="form-control" name="cep" value="${cep}">`;

if(!cep){
html += `<div class="alert alert-warning">Informe o CEP!</div>`;
}

html += `</div>

<div class="col-12">
<input type="checkbox" name="termos" value="Sim" ${termos ? "checked" : ""}>`;

if(!termos){
html += ` required`;
}

html += `> Aceito os termos
</div>

<div class="col-12">
<button class="btn btn-primary" type="submit">Enviar</button>
</div>

</form>

<br>
<a href="/cadastros" class="btn btn-secondary">Ver Cadastros</a>

</div>
</body>
</html>`;

res.send(html);

}

else{

const cadastro = {
nome: primeiroNome,
sobrenome: sobrenome,
nomeUsuario: nomeUsuario,
cidade: cidade,
estado: estado,
cep: cep,
termos: "Sim"
};

listacadastros.push(cadastro);

res.redirect('/cadastros');

}

});


// LISTA
app.get('/cadastros', (req, res) => {

let tabela = `
<!doctype html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Lista de Cadastros</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
<div class="container mt-5">

<table class="table table-striped">

<thead>
<tr>
<th>ID</th>
<th>Nome</th>
<th>Sobrenome</th>
<th>Usuário</th>
<th>Cidade</th>
<th>Estado</th>
<th>CEP</th>
<th>Termos</th>
</tr>
</thead>

<tbody>
`;

for (let i = 0; i < listacadastros.length; i++) {

const c = listacadastros[i];

tabela += `
<tr>
<td>${i + 1}</td>
<td>${c.nome}</td>
<td>${c.sobrenome}</td>
<td>${c.nomeUsuario}</td>
<td>${c.cidade}</td>
<td>${c.estado}</td>
<td>${c.cep}</td>
<td>${c.termos}</td>
</tr>
`;

}

tabela += `
</tbody>
</table>

<a href="/cadastro" class="btn btn-primary">Novo Cadastro</a>

</div>
</body>
</html>
`;

res.send(tabela);

});
app.get("/login", (req, res) => {
res.send(`

<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>Login</title>  
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
        <section class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-5 text-center">

                    <div class="mb-md-5 mt-md-4 pb-5">

                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-white-50 mb-5">Por favor, entre com sua conta</p>

                    <div data-mdb-input-init class="form-outline form-white mb-4">
                        <input type="email" id="typeEmailX" class="form-control form-control-lg" />
                        <label class="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div data-mdb-input-init class="form-outline form-white mb-4">
                        <input type="password" id="typePasswordX" class="form-control form-control-lg" />
                        <label class="form-label" for="typePasswordX">Senha</label>
                    </div>

                    <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Esqueceu a senha ?</a></p>

                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                                      </div>

                    <div>
                    <p class="mb-0">Esqueceu a senha?</p>
                   <a href="#!" class="text-white-50 fw-bold">Sign Up</a>
                    </p>
                    </div>

                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
</body>
</html>  

`);
});


app.listen(port, host, () => {
console.log(`Servidor rodando em http://${host}:${port}`);
});