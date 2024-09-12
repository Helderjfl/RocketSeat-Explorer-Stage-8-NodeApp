import { AppError } from "../utils/AppError.js";
import { mysqlConnectionDBMovies } from "../database/mysql/index.js";
import { hash, compare } from "bcrypt";

class UsersController {
  /**
     * index = GET para listar vários registros
     * show = GET para listar um único registro
     * create = POST para criar um registro
     * update = PUT para atualizar um registro
     * delete = DELETE para deletar um registro
  */

  async index(req, res) {
    const database = await mysqlConnectionDBMovies();
    const [users] = await database.query('SELECT * FROM users');

    res.status(200).send({"Users": users});
  }

  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await mysqlConnectionDBMovies();
    const [ checkIfExists ] = await database.query('SELECT * FROM users WHERE email = ?', [email])

    if (checkIfExists.length) {
      throw new AppError('User already exists', 400);
    }

    const passwordHash = await hash(password, 8);

    await database.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, passwordHash]);

    res.status(201).send({ "message": "Usuário criado com sucesso", "user": { name, email } });
  }

  async update(req, res) {
    const { id } = req.params
    const { name, email, password, oldPassword } = req.body

    const database = await mysqlConnectionDBMovies()
    const [ checkIfExists ] = await database.query('SELECT * FROM users WHERE id = ?', [id])

    const user = checkIfExists[0]

    if (!user) {
        throw new AppError("Usuário não existe", 400)
    }

    user.name = name ?? user.name // Se name for undefined, mantém o valor atual
    user.email = email ?? user.email
    
    const [ userWithUpdatedEmail ] = await database.query('SELECT * FROM users WHERE email = ?', [email])

    if (userWithUpdatedEmail.length > 0 && userWithUpdatedEmail[0].id !== id) {
        throw new AppError("Email já está em uso", 400)
    }

    if (password && !oldPassword) {
        throw new AppError("Você precisa informar a senha antiga", 400)
    }

    if (password && oldPassword) {
        const checkOldPassword = await compare(oldPassword, user.password)

        if (!checkOldPassword) {
            throw new AppError("Senha antiga incorreta", 400)
        }

        const passwordHash = await hash(password, 8)
        user.password = passwordHash
    }

    await database.execute(
        `UPDATE users SET name = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?`, 
        [user.name, user.email, user.password, id]
    )
    .finally(() => {
        database.end()
    })

    res.status(200).send({ 
        "message": "Usuário atualizado com sucesso", "user": { name: user.name, email: user.email } 
    })
  }
}

export { UsersController };