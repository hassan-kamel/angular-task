import { ButtonModule } from 'primeng/button';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterLink, MenubarModule, OverlayPanelModule, ButtonModule],
  template: `
    @if (!isLogin) {

    <header class="app-header">
      <div class="mx-auto w-[90%] flex items-center justify-between">
        <h4 class="font-bold text-xl cursor-pointer" [routerLink]="['/home']">
          <img
            class="h-16 w-auto"
            src="https://media.licdn.com/dms/image/D4D0BAQHfv78EbBr8PA/company-logo_200_200/0/1688217183283/binder_sa_logo?e=1713398400&v=beta&t=H2tZdPvIrZAKHVo9BkrEddFY5YfgVvEi_WU1MJK8so4"
            alt="Your Company"
          />
        </h4>
        <p-menubar [model]="items"></p-menubar>
        <div>
          @if (this.isAuthenticated) {
          <p-overlayPanel #op>
            <ng-template pTemplate="content">
              <div>
                <p-button
                  icon="pi pi-user"
                  label="Profile"
                  [text]="true"
                  severity="secondary"
                  [routerLink]="['/profile']"
                ></p-button>
              </div>
              <div>
                <p-button
                  icon="pi pi-sign-out"
                  severity="danger"
                  label=" Logout"
                  [text]="true"
                  [outlined]="true"
                  (click)="onLogout()"
                >
                </p-button>
              </div>
            </ng-template>
          </p-overlayPanel>
          <p-button
            (click)="op.toggle($event)"
            icon="pi pi-user"
            [rounded]="true"
            severity="info"
            [outlined]="true"
          ></p-button>

          }@else {
          <p-button
            [routerLink]="['/login']"
            class="px-2 font-medium cursor-pointer"
            icon="pi pi-sign-in"
            severity="info"
            label=" Login"
          >
          </p-button>
          }
        </div>
      </div>
    </header>
    }
  `,
  styles: ``,
})
export class TopBarComponent implements OnDestroy {
  currentPath: string | null = '';
  isAuthenticated = this.authService.isAuthenticated;
  private readonly _destroyAll$ = new Subject<unknown>();

  constructor(
    private authService: AuthService,

    private router: Router
  ) {
    this.router.events
      .pipe(
        filter((f) => !!f),
        takeUntil(this._destroyAll$)
      )
      .subscribe((path: any) => {
        this.isAuthenticated = this.authService.isAuthenticated;

        this.currentPath = path?.routerEvent?.url;
        const indexOfQMark = (path?.routerEvent?.url as string)?.indexOf('?');
        const routerLink =
          !!indexOfQMark && indexOfQMark != -1
            ? this.currentPath?.substring(0, indexOfQMark)
            : this.currentPath;
        this.items![1].routerLink = routerLink;
        this.items![2].routerLink = routerLink;
      });
  }

  onLogout() {
    this.authService.onLogout();
  }
  get isLogin(): boolean {
    return this.currentPath === '/login';
  }

  items: MenuItem[] | undefined = [
    {
      label: 'Courses',
      icon: 'pi pi-fw pi-user',
      routerLink: '/courses',
    },
    {
      label: 'Wishlist',
      icon: 'pi pi-fw pi-heart',

      queryParams: {
        ['side']: 'wishlist',
      },
      queryParamsHandling: 'merge',
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',

      queryParams: {
        ['side']: 'cart',
      },
      queryParamsHandling: 'merge',
    },
  ];
  ngOnDestroy(): void {
    this._destroyAll$.next(undefined);
    this._destroyAll$.complete();
  }
}
