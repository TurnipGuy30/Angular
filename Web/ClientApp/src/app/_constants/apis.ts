export const apis = {
    todos: 'todos',

    getUpdateStatus: (id: number) => {
        return `todos/${id}/update-status`;
    }
};
