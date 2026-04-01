// tìm id lĩnh vực theo path route
export const findIdByPath = (tree: any[], path: string): number | null => {
  for (const node of tree) {
    if (node.key === path) {
      return node.id ?? null;
    }
    if (node.children) {
      const childId = findIdByPath(node.children, path);
      if (childId) return childId;
    }
  }
  return null;
};
// bố mày đây
