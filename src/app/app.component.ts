import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DragulaService } from 'ng2-dragula';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drag-drop';
  posts = new FormArray([]);
  constructor(
    private http: HttpClient,
    private dragulaService: DragulaService
  ) {
    this.http
      .get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((posts: Post[]) =>
        posts.splice(0, 20).forEach(post =>
          this.posts.push(
            new FormGroup({
              id: new FormControl(post.id),
              title: new FormControl(post.title)
            })
          )
        )
      );
    this.dragulaService.drop.subscribe(value => {
      const [
        el,
        container,
        container2,
        nextElement
      ]: HTMLElement[] = value.splice(1);
      console.log(el, nextElement.attributes.getNamedItem('id'));
      console.log(this.posts.controls);
      this.posts.controls.forEach((control, index) =>
        control.get('id').setValue(index + 1)
      );
    });
  }
}
