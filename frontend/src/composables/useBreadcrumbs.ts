import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export type Crumb = {
  label: string;
  to?: string;
};

export const useBreadcrumbs = (t: any) => {
  const route = useRoute();
  const router = useRouter();

  return computed<Crumb[]>(() => {
    const crumbs: Crumb[] = [];

    let meta = route.meta as { breadcrumb?: string; parent?: string };
    let path: string | undefined = route.path;
    let isCurrent = true;

    while (meta?.breadcrumb) {
      crumbs.unshift({ label: t(meta.breadcrumb), to: isCurrent ? undefined : path });
      isCurrent = false;

      if (!meta.parent) break;
      const resolved = router.resolve(meta.parent);
      path = resolved.path;
      meta = resolved.meta as typeof meta;
    }

    return crumbs;
  });
};
