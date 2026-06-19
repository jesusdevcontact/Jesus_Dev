import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

type OgType = 'profile' | 'website' | 'article';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  type?: OgType;
  image?: string;
  imageAlt?: string;
  locale?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly origin = 'https://jesusdev.dev';
  private readonly defaultImage = `${this.origin}/assets/img/og-image.jpg`;

  update(config: SeoConfig): void {
    const url = this.absoluteUrl(config.path);
    const image = config.image ?? this.defaultImage;
    const imageAlt = config.imageAlt ?? 'Vista previa del portfolio de Jesús Martínez Escobar';

    this.title.setTitle(config.title);
    this.setCanonical(url);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.meta.updateTag({ property: 'og:site_name', content: 'Jesús Martínez Escobar | Jesus Dev' });
    this.meta.updateTag({ property: 'og:locale', content: config.locale ?? 'es_ES' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image:alt', content: imageAlt });
  }

  setJsonLd(id: string, value: unknown): void {
    const scriptId = `json-ld-${id}`;
    let script = this.document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = this.document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }

    script.text = JSON.stringify(value);
  }

  removeJsonLd(id: string): void {
    this.document.getElementById(`json-ld-${id}`)?.remove();
  }

  absoluteUrl(path: string): string {
    return path === '/' ? `${this.origin}/` : `${this.origin}${path}`;
  }

  absoluteAsset(path: string): string {
    return `${this.origin}/${path.replace(/^\//, '')}`;
  }

  private setCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = url;
  }
}
