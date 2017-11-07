import {Pipe, PipeTransform} from "@angular/core"

@Pipe({
    name: "myFilter",
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(items: any[], filter: any): any {

        if (!items || !filter) {
            return items;
        }

        return items.filter((item) => {
            const itemLower = filter.txt.toLowerCase();
            return item.name.toLowerCase().indexOf(itemLower) !== -1
            || item.lastName.toLowerCase().indexOf(itemLower) !== -1
            || item.expedient.toLowerCase().indexOf(itemLower) !== -1
            || item.nfcTag.toLowerCase().indexOf(itemLower) !== -1
        });
    }
}