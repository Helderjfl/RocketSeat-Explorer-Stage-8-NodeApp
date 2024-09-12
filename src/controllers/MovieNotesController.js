import { AppError } from "../utils/AppError.js";
import { mysqlConnectionDBMovies } from "../database/mysql/index.js";
import connection from "../database/knex/index.js";
const knex = connection;

class MovieNotesController {
  /**
     * index = GET para listar vários registros
     * show = GET para listar um único registro
     * create = POST para criar um registro
     * update = PUT para atualizar um registro
     * delete = DELETE para deletar um registro
  */

  async create(req, res) {
    const { title, description, tags, rating } = req.body;
    const user_id = req.params.id;

    const [ note_id ] = await knex('movie_notes').insert({
      title, description, user_id, rating
    });

    const tagsInsert = tags.map(name => {
      return {
        note_id, name, user_id
      }
    })

    await knex('movie_tags').insert(tagsInsert);

    res.status(201).send({ "message": "Nota criada com sucesso", "note_id": note_id });
  }

  async show(req, res) {
    const id = req.params.id;

    const note = await knex('movie_notes').where({ id }).first();
    const tags = await knex('movie_tags').where({ note_id: id });

    res.status(200).send({ ...note, tags });
  }

  async delete(req, res) {
    const id = req.params.id;

    const results = await knex('movie_notes').where({ id }).delete();

    if (!results) {
      throw new AppError('Nota não encontrada', 404);
    }

    res.status(200).send({ "message": "Nota excluída com sucesso" });
  }

  async index(req, res) {
    const { user_id, title, tags } = req.query;

    let notes = null;

    if (tags){
      const filterTags = tags.split(',').map(tag => tag.trim());

      notes = await knex('movie_tags')
      .select([
        'movie_notes.id',
        'movie_notes.title',
        'movie_notes.user_id'
      ])
      .where('movie_notes.user_id', user_id)
      .whereILike('movie_notes.title', `%${title}%`)
      .whereIn('movie_tags.name', filterTags)
      .innerJoin('movie_notes', 'movie_notes.id', 'movie_tags.note_id')
      .orderBy('movie_notes.title');
    }else {
      notes = await knex('movie_notes')
      .where({ user_id })
      .whereILike('title', `%${title}%`)
      .orderBy('title');
    }

    const userTags = await knex('movie_tags').where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    })

    res.status(200).send({ notesWithTags });
  }
}

export { MovieNotesController };