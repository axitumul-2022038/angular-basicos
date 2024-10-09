declare module 'xlsx-populate' {
  export interface Workbook {
      sheet(index: number): Sheet;
      sheet(name: string): Sheet;
      outputAsync(): Promise<Blob>;  // Agregar la firma para outputAsync
      // Agrega más métodos según sea necesario
  }

  export interface Sheet {
      name(name: string): void;
      cell(address: string): Cell;
      range(address: string): Range;
      // Agrega más métodos según sea necesario
  }

  export interface Cell {
      value(value: any): void;
  }

  export interface Range {
      fill(color: string): void;
  }

  export function fromBlankAsync(): Promise<Workbook>;
  export function fromDataAsync(data: any): Promise<Workbook>;
}
