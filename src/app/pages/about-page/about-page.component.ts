import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  // private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if(isPlatformBrowser(this.platform)) {
    //   document.title = 'New Title'
    // }
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'About Page Description' });
    this.meta.updateTag({ name: 'og:title', content: 'Page Title' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Mariano, Salvini' });
  }
}
