import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { buildContactMailto } from '../../core/utils/contact-mailto';

@Component({
  selector: 'jd-contact-page',
  standalone: true,
  imports: [FormsModule, LucideDynamicIcon, RouterLink, TranslatePipe],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  readonly fallbackMailto = buildContactMailto();
  readonly githubUrl = 'https://github.com/jesusdev98';
  readonly linkedinUrl = 'https://linkedin.com/in/jesus-martinez-escobar-223722374';

  name = '';
  company = '';
  subject = '';
  message = '';

  mailtoHref(): string {
    const subject = this.subject.trim() || 'Consulta profesional - Jesus Martinez Escobar';
    const body = [
      'Buenas,',
      '',
      'Me pongo en contacto contigo desde tu portfolio.',
      '',
      `Nombre: ${this.name.trim()}`,
      `Empresa: ${this.company.trim()}`,
      'Mensaje:',
      this.message.trim(),
      '',
    ].join('\n');

    return buildContactMailto(subject, body);
  }
}
