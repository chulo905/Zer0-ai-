import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export async function getMaps() {
  const { data } = await api.get('/maps');
  return data;
}

export async function createMap(title) {
  const { data } = await api.post('/maps', { title });
  return data;
}

export async function getFullMap(mapId) {
  const { data } = await api.get(`/maps/${mapId}/full`);
  return data;
}

export async function createNode(mapId, payload) {
  const { data } = await api.post(`/maps/${mapId}/nodes`, payload);
  return data;
}

export async function updateNode(id, payload) {
  const { data } = await api.put(`/nodes/${id}`, payload);
  return data;
}

export async function deleteNode(id) {
  await api.delete(`/nodes/${id}`);
}

export async function getLinks(mapId) {
  const { data } = await api.get(`/maps/${mapId}/links`);
  return data;
}

export async function createLink(mapId, payload) {
  const { data } = await api.post(`/maps/${mapId}/links`, payload);
  return data;
}

export async function deleteLink(id) {
  await api.delete(`/links/${id}`);
}

// AI endpoints
export async function aiExpandNode({ title, content }) {
  const { data } = await api.post('/ai/expandNode', { title, content });
  return data.ideas;
}

export async function aiSummarizeNode({ title, content }) {
  const { data } = await api.post('/ai/summarizeNode', { title, content });
  return data.summary;
}

export async function aiSuggestRelated({ title, content }) {
  const { data } = await api.post('/ai/suggestRelatedNodes', { title, content });
  return data.suggestions;
}

export async function aiTextToMap({ text }) {
  const { data } = await api.post('/ai/textToMap', { text });
  return data;
}
