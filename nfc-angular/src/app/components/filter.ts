import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../shared/model/employee";

@Pipe({
  name: "myFilter",
  pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: Employee[], filter: FilterType): Employee[] {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      const itemLower = filter.txt.toLowerCase();
      return (
        item.name.toLowerCase().indexOf(itemLower) !== -1 ||
        item.lastName.toLowerCase().indexOf(itemLower) !== -1 ||
        item.expedient.toLowerCase().indexOf(itemLower) !== -1 ||
        item.nfcTag.toLowerCase().indexOf(itemLower) !== -1
      );
    });
  }
}

export type FilterType = { txt: String };
