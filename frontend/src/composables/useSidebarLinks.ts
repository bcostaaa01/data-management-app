import { computed } from "vue";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faFileImport } from "@fortawesome/free-solid-svg-icons/faFileImport";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons/faTachometerAlt";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Link = {
  icon: IconProp;
  label: string;
  to: string;
};

export const useSidebarLinks = (t: any) => {
  return computed<Link[]>(() => [
    { icon: faTachometerAlt, label: "Dashboard", to: "/" },
    {
      icon: faFileImport,
      label: `${t("sidebar.dataImport")}`,
      to: "/data-import",
    },
    { icon: faFileAlt, label: `${t("sidebar.reports")}`, to: "/reports" },
    { icon: faTable, label: `${t("sidebar.tables")}`, to: "/tables" },
  ]);
};
