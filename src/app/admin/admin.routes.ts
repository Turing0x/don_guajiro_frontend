import { Routes } from "@angular/router";
import { OperacionesComponent } from "./components/operaciones/operaciones.component";
import { AdminRoleGuard } from "../auth/guards/admin-role.guard";
import { MenuComponent } from "./layout/menu/menu.component";
import { PendientesComponent } from "./components/pendientes/pendientes.component";
import { HistorialOperacionesComponent } from "./components/historial-operaciones/historial-operaciones.component";
import { HistorialVentasComponent } from "./components/historial-ventas/historial-ventas.component";


export const routesAdmin: Routes =  [

  {
    path:'',
    component: MenuComponent,
    children: [
      {
        path:'operaciones',
        component: OperacionesComponent
      },
      {
        path:'pendientes',
        component: PendientesComponent
      },
      {
        path:'historialOperaciones',
        component: HistorialOperacionesComponent
      },
      {
        path:'historialVentas',
        component: HistorialVentasComponent
      },
      {
        path:'**',
        redirectTo: 'operaciones'
      }

    ]
  },
  // {
  //   path:'**',
  //   redirectTo: 'admin/operaciones'
  // }




]
