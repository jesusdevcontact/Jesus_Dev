import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateArray',
  standalone: true,
})
export class TranslateArrayPipe implements PipeTransform {
  transform(value: unknown): string[] {
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  }
}
