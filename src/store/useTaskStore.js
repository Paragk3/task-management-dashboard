import create from 'zustand';

const useTaskStore = create(Set => ({
    task:[],
    addTask: (task) => Set(state => ({task: [...state.task, task]})),
    updateTask: (id , task) => Set(state =>({
        task: state.task.map(t => t.id === id ? task : t)
    })),

    deleteTask: id => Set(state => ({
        task: state.task.filter(t => t.id !== id)
    })),    
}));
    

export default useTaskStore;