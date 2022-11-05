import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  template: `<span class="content">{{ content }}</span>`,
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent implements OnInit {
  @Input() content!: string | number;
  @Input() color = '#3d5afe';

  @HostBinding('style.backgroundColor') backgroundColor = this.color;

  ngOnInit(): void {
    this.backgroundColor = this.color;
  }
}
