import { Component, signal } from '@angular/core';
import { Layout } from "./shared/Component/layout/layout";
import { LoaderComponent } from "./shared/Component/loader/loader.component";

@Component({
  selector: 'app-root',
  imports: [Layout, LoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FactoryManagement');
}
