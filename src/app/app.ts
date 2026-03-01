import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserStoryService } from './services/user-story'; // <--- Verifica si el archivo termina en /user-story o /user-story.service

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private userStoryService = inject(UserStoryService);
  
  title = signal('Koncilia - Generador de Historias');
  isUploading = signal(false);
  result = signal<any>(null);

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading.set(true);
      this.userStoryService.uploadVtt(file).subscribe({
        next: (response: any) => {
          this.result.set(response);
          this.isUploading.set(false);
        },
        error: (err) => {
          console.error('Error al subir:', err);
          this.isUploading.set(false);
        }
      });
    }
  }
}
