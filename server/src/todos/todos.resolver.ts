import { Mutation, Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.model';
import { CreateTodoDto } from './dto/createTodoDto';
import { UpdateTodoDto } from './dto/updateTodoDto';

@Resolver(of => Todo)
export class TodosResolver {
    constructor (private readonly todoService: TodosService) {}

    @Query(returns => [Todo])
    async getTodos() {
        const todos = await this.todoService.getTodos();
        return todos
    }

    @Query(returns => Todo)
    async getTodo(@Args('id') id: number) {
        const todo = await this.todoService.getTodo(id);
        return todo
    }

    @Mutation(returns => Todo)
    async createTodo(@Args('newTodoData') newTodoData: CreateTodoDto) {
        const todo = await this.todoService.createTodo(newTodoData);
        return todo
    }

    @Mutation(returns => Todo)
    async updateTodo(@Args('updateTodoData') updateTodoData: UpdateTodoDto) {
        const todo = await this.todoService.updateTodo(updateTodoData)
        return todo
    }

    @Mutation(returns => Todo)
    async deleteTodo(@Args('id') id: number) {
        return await this.todoService.deleteTodo(id)
    }
}
