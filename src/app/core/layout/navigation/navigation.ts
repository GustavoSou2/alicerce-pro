import { CommonModule } from '@angular/common';
import { Component, signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
})
export class Navigation {
  isCollapsed = signal(true);
  user = {
    name: 'Gustavo Souza',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/100?img=3',
  };

  menuItems: MenuItem[] = [
    {
      path: 'dashboard',
      label: 'Dashboard',
      icon: 'fa-solid fa-chart-bar',
      roles: ['Admin', 'Colaborador'],
    },
    {
      path: 'orcamentos',
      label: 'Orçamentos',
      icon: 'fa-solid fa-file-invoice-dollar',
      roles: ['Admin', 'Colaborador'],
    },
    { path: 'projetos', label: 'Projetos', icon: 'fa-solid fa-diagram-project', roles: ['Admin'] },
    { path: 'colaboradores', label: 'Colaboradores', icon: 'fa-solid fa-users', roles: ['Admin'] },
    {
      path: 'clientes',
      label: 'Clientes',
      icon: 'fa-solid fa-user-tie',
      roles: ['Admin', 'Colaborador'],
    },
    { path: 'materiais', label: 'Materiais', icon: 'fa-solid fa-boxes-stacked', roles: ['Admin'] },
  ];

  filteredMenu = computed(() =>
    this.menuItems.filter((item) => item.roles.includes(this.user.role))
  );

  isMobile = signal(false);

  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Large])
      .pipe(
        takeUntilDestroyed(),
        map((result) => result.matches)
      )
      .subscribe((isMobileMatch) => {
        console.log(isMobileMatch)
        this.isMobile.set(isMobileMatch);

        if (isMobileMatch) {
          this.isCollapsed.set(true);
        }
      });
  }

  toggleSidebar() {
    this.isCollapsed.update((val) => !val);
  }

  logout() {
    console.log('Logout...');
  }
}
