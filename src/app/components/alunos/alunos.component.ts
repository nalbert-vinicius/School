import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Aluno } from 'src/app/models/Aluno';
import { Professor } from 'src/app/models/Professor';
import { AlunoService } from 'src/app/services/aluno.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public modalRef: BsModalRef;
  public alunoForm: FormGroup;
  public titulo = 'Alunos';
  public alunoSelecionado: Aluno;
  public textSimple: string;
  public profsAlunos: Professor[];

  private unsubscriber = new Subject();

  public alunos: Aluno[];
  public aluno: Aluno;
  public msnDeleteAluno: string;
  public modeSave = 'post';

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private professorService: ProfessorService,
    private fb: FormBuilder,
    private modalService: BsModalService,
  ) {
    this.criarForm();
  }

  ngOnInit() {
    this.carregarAlunos();
  }


  openModal(template: TemplateRef<any>, alunoId: number) : void {
    this.professoresAlunos(template, alunoId);
  }

  closeModal() : void {
    this.modalRef.hide();
  }

  professoresAlunos(template: TemplateRef<any>, id: number) {
    this.professorService.getByAlunoId(id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((professores: Professor[]) => {
        this.profsAlunos = professores;
        this.modalRef = this.modalService.show(template);
      }, (error: any) => {
        console.log(error);
      }
    );
  }

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [0],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  saveAluno() {
    if (this.alunoForm.valid) {
      if (this.modeSave === 'post') {
        this.aluno = {...this.alunoForm.value};
      } else {
        this.aluno = {id: this.alunoSelecionado.id, ...this.alunoForm.value};
      }

      this.alunoService[this.modeSave](this.aluno)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            this.carregarAlunos();
          }, (error: any) => {
            console.error(error);
          }
        );

    }
  }

  carregarAlunos() {
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.alunoService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((alunos: Aluno[]) => {
        this.alunos = alunos;

        if (id > 0) {
          this.alunoSelect(this.alunos.find(aluno => aluno.id === id));
        }


      }, (error: any) => {

        console.log(error);
      }
    );
  }

  alunoSelect(aluno: Aluno) {
    this.modeSave = 'put';
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  voltar() {
    this.alunoSelecionado = null;
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
