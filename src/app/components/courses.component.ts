import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, filter, takeUntil, tap } from 'rxjs';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { CourseCardComponent } from './course-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

interface ListConfig {
  pageNo: number;
  pageSize: number;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, PaginatorModule],
  template: ` @if(courses$ | async; as courses){

    <div class="flex items-center justify-center gap-2 flex-wrap min-h-[70vh]">
      @for (course of courses.data; track course.id){
      <app-course-card
        class=" w-sm-3/4 w-md-1/2"
        [course]="course"
      ></app-course-card>
      } @empty{
      <div>no displayed data</div>

      }
    </div>
    <p-paginator
      locale="en-US"
      (onPageChange)="onPageChange($event)"
      [first]="listConfig.pageSize * listConfig.pageNo - 1"
      [rows]="listConfig.pageSize"
      [totalRecords]="listConfig.pageSize * courses.data.length"
      [pageLinkSize]="2"
      [rowsPerPageOptions]="[4, 8, 12, 20]"
    ></p-paginator>
    }`,
  styles: ``,
})
export class CoursesComponent implements OnInit, OnDestroy {
  constructor(
    private _courseService: CoursesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._getParams();
  }

  private readonly _destroyAll$ = new Subject<unknown>();

  public Math = Math;
  public listConfig: ListConfig = {
    pageNo: 1,
    pageSize: 4,
  };
  public courses$ = this._courseService.getPaginatedCourses(
    this.listConfig.pageNo,
    this.listConfig.pageSize
  );

  private _getParams(): void {
    this._activatedRoute.queryParamMap
      .pipe(
        filter((params) => !!params),
        tap((params) => {
          this.listConfig.pageNo = Number(params.get('pageNo')) || 1;
          this.listConfig.pageSize = Number(params.get('pageSize')) || 4;
        }),
        takeUntil(this._destroyAll$)
      )
      .subscribe({
        next: () =>
          (this.courses$ = this._courseService.getPaginatedCourses(
            this.listConfig.pageNo,
            this.listConfig.pageSize
          )),
      });
  }

  // List Configuration

  public async onPageChange(event: any) {
    console.log('event: ', event);
    const page = +event?.page;
    const size = +event?.rows;
    console.log('size: ', size);
    console.log('page: ', page);

    this.listConfig.pageNo = page;
    await this._router.navigate([], {
      queryParams: {
        pageNo: +page + 1,
        pageSize: +size,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
