import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { TodoStore } from '../state/store';
import { TodoQuery } from '../state/query';
import { Router } from '@angular/router';
import { Todo, TodoStatus } from '../todo.model';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  form: FormGroup;

  constructor(private apiService: ApiService,
              private todoStore: TodoStore,
              private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  addTodo() {
    console.log(this.form.value);
    let todo: Todo = {
      id: 0,
      _id: '',
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      status: TodoStatus.OPEN
    };

    this.todoStore.setLoading(true);
    this.apiService.addTodo(todo).subscribe(res => {
      this.todoStore.update(state => {
        return {
          todos: [
            ...state.todos,
            res
          ]
        };
      });
      this.todoStore.setLoading(false);
      this.router.navigateByUrl('');
    });

  }

}
