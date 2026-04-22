import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessService } from '../../services/process.service';
import {
  AplicacionCatalog,
  SubProceso,
  ProcessStartRequest,
  JobState,
  JobStatus,
  STATUS_INFO
} from '../../models/process.models';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-qa-automation',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule
  ],
  templateUrl: './qa-automation.component.html',
  styleUrls: ['./qa-automation.component.css']
})
export class QaAutomationComponent implements OnInit, OnDestroy {
  private processService = inject(ProcessService);
  private cdr = inject(ChangeDetectorRef);
  private pollSub?: Subscription;

  // --- Catálogo de la API ---
  catalogoAplicaciones: AplicacionCatalog[] = [];
  subProcesosDisponibles: SubProceso[] = [];
  catalogoLoading = true;

  // --- Selecciones del usuario ---
  aplicacionSeleccionada: string = '';

  // --- Estado de la UI ---
  isSubmitting = false;
  jobId: string | null = null;
  jobState: JobState | null = null;
  errorMessage: string | null = null;

  // --- Pasos del proceso (para timeline) ---
  readonly steps: { status: JobStatus; label: string; icon: string }[] = [
    { status: 'Iniciando',           label: 'Navigate',         icon: '🌐' },
    { status: 'LanzandoReproceso',   label: 'Date & Process',   icon: '📅' },
    { status: 'MonitoreandoTablero', label: 'Start',            icon: '🚀' },
    { status: 'Completado',          label: 'Completed',        icon: '✅' }
  ];

  readonly statusInfo = STATUS_INFO;

  ngOnInit(): void {
    this.processService.getCatalog().subscribe({
      next: (apps) => {
        this.catalogoAplicaciones = apps;
        if (apps.length > 0) {
          this.subProcesosDisponibles = apps[0].subProcesos;
          this.aplicacionSeleccionada = apps[0].nombre;
        }
        this.catalogoLoading = false;
      },
      error: () => {
        this.catalogoLoading = false;
        this.errorMessage = "No se pudo conectar con el motor de automatización.";
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.jobState = null;
    this.isSubmitting = true;

    console.log('🚀 Starting process for:', this.aplicacionSeleccionada);

    const request: ProcessStartRequest = {
      nombreAplicacion: this.aplicacionSeleccionada
    };

    // Rescue Timer: If the proxy hangs, we force a manual check after 5s
    const rescueTimer = setTimeout(() => {
      if (this.isSubmitting && !this.jobId) {
        console.warn('⚠️ Request taking too long. Attempting to recover...');
        // We don't have the ID yet, but we'll stop the spinner so the user can see if something happened
        this.isSubmitting = false;
        this.errorMessage = "The server is taking too long to respond, but the process might have started. Please refresh the page or wait a moment.";
        this.cdr.detectChanges(); // Force UI update
      }
    }, 6000);

    this.processService.startProcess(request).subscribe({
      next: (response) => {
        clearTimeout(rescueTimer);
        console.log('✅ Job started:', response.jobId);
        this.jobId = response.jobId;
        this.isSubmitting = false;
        this.startPolling(response.jobId);
        this.cdr.detectChanges(); // Force UI update
      },
      error: (err) => {
        clearTimeout(rescueTimer);
        console.error('❌ Error starting process:', err);
        this.isSubmitting = false;
        this.errorMessage = err.error?.error || err.message || 'Error starting the process';
        this.cdr.detectChanges(); // Force UI update
      }
    });
  }

  private startPolling(jobId: string): void {
    this.pollSub?.unsubscribe();
    this.pollSub = this.processService.pollStatus(jobId).subscribe({
      next: (state) => { 
        this.jobState = state; 
        this.cdr.detectChanges(); // <--- Guarantee UI updates with every ping!
      },
      error: (err) => {
        this.errorMessage = 'Error al consultar estado: ' + (err.message || 'desconocido');
        this.cdr.detectChanges();
      }
    });
  }

  resetForm(): void {
    this.pollSub?.unsubscribe();
    this.jobId = null;
    this.jobState = null;
    this.errorMessage = null;
    this.isSubmitting = false;
  }

  getCurrentStepIndex(): number {
    if (!this.jobState) return -1;
    return this.steps.findIndex(s => s.status === this.jobState!.status);
  }

  isStepCompleted(index: number): boolean {
    const current = this.getCurrentStepIndex();
    return current > index || this.jobState?.status === 'Completado';
  }

  isStepActive(index: number): boolean {
    return this.getCurrentStepIndex() === index;
  }

  getDuration(): string {
    if (!this.jobState) return '';
    const start = new Date(this.jobState.iniciadoEn);
    const end = this.jobState.finalizadoEn ? new Date(this.jobState.finalizadoEn) : new Date();
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000);
    const min = Math.floor(diff / 60);
    const sec = diff % 60;
    return min > 0 ? `${min}m ${sec}s` : `${sec}s`;
  }

  getDurationMinutos(): string {
    if (!this.jobState) return '0.0m';
    const start = new Date(this.jobState.iniciadoEn);
    const end = this.jobState.finalizadoEn ? new Date(this.jobState.finalizadoEn) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const min = diffMs / 60000;
    return min.toFixed(1) + 'm';
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }
}
