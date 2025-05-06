import { Injectable } from '@angular/core';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class DateAdapterRus extends NativeDateAdapter {
  override getFirstDayOfWeek(): number {
    return 1;
  }

  override parse(value: any, parseFormat?: any): Date | null {
    if (parseFormat == 'DD.MM.YYYY') {
      var regex = /(\..*){2,}/;
      let dotcheck = regex.test(value);
      let dateParts = dotcheck ? value.match(/(\d{1,2}).(\d{1,2}).(\d{2,4})/) : value.match(/(\d{1,2})(\d{1,2})(\d{2,4})/);
      if (dateParts) {
        let day = dateParts[1];
        let month = dateParts[2];
        let year = dateParts[3];
        if (year.length == 2) {
          let currentDate = new Date();
          year = currentDate.getFullYear().toString().slice(0, 2) + year;
        }
        let data = new Date(Date.parse(`${year}-${month}-${day}`));
        return data;
      }
    }
    let data = super.parse(value, parseFormat);
    return data;
  }
}

export const RUS_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM-YYYY',
  },
};
