const Brand = require('../models/brandModel');
const Category = require('../models/categoryModel');

class BrandService {
    static async addBrandService({ nameBrand, description, category, status }) {
        if (!nameBrand || !category || !status) {
            return { success: false, status: 400, message: 'Missing required parameters' };
        }

        const newBrand = new Brand({ nameBrand, description, category, status });
        const savedBrand = await newBrand.save();

        // Lưu id của brand vào trường brands của category
        await Category.findByIdAndUpdate(category, { $push: { brands: savedBrand._id } });

        return { success: true, message: 'Brand created successfully' };
    }

    static async updateBrandService({ id, nameBrand, description, category }) {
        if (!nameBrand || !category) {
            return { success: false, status: 400, message: 'Missing required parameters' };
        }

        const updatedBrand = await Brand.findByIdAndUpdate(
            id,
            { nameBrand, description, category },
            { new: true, runValidators: true }
        );

        if (!updatedBrand) {
            return { success: false, status: 404, message: 'Brand not found or user not authorized' };
        }

        return { success: true, message: 'Excellent progress!', brand: updatedBrand };
    }

    static async deleteBrandService(id) {
        const deletedBrand = await Brand.findByIdAndDelete(id);

        if (!deletedBrand) {
            return { success: false, status: 404, message: 'Brand not found or user not authorized' };
        }

        // Xóa id của brand khỏi trường brands của category
        await Category.updateMany({}, { $pull: { brands: id } });

        return { success: true, message: 'Excellent progress!' };
    }

    static async getAllBrandsService() {
        const brands = await Brand.find().populate('category');
        const extractedBrands = brands.map((brand) => ({
            id: brand.id,
            nameBrand: brand.nameBrand,
            description: brand.description,
            category: brand.category,
            status: brand.status,
        }));

        return { success: true, brands: extractedBrands };
    }
}

module.exports = BrandService;