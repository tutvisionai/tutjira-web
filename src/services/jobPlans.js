import useApi from 'src/composables/UseApi';

export default function jobPlansService() {
  const { list, getById, post, update, remove } = useApi('jobPlans');

  return {
    list,
    getById,
    post,
    update,
    remove,
  };
}
