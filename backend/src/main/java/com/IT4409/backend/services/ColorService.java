package com.IT4409.backend.services;

import com.IT4409.backend.dtos.ColorDTO.ColorRequestDTO;
import com.IT4409.backend.entities.Color;
import com.IT4409.backend.entities.Image;
import com.IT4409.backend.entities.Product;
import com.IT4409.backend.exceptions.NotFoundException;
import com.IT4409.backend.repositories.ColorRepository;
import com.IT4409.backend.repositories.ImageRepository;
import com.IT4409.backend.repositories.ProductRepository;
import com.IT4409.backend.services.interfaces.IColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.ResourceBundle;

public class ColorService implements IColorService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CloudinaryService cloudinaryService;
    private static final ResourceBundle messages = ResourceBundle.getBundle("messages");
    @Override
    public List<Color> getProductColors(Long productId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        return product.getColorList();
    }

    @Override
    public Color addImageToColor(Long productId, Long colorId, MultipartFile[] images) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> color1.getColorId() == colorId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("color.validate.not-found")));
        List<Image> imageList = color.getImageList();
        for(MultipartFile image : images){
            Image newImage = new Image();
            String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "color_images");
            newImage.setImageUrl(url);
            newImage.setColor(color);
            newImage = imageRepository.save(newImage);
            imageList.add(newImage);
        }
        return colorRepository.save(color);
    }

    @Override
    public Color updateColor(Long productId, Long colorId, ColorRequestDTO dto) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> color1.getColorId() == colorId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException(messages.getString("color.validate.not-found")));
        if(dto.getColorName() != null && !"".equals(dto.getColorName())) {
            color.setColorName(dto.getColorName());
        }
        if(!dto.getImageList().isEmpty()){
            List<Image> imageList = new ArrayList<>();
            for(MultipartFile image : dto.getImageList()){
                Image newImage = new Image();
                String url = cloudinaryService.upload(image.getBytes(), image.getOriginalFilename(), "color_images");
                newImage.setImageUrl(url);
                newImage.setColor(color);
                newImage = imageRepository.save(newImage);
                imageList.add(newImage);
            }
        }
        return colorRepository.save(color);
    }

    @Override
    public Color deleteColor(Long productId, Long colorId) throws Exception {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> color1.getColorId() == colorId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("color.validate.not-found"));
        colorRepository.findById(colorId);
        return color;
    }

    @Override
    public List<Image> deleteImages(Long productId, Long colorId, List<Long> imageIdList) throws Exception{
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NotFoundException(messages.getString("product.validate.not-found")));
        Color color = product.getColorList()
                .stream()
                .filter(color1 -> color1.getColorId() == colorId)
                .findFirst()
                .orElseThrow(() -> new NotFoundException("color.validate.not-found"));
        List<Image> result = new ArrayList<>();
        for(Long imageId :imageIdList){
            Optional<Image> imageOptional = imageRepository.findById(imageId);
            if(imageOptional.isPresent()){
                imageRepository.deleteById(imageId);
                result.add(imageOptional.get());
            } else {
                result.add(null);
            }
        }
        return result;
    }
}
