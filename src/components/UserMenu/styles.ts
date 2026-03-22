/**
 * @fileoverview Styles pour UserMenu
 */

export const userMenuStyles = {
  wrapper: "flex items-center gap-3 px-4 py-2",
  name: "text-sm font-medium text-gray-900",
  avatarButton: "flex items-center justify-center w-10 h-10 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer",
  avatarImg: "w-full h-full object-cover",
  dropdown: "bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-[200px] z-50",
  dropdownHeader: "flex flex-col gap-1 px-3 py-2",
  dropdownName: "text-sm font-semibold text-gray-900",
  dropdownEmail: "text-xs text-gray-500",
  dropdownDivider: "my-2 border-gray-200",
  dropdownItem: "flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer focus:outline-none focus:bg-gray-100",
  dropdownIcon: "flex items-center"
} as const;
