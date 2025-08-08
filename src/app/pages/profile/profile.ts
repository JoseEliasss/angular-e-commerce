import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile {
  profileForm: FormGroup;
  editMode = false;

  avatarDataUrl: string | null = null;

  constructor(private fb: FormBuilder) {
    const user = JSON.parse(localStorage.getItem('authState') || '{}');

    this.profileForm = this.fb.group({
      username: [user.username || '', Validators.required],
      email: [user.email || '', [Validators.required, Validators.email]],
    });

    this.profileForm.disable();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  saveChanges() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      localStorage.setItem('authState', JSON.stringify(updatedUser));
      this.toggleEdit();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarDataUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  initials(name: string | null | undefined): string {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase() || '').join('') || 'U';
  }
}
