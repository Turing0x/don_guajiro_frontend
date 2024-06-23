import { Routes } from "@angular/router";
import { OperacionesComponent } from "./components/operaciones/operaciones.component";
import { MenuComponent } from "./layout/menu/menu.component";
import { PendientesComponent } from "./components/pendientes/pendientes.component";
import { HistorialOperacionesComponent } from "./components/historial-operaciones/historial-operaciones.component";
import { HistorialVentasComponent } from "./components/historial-ventas/historial-ventas.component";
import { ProductComponent } from "./components/product/product.component";


export const routesAdmin: Routes =  [
  {
    path:'',
    component: MenuComponent,
    children: [
      {
        path:'product',
        component: ProductComponent
      },
      {
        path:'operaciones',
        component: OperacionesComponent
      },
      // {
      //   path:'pendientes',
      //   component: PendientesComponent
      // },
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
]
