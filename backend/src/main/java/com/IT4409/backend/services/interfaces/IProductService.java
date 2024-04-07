package com.IT4409.backend.services.interfaces;

import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts() throws Exception;

    Product getProductById(Long productId) throws Exception;
    public Product createProduct(ProductRequestDTO productRequestDTO) throws Exception;
    Product updateProduct(Long productId, ProductRequestDTO productRequestDTO) throws Exception;
    Product deleteProduct(Long productId) throws Exception;
}
