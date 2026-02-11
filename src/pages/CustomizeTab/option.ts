import { Color, Material, Technology } from '../../types/uploadFiles';
import { IPrinter } from '../../types/printer';

// Helper to generate Material Options
export const getMaterialOptions = (
  materials: Material[] = [],
  technologyId: string | undefined
) => {
  if (!materials || !technologyId) return [];
  const filteredMaterials = materials.filter((mat: Material) =>
    mat.relatedTechnologie.includes(technologyId)
  );
  return filteredMaterials.map((mat: Material) => ({
    id: mat._id,
    label: mat.code,
    labelView: mat.code + ` ( ${mat.name})`,
    value: mat._id,
  }));
};

// Helper to generate Technology Options
export const getTechnologyOptions = (technologies: Technology[] = []) => {
  if (!technologies) return [];
  return technologies.map((tech: Technology) => ({
    id: tech._id,
    label: tech.code,
    labelView: tech.code + ` (${tech.name})`,
    value: tech._id,
  }));
};

// Helper to generate Color Options
export const getColorOptions = (colors: Color[] = []) => {
  if (!colors) return [];
  return colors.map((c: Color) => ({
    id: c._id,
    label: c.name,
    value: c.hexCode,
  }));
};

// Helper to generate Infill Options
export const getInfillOptions = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: `${(i + 1) * 5}`,
    label: `${(i + 1) * 5}`,
  }));
};

// Helper to get Selected Material Object
export const getSelectedMaterial = (
  materials: Material[] = [],
  materialId: string | undefined
): Material | null => {
  if (materialId && materials.length > 0) {
    return (
      materials.find((material: Material) => material._id === materialId) ||
      null
    );
  }
  return null;
};

// Helper to get Selected Technology Object
export const getSelectedTechnology = (
  technologies: Technology[] = [],
  technologyId: string | undefined
): Technology | null => {
  if (technologyId && technologies.length > 0) {
    return (
      technologies.find((tech: Technology) => tech._id === technologyId) || null
    );
  }
  return null;
};

// Helper to get Selected Color Hex Code
export const getSelectedColorHex = (
  colors: Color[] = [],
  colorId: string | undefined
): string => {
  if (colorId && colors.length > 0) {
    const selectedColor = colors.find((color: Color) => color._id === colorId);
    return selectedColor ? selectedColor.hexCode : '#ffffff';
  }
  return '#ffffff';
};

// Helper to get Selected Printer Object
export const getSelectedPrinter = (
  printers: IPrinter[] = [],
  printerId: string | undefined
): IPrinter | null => {
  if (printerId && printers.length > 0) {
    return (
      printers.find((printer: IPrinter) => printer._id === printerId) || null
    );
  }
  return null;
};
