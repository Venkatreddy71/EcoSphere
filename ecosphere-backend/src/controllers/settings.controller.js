import { prisma } from '../config/db.js';

// ---- Departments ----

export const getDepartments = async (req, res, next) => {
  try {
    const departments = await prisma.department.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: departments });
  } catch (error) {
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    const department = await prisma.department.create({ data: req.body });
    res.status(201).json({ status: 'success', data: department });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await prisma.department.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ status: 'success', data: department });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ status: 'error', message: 'Department not found' });
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    await prisma.department.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Department deleted' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ status: 'error', message: 'Department not found' });
    next(error);
  }
};

// ---- Categories ----

export const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({ where: { isDeleted: false } });
    res.json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json({ status: 'success', data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await prisma.category.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ status: 'success', message: 'Category deleted' });
  } catch (error) {
    if (error.code === 'P2025') return res.status(404).json({ status: 'error', message: 'Category not found' });
    next(error);
  }
};
