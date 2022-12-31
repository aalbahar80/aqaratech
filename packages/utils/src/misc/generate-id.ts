/* If using in node package, pass uuid generator from node:crypto. Otherwise,
 * use crypto.uuid(). This is for compatibility between node and web
 * environments. */
export const generateId = (getId: () => string) => getId();
