import { NodeModel } from '../models/NodeModel.js';

export const nodeService = {
  listNodes: (mapId) => NodeModel.getByMap(mapId),
  createNode: ({ map_id, title, content, x_position, y_position }) =>
    NodeModel.create({ map_id, title, content, x_position, y_position }),
  updateNode: (id, data) => NodeModel.update(id, data),
  deleteNode: (id) => NodeModel.delete(id)
};
