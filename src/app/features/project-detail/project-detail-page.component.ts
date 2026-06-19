import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';

import { ProjectGalleryComponent } from '../../components/project-gallery/project-gallery.component';
import { projects } from '../../core/data/portfolio.content';
import { Project } from '../../core/models/portfolio.models';
import { SeoService } from '../../core/seo/seo.service';
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
  private readonly seo = inject(SeoService);
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
    const path = `/projects/${project.slug}`;
    const image = project.coverImage ? this.seo.absoluteAsset(project.coverImage.src) : undefined;

    this.seo.update({
      title,
      description,
      path,
      image,
      imageAlt: project.coverImage?.alt ?? this.translate.instant('seo.imageAlt'),
      type: 'article',
      locale: this.localeFor(this.translate.currentLang),
    });
    this.seo.removeJsonLd('profile');
    this.seo.setJsonLd('project', {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${this.seo.absoluteUrl(path)}#project`,
      name: project.name,
      description,
      url: this.seo.absoluteUrl(path),
      image,
      creator: {
        '@type': 'Person',
        '@id': 'https://jesusdev.dev/#jesus-martinez-escobar',
        name: 'Jesús Martínez Escobar',
        url: 'https://jesusdev.dev/',
      },
      keywords: project.stack.join(', '),
      sameAs: [project.demoUrl, project.githubUrl].filter((url): url is string => Boolean(url)),
      mainEntityOfPage: this.seo.absoluteUrl(path),
    });
  }

  private localeFor(language: string): string {
    const locales: Record<string, string> = {
      es: 'es_ES',
      en: 'en_US',
      fr: 'fr_FR',
    };

    return locales[language] ?? 'es_ES';
  }
}
