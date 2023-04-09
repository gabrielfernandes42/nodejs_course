const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  // * validação do username e do password
  if (!user || !pwd)
    return res
      .status(400)
      .json({ mensagem: "Username e password são obrigatórios" });
  // * verifica se o usuário existe
  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // * Não autorizado!
  // * verifica se a senha é a mesma
  const match = await bcrypt.compare(pwd, foundUser.password);
  console.log(match)
  if (match) {
    // * aqui é onde é criado o JWTs para protejer as rotas
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
