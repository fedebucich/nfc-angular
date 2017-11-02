import { Status } from "../../shared/model/employee"

export type DisplayValue = "Activo" | "Inactivo" | "Suspendido";

export type StatusSelect = {
    status: Status;
    displayValue: DisplayValue;
}

export function getDisplayValue(value: Status): DisplayValue {
    return value === "active" ? "Activo" : value === "inactive" ? "Inactivo" : "Suspendido";
}