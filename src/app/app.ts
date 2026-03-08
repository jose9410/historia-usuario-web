import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserStoryService, OutputFile } from './services/user-story';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private userStoryService = inject(UserStoryService);

  title = signal('Koncilia - Generador de Historias');
  isUploading = signal(false);
  result = signal<any>(null);
  outputFiles = signal<OutputFile[]>([]);

  ngOnInit() {
    this.loadOutputFiles();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isUploading.set(true);
      this.userStoryService.uploadVtt(file).subscribe({
        next: (response: any) => {
          this.result.set(response);
          this.isUploading.set(false);
          this.loadOutputFiles();
        },
        error: (err) => {
          console.error('Error al subir:', err);
          this.isUploading.set(false);
        }
      });
    }
  }

  loadOutputFiles() {
    this.userStoryService.getOutputs().subscribe({
      next: (files) => this.outputFiles.set(files),
      error: (err) => console.error('Error al cargar archivos:', err)
    });
  }

  downloadFile(fileName: string) {
    this.userStoryService.downloadFile(fileName);
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  }
}

