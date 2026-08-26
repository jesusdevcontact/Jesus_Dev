import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';

import { SeoService } from '../../core/seo/seo.service';
import { ContactPageComponent } from './contact-page.component';

describe('ContactPageComponent mailto', () => {
  const emailTranslations = {
    es: {
      defaultSubject: 'Proyecto ES',
      greeting: 'Buenas,',
      messageIntro: 'Mensaje ES',
      nameLine: 'Nombre: {{ value }}',
      companyLine: 'Empresa: {{ value }}',
      messageLabel: 'Mensaje:',
    },
    en: {
      defaultSubject: 'Project EN',
      greeting: 'Hello,',
      messageIntro: 'Message EN',
      nameLine: 'Name: {{ value }}',
      companyLine: 'Company: {{ value }}',
      messageLabel: 'Message:',
    },
    fr: {
      defaultSubject: 'Projet FR',
      greeting: 'Bonjour,',
      messageIntro: 'Message FR',
      nameLine: 'Nom : {{ value }}',
      companyLine: 'Entreprise : {{ value }}',
      messageLabel: 'Message :',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactPageComponent],
      providers: [
        provideTranslateService({ fallbackLang: 'es', lang: 'es' }),
        {
          provide: SeoService,
          useValue: { update: vi.fn(), removeJsonLd: vi.fn() },
        },
      ],
    });
    TestBed.overrideComponent(ContactPageComponent, { set: { imports: [], template: '' } });
  });

  afterEach(() => TestBed.resetTestingModule());

  it.each(['es', 'en', 'fr'] as const)('builds the draft in %s', (language) => {
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(language, { contactPage: { email: emailTranslations[language] } });
    translate.use(language).subscribe();
    const component = TestBed.createComponent(ContactPageComponent).componentInstance;
    const mailto = decodeURIComponent(component.mailtoHref());

    expect(mailto).toContain(`subject=${emailTranslations[language].defaultSubject}`);
    expect(mailto).toContain(emailTranslations[language].greeting);
    expect(mailto).toContain(emailTranslations[language].messageIntro);
  });
});
