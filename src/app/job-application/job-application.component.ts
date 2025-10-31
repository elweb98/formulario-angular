import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss']
})
export class JobApplicationComponent {
  form: FormGroup;
  currentStep = 1;
  showSummary = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      basic: this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
      }),
      professional: this.fb.group({
        position: ['', Validators.required],
        salaryExpectation: ['', [Validators.required, Validators.min(1)]],
        hasExperience: ['', Validators.required],
      }),
      address: this.fb.group({
        cep: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        uf: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}$/)]],
      }),
    });
  }

  // Função auxiliar para obter o grupo de formulário com base na etapa (Melhoria de Clareza)
  private getStepGroup(step: number): FormGroup {
    switch (step) {
      case 1:
        return this.basic;
      case 2:
        return this.professional;
      case 3:
        return this.address;
      default:
        throw new Error(`Etapa ${step} inválida.`);
    }
  }

  // Getters para os subgrupos
  get basic() {
    return this.form.get('basic') as FormGroup;
  }
  get professional() {
    return this.form.get('professional') as FormGroup;
  }
  get address() {
    return this.form.get('address') as FormGroup;
  }

  // Verifica erros em campos
  hasError(group: FormGroup, controlName: string, errorType: string): boolean {
    const control = group.get(controlName);
    return !!(control && control.touched && control.hasError(errorType));
  }

  // Valida a etapa atual
  isStepValid(step: number): boolean {
    const group = this.getStepGroup(step);
    // Marca todos os controles como 'touched' para exibir os erros
    Object.values(group.controls).forEach(control => control.markAsTouched());
    return group.valid;
  }

  // Desabilita etapa
  disableStep(step: number) {
    this.getStepGroup(step).disable();
  }

  // Reabilita etapa
  enableStep(step: number) {
    this.getStepGroup(step).enable();
  }

  // Próxima etapa
  next() {
    if (this.isStepValid(this.currentStep)) {
      // 1. Desabilita o passo atual após validar
      this.disableStep(this.currentStep);
      
      // 2. Avança para o próximo passo
      this.currentStep++;
      
      // 3. Habilita o novo passo para edição (se ele estiver desabilitado)
      if (this.currentStep <= 3) {
        this.enableStep(this.currentStep);
      }
    }
  }

  // Etapa anterior (Ajustado para reabilitar o formulário)
  prev() {
    if (this.currentStep > 1) {
      // 1. Reabilita o passo atual para que, se o usuário avançar novamente, ele não perca os dados
      this.enableStep(this.currentStep); 
      
      // 2. Volta
      this.currentStep--;
      
      // 3. Reabilita o passo que acabamos de voltar, caso estivesse desabilitado
      this.enableStep(this.currentStep);
    }
  }
  
  // Submissão final (Ajustado para habilitar o formulário)
  submitForm() {
    if (this.form.valid) {
      // CORREÇÃO CRUCIAL: Habilita todo o formulário antes de ler os valores
      this.form.enable();
      this.showSummary = true;
    } else {
      this.isStepValid(this.currentStep); // Mostra erros se a etapa final não estiver válida
    }
  }

  // Volta do resumo para a primeira etapa
  backToForm() {
    this.showSummary = false; 
    this.currentStep = 1;     
    // Habilita o formulário caso ele tenha sido desabilitado pelo submit
    this.form.enable();       
  }
}