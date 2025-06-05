import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=motoverse;'
    'Trusted_Connection=yes;'
)

class CadastrarUsuario:
    def __init__(self, CPF, Nome, Numero, Senha):
        self.CPF = CPF
        self.Nome = Nome
        self.Numero = Numero
        self.Senha = Senha
        self.Administrador = 0

    def to_dict(self):
        return {
            "CPF": self.CPF,
            "Nome": self.Nome,
            "Numero": self.Numero,
            "Senha": self.Senha,
            "Administrador": self.Administrador
        }

    def cadastrar(self):
        if not all([self.CPF, self.Nome, self.Numero, self.Senha]):
            return {"erro": "Todos os campos devem ser preenchidos. Tente novamente."}

        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO cadastro (CPF, Nome, Numero, Senha, Administrador) VALUES (?, ?, ?, ?, ?)",
                self.CPF, self.Nome, self.Numero, self.Senha, self.Administrador
            )
            conn.commit()
            return {"mensagem": "Usuário cadastrado com sucesso"}
        except Exception as e:
            return {"erro": str(e)}
        finally:
            cursor.close()
