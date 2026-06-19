import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideDynamicIcon } from '@lucide/angular';
import { TranslatePipe } from '@ngx-translate/core';

import { Project } from '../../core/models/portfolio.models';
import { ProjectGalleryComponent } from '../project-gallery/project-gallery.component';

@Component({
  selector: 'jd-project-card',
  standalone: true,
  imports: [NgClass, RouterLink, LucideDynamicIcon, TranslatePipe, ProjectGalleryComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
