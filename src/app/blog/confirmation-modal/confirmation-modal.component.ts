import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  @Input() title: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancelModal = new EventEmitter<void>();

  confirmDelete() {
    this.confirm.emit();
  }

  cancel() {
    this.cancelModal.emit();
  }
}
