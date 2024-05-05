package com.IT4409.backend.dtos.ProductDTO;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ProductRequestDTO {
    private Long productId;
    @NotEmpty(message = "categoryIdList must not be empty")
    private List<Long> categoryIdList;
    @NotBlank(message = "Product name must not be null!")
    private String productName;
    @NotEmpty(message = "Must be at list one color!")
    private List<String> colorNameList;
    @NotEmpty(message = "Must be at list one size!")
    private List<String> sizeNameList;
    @NotBlank(message = "Description must not be null!")
    private String description;
    private Long price;
    @Min(value = 0)
    private Long discountPrice;
    @Min(value = 0)
    private Integer quantityInStock;
    private Short status;
    private MultipartFile thumbnail;
    private List<MultipartFile> images;
}
