import { LinkModel } from '../models/LinkModel.js';

export const linkService = {
  listLinks: (mapId) => LinkModel.getByMap(mapId),
  createLink: ({ map_id, source_node_id, target_node_id, relationship_type }) =>
    LinkModel.create({ map_id, source_node_id, target_node_id, relationship_type }),
  deleteLink: (id) => LinkModel.delete(id)
};
