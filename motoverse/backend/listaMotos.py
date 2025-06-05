import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=motoverse;'
    'Trusted_Connection=yes;'
)

class Moto:
    def __init__(self, ID, Quantidade, Ano_Lancamento, Descricao, Imagem, Valor, Km):
        self.ID = ID
        self.Quantidade = Quantidade
        self.Ano_Lancamento = Ano_Lancamento
        self.Descricao = Descricao
        self.Imagem = Imagem
        self.Valor = Valor
        self.Km = Km

    def to_dict(self):
        return {
            "ID": self.ID,
            "Quantidade": self.Quantidade,
            "Ano_Lancamento": self.Ano_Lancamento,
            "Descricao": self.Descricao,
            "Imagem": self.Imagem,
            "Valor": self.Valor,
            "Km": self.Km
        }

def listar_motos():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos")
    motos = []
    for row in cursor.fetchall():
        moto = Moto(
            ID=row[0],
            Quantidade=row[1],
            Ano_Lancamento=row[2],
            Descricao=row[3],
            Imagem=row[4],
            Valor=row[5],
            Km=row[6]
        )
        motos.append(moto.to_dict())
    cursor.close()
    return motos
