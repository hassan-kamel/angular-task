import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  ParamMap,
  Router,
  RouterOutlet,
} from '@angular/router';
import { TopBarComponent } from './components/top-bar.component';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { Subject, filter, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopBarComponent,
    ToastModule,
    SidebarModule,
  ],
  providers: [],
  template: `
    <p-toast></p-toast>
    <app-top-bar></app-top-bar>
    <router-outlet></router-outlet>
    <p-sidebar
      [(visible)]="sidebarVisibility"
      (onHide)="onSideBarHide()"
      position="right"
    >
      <ng-container
        [ngTemplateOutlet]="sideBar === 'cart' ? cart : wishlist"
      ></ng-container>
    </p-sidebar>

    <ng-template #wishlist>
      <span> wishList</span>
    </ng-template>
    <ng-template #cart>
      <span> Cart</span>
    </ng-template>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-task';
  sidebarVisibility: boolean = false;
  sideBar: string | null = null;
  private readonly _destroyAll$ = new Subject<unknown>();

  constructor(
    private readonly _ActivatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParamMap
      .pipe(
        filter((params) => !!params),
        tap((params: ParamMap) => {
          this.sideBar = params.get('side');
          this.sidebarVisibility = !!this.sideBar;
        }, takeUntil(this._destroyAll$))
      )
      .subscribe();
  }

  onSideBarHide() {
    this._router.navigate([], {
      queryParams: {
        side: null,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
