from flask import Flask, jsonify, request
from flask_cors import CORS
from listaMotos import listar_motos
from cadastrarUsuario import CadastrarUsuario
from login import Login

app = Flask(__name__)
CORS(app)

@app.route('/motos', methods=['GET'])
def get_motos():
    motos = listar_motos()
    return jsonify(motos)

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    login = Login(data['CPF'], '', '', data['Senha'], 0)
    return jsonify(login.login())

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    data = request.json
    cadastro = CadastrarUsuario(data['CPF'], data['Nome'], data['Numero'], data['Senha'])
    return jsonify(cadastro.cadastrar())

if __name__ == '__main__':
    app.run(debug=True)
