import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    // add a task
    @UseGuards(JwtAuthGuard)
    @Post('/create')
    async addTask(@Res() res, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.addTask(createTaskDTO);
        return res.status(HttpStatus.OK).json({
            message: "Task has been created successfully",
            task
        })
    }

    // Retrieve task list
    @UseGuards(JwtAuthGuard)
    @Get('tasks')
    async getAllTasks(@Res() res) {
        const tasks = await this.taskService.getAllTasks();
        return res.status(HttpStatus.OK).json(tasks);
    }

    // Fetch a particular task using ID
    @UseGuards(JwtAuthGuard)
    @Get('task/:taskID')
    async getTask(@Res() res, @Param('taskID') taskID) {
        const task = await this.taskService.getTask(taskID); 
        if (!task) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json(task);
    }

    // Update a task's details
    @UseGuards(JwtAuthGuard)
    @Put('/update')
    async updateTask(@Res() res, @Query('taskID') taskID, @Body() createTaskDTO: CreateTaskDTO) {
        const task = await this.taskService.updateTask(taskID, createTaskDTO);
        if (!task) throw new NotFoundException('Task does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Task has been successfully updated',
            task
        });
    }

    // Delete a task
    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    async deleteTask(@Res() res, @Query('taskID') taskID) {
        const task = await this.taskService.deleteTask(taskID);
        if (!task) throw new NotFoundException('Task does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Task has been deleted',
            task
        })
    }
}

