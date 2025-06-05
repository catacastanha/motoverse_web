import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=motoverse;'
    'Trusted_Connection=yes;'
)

class Login:
    def __init__(self, CPF, Nome, Numero, Senha, Administrador):
        self.CPF = CPF
        self.Nome = Nome
        self.Numero = Numero
        self.Senha = Senha
        self.Administrador = Administrador

    def to_dict(self):
        return {
            "CPF": self.CPF,
            "Nome": self.Nome,
            "Numero": self.Numero,
            "Senha": self.Senha,
            "Administrador": self.Administrador
        }
    
    def login(self):
        cursor = conn.cursor()
        cursor.execute("SELECT cpf, nome, numero, senha, administrador FROM cadastro WHERE CPF = ? AND Senha = ?", self.CPF, self.Senha)
        login = cursor.fetchone()
        cursor.close()
        if login:
            return {
                "CPF": login[0],
                "Nome": login[1],
                "Numero": login[2],
                "Administrador": login[3]
            }
        else:
            return {"erro": "Login ou senha incorretos"}
        


