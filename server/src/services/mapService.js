import { MapModel } from '../models/MapModel.js';

export const mapService = {
  listMaps: () => MapModel.getAll(),
  getMap: (id) => MapModel.getById(id),
  createMap: ({ title }) => MapModel.create({ title }),
  updateMap: (id, { title }) => MapModel.update(id, { title }),
  deleteMap: (id) => MapModel.delete(id)
};
