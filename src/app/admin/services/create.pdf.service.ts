import { Sale } from './../interfaces/sales.interface';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import type {
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

export interface SalePdf {
  product: string;
  cantToBuy: number;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreatePdfService {
  downloadPdf(date: string, array: Sale[] , name: String): TDocumentDefinitions {
    const arraySales:SalePdf[] = this.resumenVentas(array);

    let importeTotal = 0, totalProductos = 0;
    arraySales.forEach(element => {
      importeTotal += element.amount;
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
                { text: name,  },
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
        {
          text: [
            {
              text: `Total de productos: ${totalProductos} .\nImporte total: ${importeTotal} .\n `,
              margin: [0, 10],

            },
          ],
        },

        // Tabla con los datos del pedido
        {
          margin: [0, 20],
          layout: 'lightHorizontalLines',
          table: {
            widths: [50, '*',  200, 'auto'],
            headerRows: 1,
            body: [
              [
                { text: 'ID', alignment: 'center' },
                'Producto',
                'Cantidad',
                'Total',
              ],
              ...arraySales.map((product, index) => [
                { text: (index + 1).toString(), alignment: 'center' },
                product.product,
                product.cantToBuy,
                {
                  text: Formatter.currency(product.amount),
                  bold: true,
                  alignment: 'right',
                },
              ]),
            ],
          },
        },
      ],
      styles: styles,
    };
  }

  resumenVentas(array: Sale[]): SalePdf[] {

    const obj = new Map();
    for( const sale of array ) {
      if(obj.has(sale.product.toLowerCase())) {
        obj.set(sale.product.toLowerCase(), {
          product: sale.product.toLowerCase(),
          cantToBuy: obj.get(sale.product.toLowerCase()).cantToBuy + sale.cantToBuy,
          amount: (obj.get(sale.product.toLowerCase()).cantToBuy + sale.cantToBuy) * sale.price,
        });
      } else {
        obj.set(sale.product.toLowerCase(), {
          product: sale.product.toLowerCase(),
          cantToBuy: sale.cantToBuy,
          amount: sale.price * sale.cantToBuy,
        });
      }
    }

    return Array.from(obj.values());

  }
}
