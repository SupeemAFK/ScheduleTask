import { Mutation, Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './models/task.model';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Resolver(of => Task)
export class TasksResolver {
    constructor (private readonly taskService: TasksService) {}

    @Query(returns => [Task])
    async getTasks() {
        const tasks = await this.taskService.getTasks();
        return tasks
    }

    @Query(returns => Task)
    async getTask(@Args('id') id: number) {
        const tasks = await this.taskService.getTask(id);
        return tasks
    }

    @Mutation(returns => Task)
    async createTask(@Args('newTodoData') newTaskData: CreateTaskDto) {
        const tasks = await this.taskService.createTask(newTaskData);
        return tasks
    }

    @Mutation(returns => Task)
    async updateTask(@Args('updateTodoData') updateTaskData: UpdateTaskDto) {
        const tasks = await this.taskService.updateTask(updateTaskData)
        return tasks
    }

    @Mutation(returns => Task)
    async deleteTask(@Args('id') id: number) {
        return await this.taskService.deleteTask(id)
    }

    @ResolveField()
    async links(@Parent() task: Task) {
        return await this.taskService.getTaskLinks(task.id);
    }
}
