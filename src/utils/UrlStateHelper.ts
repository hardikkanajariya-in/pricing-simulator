interface EstimatorUrlState {
  categoryId: string | null;
  packageId: string | null;
  featureIds: string[];
  infrastructureIds: string[];
  supportId: string;
  budgetMode: boolean;
  budgetLimit: number;
  activeStep: number;
  productInsertCount: number;
  aiPhotoProductCount: number;
  aiPhotoImagesPerProduct: number;
}

// Serializes the state to URL hash
export const serializeStateToHash = (state: EstimatorUrlState) => {
  const params = new URLSearchParams();
  
  if (state.categoryId) params.set('c', state.categoryId);
  if (state.packageId) params.set('p', state.packageId);
  if (state.featureIds.length > 0) params.set('f', state.featureIds.join(','));
  if (state.infrastructureIds.length > 0) params.set('i', state.infrastructureIds.join(','));
  params.set('s', state.supportId);
  params.set('b', state.budgetMode ? '1' : '0');
  params.set('l', state.budgetLimit.toString());
  params.set('step', state.activeStep.toString());
  params.set('pic', state.productInsertCount.toString());
  params.set('apc', state.aiPhotoProductCount.toString());
  params.set('api', state.aiPhotoImagesPerProduct.toString());

  // Replace hash without pushing to history to prevent flooding
  window.location.hash = params.toString();
};

// Parses the state from URL hash
export const parseStateFromHash = (): Partial<EstimatorUrlState> => {
  const hash = window.location.hash.slice(1);
  if (!hash) return {};
  
  try {
    const params = new URLSearchParams(hash);
    const categoryId = params.get('c') || null;
    const packageId = params.get('p') || null;
    
    const fParam = params.get('f');
    const featureIds = fParam ? fParam.split(',') : [];
    
    const iParam = params.get('i');
    const infrastructureIds = iParam ? iParam.split(',') : [];
    
    const supportId = params.get('s') || 'maint_none';
    const budgetMode = params.get('b') === '1';
    const budgetLimit = parseInt(params.get('l') || '25000', 10);
    const activeStep = parseInt(params.get('step') || '1', 10);
    const productInsertCount = parseInt(params.get('pic') || '0', 10);
    const aiPhotoProductCount = parseInt(params.get('apc') || '0', 10);
    const aiPhotoImagesPerProduct = parseInt(params.get('api') || '2', 10);

    return {
      categoryId,
      packageId,
      featureIds,
      infrastructureIds,
      supportId,
      budgetMode,
      budgetLimit,
      activeStep,
      productInsertCount,
      aiPhotoProductCount,
      aiPhotoImagesPerProduct
    };
  } catch (error) {
    console.error("Failed to parse URL hash state:", error);
    return {};
  }
};
