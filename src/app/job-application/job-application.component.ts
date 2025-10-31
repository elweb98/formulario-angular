import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-application',
  // Se o seu projeto não usa standalone, remova as duas linhas abaixo e a linha 2 e 3
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule],
  
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss'],
})
export class JobApplicationComponent implements OnInit {
  form!: FormGroup;
  currentStep: number = 1;
  showSummary: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      basic: this.fb.group({
        // Seus campos aqui
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
      }),
      professional: this.fb.group({
        // Seus campos aqui
        position: ['', Validators.required],
        salaryExpectation: ['', Validators.required],
        hasExperience: ['', Validators.required],
      }),
      address: this.fb.group({
        // Seus campos aqui
        cep: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        uf: ['', Validators.required],
      }),
    });
    
    // Inicia com apenas o primeiro grupo habilitado
    this.form.get('professional')?.disable();
    this.form.get('address')?.disable();
  }

  // Retorna o FormGroup da etapa atual
  get currentGroup(): FormGroup {
    switch (this.currentStep) {
      case 1:
        return this.form.get('basic') as FormGroup;
      case 2:
        return this.form.get('professional') as FormGroup;
      case 3:
        return this.form.get('address') as FormGroup;
      default:
        return this.form.get('basic') as FormGroup;
    }
  }

  // Navega para a próxima etapa, travando a etapa atual
  nextStep(): void {
    if (this.currentGroup.valid) {
      // 1. Desabilita a etapa atual para 'travar' os dados (controle de estado)
      this.currentGroup.disable();
      
      // 2. Avança para o próximo passo
      this.currentStep++;
      
      // 3. Habilita a nova etapa 
      const nextGroup = this.currentGroup;
      if (nextGroup) {
        nextGroup.enable();
      }
    } else {
      this.currentGroup.markAllAsTouched();
    }
  }

  // Volta para a etapa anterior, re-habilitando-a
  prevStep(): void {
    if (this.currentStep > 1) {
      // 1. Desabilita o passo atual antes de voltar
      this.currentGroup.disable();
      
      // 2. Volta
      this.currentStep--;
      
      // 3. Re-habilita o novo passo atual para permitir edição
      this.currentGroup.enable();
    }
  }

  // Função final de submissão do formulário
  submitForm(): void {
    // A correção para o resumo vazio (image_7f8776.png) está aqui:
    if (this.currentGroup.valid) {
      // CORREÇÃO ESSENCIAL: Habilita o formulário INTEIRO para que o form.value não seja vazio
      this.form.enable();
      
      // Mostra a tela de resumo
      this.showSummary = true;
      
      console.log('Dados do Formulário Final:', this.form.value);
    } else {
      this.currentGroup.markAllAsTouched();
    }
  }

  backToForm(): void {
    this.showSummary = false;
    // Opcional: Desabilita novamente as etapas anteriores após sair do resumo
    this.form.get('basic')?.disable();
    this.form.get('professional')?.disable();
    // Habilita a última etapa para permitir edição
    this.form.get('address')?.enable(); 
  }
}