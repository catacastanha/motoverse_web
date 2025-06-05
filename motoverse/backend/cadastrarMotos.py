import pyodbc

conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=localhost\\SQLEXPRESS;'
    'DATABASE=motoverse;'
    'Trusted_Connection=yes;'
)

class CadastrarMotos:
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
    
    def cadastrarMotos(self):
        if not all([self.ID, self.Quantidade, self.Ano_Lancamento, self.Descricao, self.Imagem, self.Valor, self.Km]):
            return {"erro": "Todos os campos devem ser preenchidos. Tente novamente."}
        cursor = conn.cursor()
        cursor.execute("INSERT INTO produtos (ID, Quantidade, Ano_Lancamento, Descricao, Imagem, Valor, Km) VALUES (?, ?, ?, ?, ?, ?, ?)", self.ID, self.Quantidade, self.Ano_Lancamento, self.Descricao, self.Imagem, self.Valor, self.Km)
        conn.commit()
        cursor.close()
        return {"mensagem": "Moto cadastrada com sucesso"}
    

    
    
    
