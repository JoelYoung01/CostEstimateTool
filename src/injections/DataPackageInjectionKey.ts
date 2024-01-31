import type { InjectionKey, Ref } from "vue";
import type { DataPackage } from "@/types";

export const DataPackageInjectionKey = Symbol("Injection Symbol for the app's Data Package") as InjectionKey<
  Ref<DataPackage>
>;
