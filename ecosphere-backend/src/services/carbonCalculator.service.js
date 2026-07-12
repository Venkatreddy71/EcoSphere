import { prisma } from '../config/db.js';

class CarbonCalculatorService {
  async calculateEmissions(data) {
    const { productId, amount, factorId } = data;
    
    if (productId) {
      const product = await prisma.productProfile.findUnique({ 
        where: { id: productId },
        include: { factor: true }
      });
      if (product) {
        return {
          co2e: product.carbonProfile * (amount || 1),
          scope: product.factor ? product.factor.scope : 'Scope 3'
        };
      }
    }

    if (factorId) {
      const factor = await prisma.emissionFactor.findUnique({ where: { id: factorId } });
      if (factor) {
        return {
          co2e: factor.factor * (amount || 1),
          scope: factor.scope
        };
      }
    }

    if (data.co2e && data.scope) {
      return {
        co2e: data.co2e,
        scope: data.scope
      };
    }

    throw new Error('Insufficient data to calculate emissions.');
  }
}

export default new CarbonCalculatorService();
