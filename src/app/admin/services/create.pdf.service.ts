import { Sale } from './../interfaces/sales.interface';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class Formatter {
  static currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}

export interface SalePdf {
  ID: number;
  Producto: string;
  Precio: number;
  Cantidad: number;
  Total: number;
}

const styles: StyleDictionary = {
  h1: {
    fontSize: 20,
    bold: true,
    margin: [0, 5],
  },
  h2: {
    fontSize: 16,
    bold: true,
  },
  h3: {
    fontSize: 14,
    bold: true,
  },
};

@Injectable({
  providedIn: 'root'
})
export class CreatePdfService {
  downloadPdf(date: string , arraySales : Sale[]): TDocumentDefinitions {

    let importeTotal = 0 , totalProductos = 0;
    arraySales.forEach(element => {
      importeTotal += element.price * element.cantToBuy;
      totalProductos += element.cantToBuy;
    });

    return {
      pageSize: 'A4',
      header: {
        text: 'Informe',
        alignment: 'right',
        margin: [10, 10],
      },
      footer: {
        text: 'Generado desde la Aplicación Web',
        alignment: 'right',
        margin: [10, 10],
      },
      content: [
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 515,
              y2: 5,
              lineWidth: 1,
            },
          ],
        },
        // Dirección de la empresa columna #1
        {
          columns: [
            {
              text: [
                { text: 'MIPYME Don Guajiro\n', style: 'h1', },
                {
                  link: 'https://google.com',
                  text: 'https://Don-Guajiro.com',
                },
              ],
            },
            {
              text: [
                { text: 'Fecha: ', style: 'h3' },
                date,
              ],
              alignment: 'right',
            },
          ],
        },

        // Código QR con la dirección
        {
          qr: 'https://Don-Guajiro.com',
          fit: 100,
          alignment: 'right',
        },

        // Datos del cliente
        {
          text: [
            {
              text: 'Resumen del día:\n',
              style: 'h2',
            },
          ],
        },

        // Tabla con los datos del pedido
        {
          margin: [0, 20],
          layout: 'lightHorizontalLines',
          table: {
            widths: [50, '*', 'auto', 'auto', 'auto'],
            headerRows: 1,
            body: [
              [
                { text: 'ID', alignment: 'center' },
                'Producto',
                'Precio',
                'Cantidad',
                'Total',
              ],
              ...arraySales.map((product , index ) => [
                { text: (index +1).toString(), alignment: 'center' },
                product.product,
                Formatter.currency(product.price),
                product.cantToBuy,
                {
                  text: Formatter.currency(product.price * product.cantToBuy),
                  bold: true,
                  alignment: 'right',
                },
              ]),

              // Totales de la tabla
              [{}, {}, {}, {}, {}],
              [
                { text: 'Total de Productos', colSpan: 4, alignment: 'right' },
                {},
                {},
                {},
                {
                  text: totalProductos,
                  bold: true,
                  alignment: 'right',
                },
              ],
              [
                { text: 'Importe Total', colSpan: 4, alignment: 'right' },
                {},
                {},
                {},
                {
                  text: Formatter.currency(importeTotal),
                  bold: true,
                  alignment: 'right',
                },
              ],
            ],
          },
        },
      ],
      styles: styles,
    };
  }
}
