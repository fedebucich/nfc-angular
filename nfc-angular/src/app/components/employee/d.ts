import { Status, ScheduleWorkTime } from "../../shared/model/employee";

export type DisplayValue = "Activo" | "Inactivo" | "Suspendido" | "Todos";
export type DayLabel = "Lunes" | "Martes" | "Miercoles" | "Jueves" | "Viernes";

export type StatusSelect = {
  status: Status;
  displayValue: DisplayValue;
};

export function getDisplayValue(value: Status): DisplayValue {
  return value === "active"
    ? "Activo"
    : value === "inactive" ? "Inactivo" : "Suspendido";
}

export function getDayLabel(workDay: ScheduleWorkTime): DayLabel {
    switch (workDay.dayNumber) {
    case 1:
      return "Lunes";
    case 2:
      return "Martes";
    case 3:
      return "Miercoles";
    case 4:
      return "Jueves";
    case 5:
      return "Viernes";
  }
}
