import useApi from 'src/composables/UseApi';
import { api } from 'boot/axios';
import { Buffer } from 'buffer';

export default function ticketsService() {
  const endpoint = 'api/tickets';
  const { list, getById, post, update, remove } = useApi(endpoint);

  const addUserPatchTicket = async (form) => {
    try {
      const url = `${endpoint}`;
      const { data } = await api.patch(`${url}/${form.id}`, form);
      return data;
    } catch (error) {
      throw (new Error(error.message));
    }
  };

  const myTickets = async (id) => {
    try {
      const url = `${endpoint}`;
      // const { data } = await api.get(`${url}`);
      const { data } = await api.get(`${url}/?filter[collaborator_id]=${id}`);
      return data;
    } catch (error) {
      throw (new Error(error.message));
    }
  };

  const report = async (id) => {
    try {
      const response = await api.get(`${endpoint}/kanban/${id}`, { responseType: 'arraybuffer' })
        .then(response => Buffer.from(response.data, 'binary').toString('base64'));
      return `data:application/pdf;base64, ${response}`;
    } catch (error) {
      throw (new Error(error.message));
    }
  };

  return {
    addUserPatchTicket,
    report,
    myTickets,
    list,
    getById,
    post,
    update,
    remove,
  };
}
