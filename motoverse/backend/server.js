const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use('/images-estoque', express.static(path.join(__dirname, '../ui/public/images-estoque')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Usando path absoluto para garantir que a pasta existe
    const uploadDir = path.join(__dirname, '../ui/public/images-estoque');
    console.log('Diretório de upload:', uploadDir);
    
    if (!fs.existsSync(uploadDir)) {
      console.log('Criando diretório de upload...');
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Garantir que o nome do arquivo seja único
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Função para ler o db.json
function readDb() {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler db.json:', error);
    return { produtos: [], usuarios: [] };
  }
}

// Função para escrever no db.json
function writeDb(data) {
  try {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Erro ao escrever em db.json:', error);
    throw error;
  }
}

// Endpoint to handle product registration
app.post('/produtos', upload.single('imagem'), (req, res) => {
  console.log('Recebendo requisição de cadastro de produto');
  console.log('Body:', req.body);
  console.log('File:', req.file);

  try {
    if (!req.body.produto) {
      throw new Error('Dados do produto não recebidos');
    }

    if (!req.file) {
      throw new Error('Imagem não recebida');
    }

    const produto = JSON.parse(req.body.produto);
    const imagem = req.file;

    // Validar campos obrigatórios
    const camposObrigatorios = ['marca', 'modelo', 'ano', 'quilometragem', 'preco'];
    const camposFaltantes = camposObrigatorios.filter(campo => !produto[campo]);
    
    if (camposFaltantes.length > 0) {
      throw new Error(`Campos obrigatórios faltando: ${camposFaltantes.join(', ')}`);
    }

    // Ler o banco de dados atual
    const db = readDb();
    
    // Criar novo produto com ID e imagem
    const novoProduto = {
      id: db.produtos.length + 1,
      marca: produto.marca,
      modelo: produto.modelo,
      quantidade: produto.quantidade || 5,
      anoLancamento: produto.anoLancamento || 2025,
      descricao: produto.descricao,
      imagem: `/images-estoque/${imagem.filename}`,
      valor: Number(produto.preco),
      km: Number(produto.quilometragem)
    };

    // Adicionar ao array de produtos
    db.produtos.push(novoProduto);

    // Salvar no db.json
    writeDb(db);

    console.log('Produto cadastrado com sucesso:', novoProduto);
    res.json({
      success: true,
      message: 'Produto cadastrado com sucesso',
      produto: novoProduto
    });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erro ao cadastrar produto'
    });
  }
});

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  try {
    const db = readDb();
    res.json(db.produtos);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar produtos'
    });
  }
});

// Rota para obter produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const db = readDb();
    const produto = db.produtos.find(p => p.id === id);

    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar produto.' });
  }
});

// Rota para atualizar produto por ID
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let db = readDb();
    const index = db.produtos.findIndex(p => p.id === id);

    if (index !== -1) {
      db.produtos[index] = { ...db.produtos[index], ...req.body, id: id };
      writeDb(db);
      res.json({ success: true, message: 'Produto atualizado com sucesso.', produto: db.produtos[index] });
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar produto.' });
  }
});

// Rota para atualizar parcialmente produto por ID (PATCH for partial updates)
app.patch('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let db = readDb();
    const index = db.produtos.findIndex(p => p.id === id);

    if (index !== -1) {
      db.produtos[index] = { ...db.produtos[index], ...req.body, id: id };
      writeDb(db);
      res.json({ success: true, message: 'Produto atualizado com sucesso (PATCH). ', produto: db.produtos[index] });
    } else {
      res.status(404).json({ success: false, message: 'Produto não encontrado para PATCH.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar produto (PATCH):', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar produto (PATCH).' });
  }
});

// Rota para deletar produto por ID
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let db = readDb();
    const initialLength = db.produtos.length;
    let imageToDelete;
    db.produtos = db.produtos.filter(produto => {
      if (produto.id === id) {
        imageToDelete = produto.imagem;
        return false;
      }
      return true;
    });

    if (db.produtos.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Produto não encontrado.' });
    }

    if (imageToDelete) {
      const imagePath = path.join(__dirname, '../ui/public', imageToDelete);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log('Imagem excluída do sistema de arquivos:', imagePath);
      } else {
        console.warn('Imagem não encontrada no sistema de arquivos:', imagePath);
      }
    }

    writeDb(db);
    res.json({ success: true, message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ success: false, message: 'Erro ao deletar produto.' });
  }
});

// Rota para listar usuários
app.get('/usuarios', (req, res) => {
  try {
    const db = readDb();
    res.json(db.usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao listar usuários'
    });
  }
});

// Rota para obter usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const db = readDb();
    const usuario = db.usuarios.find(u => u.id === id);

    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar usuário.' });
  }
});

// Rota para cadastrar novo usuário
app.post('/usuarios', (req, res) => {
  console.log('Recebendo requisição de cadastro de usuário');
  console.log('Body:', req.body);

  try {
    if (!req.body.nome || !req.body.cpf || !req.body.celular || !req.body.senha) {
      throw new Error('Dados do usuário incompletos.');
    }

    const db = readDb();
    const novoUsuario = {
      id: db.usuarios.length ? Math.max(...db.usuarios.map(u => u.id)) + 1 : 1,
      nome: req.body.nome,
      cpf: req.body.cpf,
      celular: req.body.celular,
      senha: req.body.senha,
      tipo: req.body.tipo || 'usuario' // Default to 'usuario' if not provided
    };

    db.usuarios.push(novoUsuario);
    writeDb(db);

    console.log('Usuário cadastrado com sucesso:', novoUsuario);
    res.json({
      success: true,
      message: 'Usuário cadastrado com sucesso',
      usuario: novoUsuario
    });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Erro ao cadastrar usuário'
    });
  }
});

// Rota para atualizar usuário por ID
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let db = readDb();
    const index = db.usuarios.findIndex(u => u.id === id);

    if (index !== -1) {
      db.usuarios[index] = { ...db.usuarios[index], ...req.body, id: id };
      writeDb(db);
      res.json({ success: true, message: 'Usuário atualizado com sucesso.', usuario: db.usuarios[index] });
    } else {
      res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar usuário.' });
  }
});

// Rota para deletar usuário por ID
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    let db = readDb();
    const initialLength = db.usuarios.length;
    db.usuarios = db.usuarios.filter(u => u.id !== id);

    if (db.usuarios.length === initialLength) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
    }

    writeDb(db);
    res.json({ success: true, message: 'Usuário excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro ao deletar usuário.' });
  }
});

// Rota para login
app.post('/login', (req, res) => {
  console.log('Recebendo requisição de login');
  const { cpf, senha } = req.body;

  try {
    const db = readDb();
    const usuario = db.usuarios.find(u => u.cpf === cpf && u.senha === senha);

    if (usuario) {
      res.json({ success: true, message: 'Login bem-sucedido!', usuario: usuario });
    } else {
      res.status(401).json({ success: false, message: 'CPF ou senha inválidos.' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ success: false, message: 'Erro ao tentar fazer login.' });
  }
});

app.get('/', (req, res) => {
  res.send('Servidor Motoverse rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
}); 