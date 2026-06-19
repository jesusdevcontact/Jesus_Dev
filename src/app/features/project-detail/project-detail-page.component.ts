import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';

import { ProjectGalleryComponent } from '../../components/project-gallery/project-gallery.component';
import { projects } from '../../core/data/portfolio.content';
import { Project } from '../../core/models/portfolio.models';
import { TranslateArrayPipe } from '../../shared/pipes/translate-array.pipe';

@Component({
  selector: 'jd-project-detail-page',
  standalone: true,
  imports: [NgClass, RouterLink, LucideDynamicIcon, TranslatePipe, TranslateArrayPipe, ProjectGalleryComponent],
  templateUrl: './project-detail-page.component.html',
  styleUrl: './project-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly translate = inject(TranslateService);

  readonly projects = projects;
  readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug'))), { initialValue: null });
  readonly project = computed<Project | undefined>(() => projects.find((project) => project.slug === this.slug()));

  constructor() {
    const languageChanges = toSignal(this.translate.onLangChange.pipe(startWith(null)), { initialValue: null });

    effect(() => {
      languageChanges();
      const project = this.project();

      if (project) {
        this.updateSeo(project);
      }
    });
  }

  private updateSeo(project: Project): void {
    const title = this.translate.instant(`projects.items.${project.key}.seoTitle`);
    const description = this.translate.instant(`projects.items.${project.key}.seoDescription`);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
  }
}
