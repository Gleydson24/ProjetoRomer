from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "segredo"

usuarios = []
tarefas = []

# HOME
@app.route('/')
def index():
    return render_template("index.html")

# CADASTRO
@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        nome = request.form.get('nome')
        senha = request.form.get('senha')

        # evitar usuário duplicado
        for user in usuarios:
            if user['nome'] == nome:
                return render_template("cadastro.html", erro="Usuário já existe!")

        usuarios.append({
            "nome": nome,
            "senha": senha
        })

        return redirect(url_for('login'))

    return render_template("cadastro.html")

# LOGIN
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        nome = request.form.get('nome')
        senha = request.form.get('senha')

        for user in usuarios:
            if user['nome'] == nome and user['senha'] == senha:
                session['user'] = nome
                return redirect(url_for('dashboard'))

        return render_template("login.html", erro="Login inválido!")

    return render_template("login.html")

# LOGOUT
@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('login'))

# DASHBOARD
@app.route('/dashboard')
def dashboard():
    if 'user' not in session:
        return redirect(url_for('login'))

    return render_template("dashboard.html", tarefas=tarefas)

# ADICIONAR TAREFA
@app.route('/add', methods=['GET', 'POST'])
def add_tarefa():
    if request.method == 'POST':
        titulo = request.form['titulo']

        tarefas.append({"id": len(tarefas), "titulo": titulo})
        return redirect(url_for('dashboard'))

    return render_template("add_tarefa.html")

# REMOVER
@app.route('/delete/<int:id>')
def delete(id):
    global tarefas
    tarefas = [t for t in tarefas if t['id'] != id]
    return redirect(url_for('dashboard'))

# EDITAR
@app.route('/edit/<int:id>', methods=['GET', 'POST'])
def edit(id):
    tarefa = next((t for t in tarefas if t['id'] == id), None)

    if request.method == 'POST':
        tarefa['titulo'] = request.form['titulo']
        return redirect(url_for('dashboard'))

    return render_template("add_tarefa.html", tarefa=tarefa)

app.run(debug=True)