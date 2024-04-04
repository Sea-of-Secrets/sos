package com.ssafy.sos.product.service;

import com.ssafy.sos.global.S3.S3Service;
import com.ssafy.sos.global.error.CustomException;
import com.ssafy.sos.global.error.ExceptionEnum;
import com.ssafy.sos.nft.service.NFTService;
import com.ssafy.sos.product.domain.Grade;
import com.ssafy.sos.product.domain.Product;
import com.ssafy.sos.product.domain.Purchase;
import com.ssafy.sos.product.domain.PurchaseId;
import com.ssafy.sos.product.dto.ProductDTO;
import com.ssafy.sos.product.mapper.ProductMapper;
import com.ssafy.sos.product.repository.ProductRepository;
import com.ssafy.sos.product.repository.PurchaseRepository;
import com.ssafy.sos.user.domain.CustomOAuth2User;
import com.ssafy.sos.user.domain.UserEntity;
import com.ssafy.sos.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final S3Service s3Service;

    private final NFTService nftService;

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final PurchaseRepository purchaseRepository;

    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    @Override
    public List<ProductDTO.Info> getAllProducts() {

        List<Product> productList = productRepository.findByIsDeletedFalse();

        return productMapper.entityToDtoForList(productList);
    }

    @Override
    public ProductDTO.Result randomProduct(CustomOAuth2User userDTO) {

        UserEntity userEntity = userRepository.findByUsername(userDTO.getUsername());

        if (userEntity.getWalletAddress() == null) {
            throw new CustomException(ExceptionEnum.NOT_EXIT_WALLET);
        }

        int userGold = userEntity.getGold();

        if (userGold < 150) {
            throw new CustomException(ExceptionEnum.NOT_ENOUGH_GOLD);
        }

        SecureRandom secureRandom = new SecureRandom();
        int num = secureRandom.nextInt(100) + 1;
        Grade grade;

        if (num <= 10) {
            grade = Grade.LEGENDARY;
        }
        else if (num <= 40) {
            grade = Grade.RARE;
        }
        else {
            grade = Grade.COMMON;
        }

        List<Product> productList = productRepository.findByGradeAndIsDeletedFalseAndIsSoldOutFalse(grade);

        if (grade == Grade.LEGENDARY && productList.isEmpty()) {
            productList = productRepository.findByGradeAndIsDeletedFalseAndIsSoldOutFalse(Grade.RARE);
        }

        userEntity.setGold(userGold - 150);

        int index = secureRandom.nextInt(productList.size());
        boolean hasItemAlready = false;
        Product selectedProduct = productList.get(index);

        PurchaseId purchaseId = PurchaseId.builder()
                .userId(userEntity.getId())
                .productId(selectedProduct.getId())
                .build();

        Optional<Purchase> purchase = purchaseRepository.findById(purchaseId);

        if (purchase.isEmpty()) {
            purchaseRepository.save(Purchase.builder()
                    .id(purchaseId)
                    .productId(selectedProduct)
                    .userId(userEntity)
                    .build());

            try {
                nftService.mintingNFT(userEntity, selectedProduct);

                if(grade == Grade.LEGENDARY) {
                    selectedProduct.soldOut();
                }
            } catch(Exception e) {
                throw new CustomException(ExceptionEnum.NFT_MINTING_ERROR);
            }
        }
        else {
            hasItemAlready = true;
        }

        return productMapper.entityToDto(selectedProduct, hasItemAlready);
    }

    @Override
    public void registerProduct(ProductDTO.Post productDTO, MultipartFile imageFile) {
        Grade grade;

        try {
            grade = Grade.valueOf(productDTO.grade().toUpperCase());
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.NOT_EXIST_GRADE);
        }

        String imageName = s3Service.saveUploadFile(imageFile);
        String imageUrl = s3Service.getFilePath(imageName);

        productRepository.save(Product.builder()
                .name(productDTO.name())
                .grade(grade)
                .imageName(imageName)
                .imageUrl(imageUrl)
                .build());
    }
}