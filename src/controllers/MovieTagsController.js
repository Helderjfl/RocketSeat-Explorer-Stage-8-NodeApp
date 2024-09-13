import { AppError } from "../utils/AppError.js";
import connection from "../database/knex/index.js";
const knex = connection;

class MovieTagsController {
  /**
   * index = GET para listar vários registros
   * show = GET para listar um único registro
   * create = POST para criar um registro
   * update = PUT para atualizar um registro
   * delete = DELETE para deletar um registro
  */

  async index(req, res) {
    const { user_id } = req.query;

    const tags = await knex('movie_tags').where({ user_id });

    res.status(200).send({'tags': tags});
  }
}

export { MovieTagsController };