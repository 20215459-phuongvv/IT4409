package com.IT4409.backend.services;

import com.IT4409.backend.Utils.Constants;
import com.IT4409.backend.dtos.ProductDTO.ProductRequestDTO;
import com.IT4409.backend.entities.Category;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.entities.Size;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.CategoryRepository;
import com.IT4409.backend.repositories.ColorRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.repositories.SizeRepository;
import com.IT4409.backend.services.interfaces.IProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static com.IT4409.backend.Utils.Constants.messages;

public class ProductService implements IProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private ModelMapper modelMapper;
    @Override
    public List<Product> getAllProducts() throws Exception {
        List<Product> productList = productRepository.findAll();
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    @Override
    public Product getProductById(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        return product;
    }

    @Override
    public List<Product> searchProduct(String productName) throws NotFoundException {
        List<Product> productList = productRepository.searchProduct(productName);
        if(productList.isEmpty()) {
            throw new NotFoundException(messages.getString("product.validate.not-found"));
        }
        return productList;
    }

    public Product createProduct(ProductRequestDTO productRequestDTO) throws Exception {
        Product product = modelMapper.map(productRequestDTO, Product.class);
        product.setStatus(Constants.PRODUCT_STATUS.IN_STOCK);
        List<Color> colorList = new ArrayList<>();
        List<Size> sizeList = new ArrayList<>();
        List<Category> categoryList = new ArrayList<>();
        for(Long categoryId : productRequestDTO.getCategoryIdList()) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
            categoryList.add(category);
        }
        for(String colorName : productRequestDTO.getColorNameList()){
            Color color = new Color();
            color.setColorName(colorName);
            color = colorRepository.save(color);
            colorList.add(color);
        }
        for(String sizeName : productRequestDTO.getSizeNameList()){
            Size size = new Size();
            size.setSizeName(sizeName);
            size = sizeRepository.save(size);
            sizeList.add(size);
        }
        product.setThumbnail(cloudinaryService.upload(productRequestDTO.getThumbnail().getBytes(), productRequestDTO.getThumbnail().getOriginalFilename(), "thumbnails"));
        product.setSizeList(sizeList);
        product.setColorList(colorList);
        product.setCategoryList(categoryList);
        product.setRating(0.0);
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long productId, ProductRequestDTO productRequestDTO) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        if(productRequestDTO.getProductName() != null && !"".equals(productRequestDTO.getProductName())) {
            product.setProductName(productRequestDTO.getProductName());
        }
        if(!productRequestDTO.getCategoryIdList().isEmpty()) {
            List<Category> categoryList = new ArrayList<>();
            for(Long categoryId : productRequestDTO.getCategoryIdList()) {
                Category category = categoryRepository.findById(categoryId)
                        .orElseThrow(() -> new NotFoundException(messages.getString("category.validate.not-found")));
                categoryList.add(category);
            }
            product.setCategoryList(categoryList);
        }
        if(!productRequestDTO.getSizeNameList().isEmpty()) {
            List<Size> sizeList = new ArrayList<>();
            for(String sizeName : productRequestDTO.getSizeNameList()){
                Size size = new Size();
                size.setSizeName(sizeName);
                size = sizeRepository.save(size);
                sizeList.add(size);
            }
            product.setSizeList(sizeList);
        }
        if(!productRequestDTO.getColorNameList().isEmpty()) {
            List<Color> colorList = new ArrayList<>();
            for(String colorName : productRequestDTO.getColorNameList()){
                Color color = new Color();
                color.setColorName(colorName);
                color = colorRepository.save(color);
                colorList.add(color);
            }
            product.setColorList(colorList);
        }
        if(productRequestDTO.getPrice() != null) {
            product.setPrice(productRequestDTO.getPrice());
        }
        if(productRequestDTO.getDiscountPrice() != null) {
            product.setDiscountPrice(productRequestDTO.getDiscountPrice());
        }
        if(productRequestDTO.getQuantityInStock() != null) {
            product.setQuantityInStock(productRequestDTO.getQuantityInStock());
        }
        if(productRequestDTO.getThumbnail() != null) {
            product.setThumbnail(product.getThumbnail());
        }
        if (productRequestDTO.getStatus() != null) {
            product.setStatus(productRequestDTO.getStatus());
        }
        product = productRepository.save(product);
        notificationService.sendProductOutOfStockNotification();
        return product;
    }

    @Override
    public Product deleteProduct(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        productRepository.deleteById(productId);
        return product;
    }
}
