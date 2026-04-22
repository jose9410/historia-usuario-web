import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OutputFile {
  name: string;
  size: number;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStoryService { 
  private http = inject(HttpClient);
  private apiUrl = '/api/HistoriaUsuario';

  uploadVtt(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/upload-vtt`, formData);
  }

  getOutputs(): Observable<OutputFile[]> {
    return this.http.get<OutputFile[]>(`${this.apiUrl}/outputs`);
  }

  downloadFile(fileName: string): void {
    window.open(`${this.apiUrl}/outputs/${encodeURIComponent(fileName)}`, '_blank');
  }
}

